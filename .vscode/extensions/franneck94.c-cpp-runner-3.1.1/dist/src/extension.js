"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = exports.experimentalExecutionEnabled = exports.loggingActive = exports.extensionPath = exports.extensionState = exports.extensionContext = void 0;
const path = require("path");
const vscode = require("vscode");
const builder_1 = require("./executor/builder");
const debugger_1 = require("./executor/debugger");
const runner_1 = require("./executor/runner");
const folderHandler_1 = require("./handler/folderHandler");
const modeHandler_1 = require("./handler/modeHandler");
const statusBarItems_1 = require("./items/statusBarItems");
const launchProvider_1 = require("./provider/launchProvider");
const propertiesProvider_1 = require("./provider/propertiesProvider");
const settingsProvider_1 = require("./provider/settingsProvider");
const taskProvider_1 = require("./provider/taskProvider");
const fileUtils_1 = require("./utils/fileUtils");
const logger = require("./utils/logger");
const types_1 = require("./utils/types");
const vscodeUtils_1 = require("./utils/vscodeUtils");
let folderContextMenuDisposable;
let taskProviderDisposable;
let commandHandlerDisposable;
let commandToggleStateDisposable;
let commandFolderDisposable;
let commandModeDisposable;
let commandBuildDisposable;
let commandRunDisposable;
let commandDebugDisposable;
let commandCleanDisposable;
let commandArgumentDisposable;
let commandResetDisposable;
let eventConfigurationDisposable;
let eventRenameFilesDisposable;
let eventDeleteFilesDisposable;
let settingsProvider;
let launchProvider;
let propertiesProvider;
let taskProvider;
let folderStatusBar;
let modeStatusBar;
let buildStatusBar;
let runStatusBar;
let debugStatusBar;
let cleanStatusBar;
let argumentsString;
let workspaceFolder;
let activeFolder;
let buildMode = types_1.Builds.debug;
let showStatusBarItems = true;
let createExtensionFiles = true;
const EXTENSION_NAME = 'C_Cpp_Runner';
exports.loggingActive = false;
exports.experimentalExecutionEnabled = false;
function activate(context) {
    if (!vscode.workspace.workspaceFolders ||
        vscode.workspace.workspaceFolders.length === 0) {
        return;
    }
    if (!vscode.workspace.workspaceFolders[0] ||
        !vscode.workspace.workspaceFolders[0].uri) {
        return;
    }
    if (vscode.workspace.workspaceFolders.length === 1) {
        workspaceFolder = vscode.workspace.workspaceFolders[0].uri.fsPath;
    }
    vscodeUtils_1.setContextValue(`${EXTENSION_NAME}:activatedExtension`, true);
    vscodeUtils_1.updateActivationState(true);
    const courseMakefileFound = vscodeUtils_1.isCourseProject();
    if (courseMakefileFound) {
        const infoMessage = `Course Makefile found. Exiting extension.`;
        logger.log(exports.loggingActive, infoMessage);
        deactivate();
        return;
    }
    const cmakeFileFound = vscodeUtils_1.isCmakeProject();
    if (cmakeFileFound) {
        showStatusBarItems = false;
        createExtensionFiles = false;
        const infoMessage = `CMake Project found. UI disabled.`;
        logger.log(exports.loggingActive, infoMessage);
    }
    exports.extensionContext = context;
    exports.extensionPath = context.extensionPath;
    exports.extensionState = context.workspaceState;
    vscodeUtils_1.updateLoggingState();
    exports.loggingActive = vscodeUtils_1.getLoggingState();
    exports.experimentalExecutionEnabled = vscodeUtils_1.getExperimentalExecutionState();
    initFolderStatusBar();
    initModeStatusBar();
    initBuildStatusBar();
    initRunStatusBar();
    initDebugStatusBar();
    initCleanStatusBar();
    initWorkspaceProvider();
    initWorkspaceDisposables();
    initEventListener();
}
exports.activate = activate;
function deactivate() {
    vscodeUtils_1.setContextValue(`${EXTENSION_NAME}:activatedExtension`, false);
    vscodeUtils_1.updateActivationState(false);
    vscodeUtils_1.disposeItem(folderStatusBar);
    vscodeUtils_1.disposeItem(modeStatusBar);
    vscodeUtils_1.disposeItem(buildStatusBar);
    vscodeUtils_1.disposeItem(runStatusBar);
    vscodeUtils_1.disposeItem(debugStatusBar);
    vscodeUtils_1.disposeItem(cleanStatusBar);
    vscodeUtils_1.disposeItem(taskProviderDisposable);
    vscodeUtils_1.disposeItem(folderContextMenuDisposable);
    vscodeUtils_1.disposeItem(commandHandlerDisposable);
    vscodeUtils_1.disposeItem(commandToggleStateDisposable);
    vscodeUtils_1.disposeItem(commandFolderDisposable);
    vscodeUtils_1.disposeItem(commandModeDisposable);
    vscodeUtils_1.disposeItem(commandBuildDisposable);
    vscodeUtils_1.disposeItem(commandRunDisposable);
    vscodeUtils_1.disposeItem(commandDebugDisposable);
    vscodeUtils_1.disposeItem(commandCleanDisposable);
    vscodeUtils_1.disposeItem(commandArgumentDisposable);
    vscodeUtils_1.disposeItem(commandResetDisposable);
    vscodeUtils_1.disposeItem(eventConfigurationDisposable);
    vscodeUtils_1.disposeItem(eventDeleteFilesDisposable);
    vscodeUtils_1.disposeItem(eventRenameFilesDisposable);
}
exports.deactivate = deactivate;
function initWorkspaceProvider() {
    if (!workspaceFolder || !createExtensionFiles || !activeFolder)
        return;
    if (!settingsProvider) {
        settingsProvider = new settingsProvider_1.SettingsProvider(workspaceFolder, activeFolder);
    }
    if (!propertiesProvider) {
        propertiesProvider = new propertiesProvider_1.PropertiesProvider(settingsProvider, workspaceFolder, activeFolder);
    }
    if (!launchProvider) {
        launchProvider = new launchProvider_1.LaunchProvider(settingsProvider, workspaceFolder, activeFolder);
    }
    if (!taskProvider) {
        taskProvider = new taskProvider_1.TaskProvider(settingsProvider, workspaceFolder, activeFolder, buildMode, argumentsString);
    }
}
function initWorkspaceDisposables() {
    initTaskProviderDisposable();
    initArgumentParser();
    initContextMenuDisposable();
    initReset();
    initToggleDisposable();
}
function initTaskProviderDisposable() {
    if (!taskProvider || taskProviderDisposable)
        return;
    taskProviderDisposable = vscode.tasks.registerTaskProvider(EXTENSION_NAME, taskProvider);
    exports.extensionContext?.subscriptions.push(taskProviderDisposable);
}
function initToggleDisposable() {
    if (commandToggleStateDisposable)
        return;
    commandToggleStateDisposable = vscode.commands.registerCommand(`${EXTENSION_NAME}.toggleExtensionState`, () => {
        showStatusBarItems = !showStatusBarItems;
        toggleStatusBarItems();
        createExtensionFiles = !createExtensionFiles;
        if (createExtensionFiles) {
            initWorkspaceProvider();
            initWorkspaceDisposables();
            settingsProvider?.createFileData();
            propertiesProvider?.createFileData();
        }
        const extensionIsDisabled = !showStatusBarItems && !createExtensionFiles;
        if (extensionIsDisabled) {
            vscodeUtils_1.setContextValue(`${EXTENSION_NAME}:activatedExtension`, !extensionIsDisabled);
            vscodeUtils_1.updateActivationState(!extensionIsDisabled);
        }
        else {
            vscodeUtils_1.setContextValue(`${EXTENSION_NAME}:activatedExtension`, !extensionIsDisabled);
            vscodeUtils_1.updateActivationState(!extensionIsDisabled);
        }
        const infoMessage = `Called toggleExtensionState.`;
        logger.log(exports.loggingActive, infoMessage);
    });
    exports.extensionContext?.subscriptions.push(commandToggleStateDisposable);
}
function initContextMenuDisposable() {
    if (folderContextMenuDisposable)
        return;
    folderContextMenuDisposable = vscode.commands.registerCommand(`${EXTENSION_NAME}.folderContextMenu`, async (clickedUriItem, selectedUriItems) => {
        if (selectedUriItems.length > 1)
            return;
        const workspaceItem = vscode.workspace.getWorkspaceFolder(clickedUriItem);
        if (!workspaceItem)
            return;
        activeFolder = clickedUriItem.fsPath;
        workspaceFolder = workspaceItem.uri.fsPath;
        updateFolderData();
        const infoMessage = `Called folderContextMenu.`;
        logger.log(exports.loggingActive, infoMessage);
    });
    exports.extensionContext?.subscriptions.push(folderContextMenuDisposable);
}
function initEventListener() {
    initConfigurationChangeDisposable();
    initFileRenameDisposable();
    initFileDeleteDisposable();
}
function initConfigurationChangeDisposable() {
    if (eventConfigurationDisposable)
        return;
    eventConfigurationDisposable = vscode.workspace.onDidChangeConfiguration((e) => {
        const isChanged = e.affectsConfiguration(EXTENSION_NAME);
        const extensionIsActive = vscodeUtils_1.getActivationState();
        if (isChanged && extensionIsActive) {
            settingsProvider?.updateFileContent();
            propertiesProvider?.updateFileContent();
            launchProvider?.updateFileContent();
            taskProvider?.getTasks();
        }
    });
    exports.extensionContext?.subscriptions.push(eventConfigurationDisposable);
}
function initFileRenameDisposable() {
    if (eventRenameFilesDisposable)
        return;
    eventRenameFilesDisposable = vscode.workspace.onDidRenameFiles((e) => {
        const extensionIsActive = vscodeUtils_1.getActivationState();
        if (!extensionIsActive)
            return;
        e.files.forEach((file) => {
            const oldName = file.oldUri.fsPath;
            const newName = file.newUri.fsPath;
            const infoMessage = `Renaming: ${oldName} -> ${newName}.`;
            logger.log(exports.loggingActive, infoMessage);
            if (workspaceFolder && oldName === workspaceFolder) {
                workspaceFolder = newName;
                updateFolderData();
            }
            else if (activeFolder && oldName === activeFolder) {
                activeFolder = newName;
                updateFolderData();
            }
        });
    });
    exports.extensionContext?.subscriptions.push(eventRenameFilesDisposable);
}
function initFileDeleteDisposable() {
    if (!eventDeleteFilesDisposable)
        return;
    eventDeleteFilesDisposable = vscode.workspace.onDidDeleteFiles((e) => {
        const extensionIsActive = vscodeUtils_1.getActivationState();
        if (!extensionIsActive)
            return;
        e.files.forEach((file) => {
            const oldName = file.fsPath;
            const infoMessage = `Deleting: ${oldName}.`;
            logger.log(exports.loggingActive, infoMessage);
            if (workspaceFolder && oldName === workspaceFolder) {
                workspaceFolder = undefined;
                updateFolderData();
                statusBarItems_1.updateFolderStatus(folderStatusBar, taskProvider, showStatusBarItems);
            }
            else if (activeFolder && oldName === activeFolder) {
                activeFolder = undefined;
                updateFolderData();
                statusBarItems_1.updateFolderStatus(folderStatusBar, taskProvider, showStatusBarItems);
            }
        });
    });
    exports.extensionContext?.subscriptions.push(eventDeleteFilesDisposable);
}
function toggleStatusBarItems() {
    if (showStatusBarItems) {
        folderStatusBar?.show();
        modeStatusBar?.show();
        buildStatusBar?.show();
        runStatusBar?.show();
        debugStatusBar?.show();
        cleanStatusBar?.show();
    }
    else {
        folderStatusBar?.hide();
        modeStatusBar?.hide();
        buildStatusBar?.hide();
        runStatusBar?.hide();
        debugStatusBar?.hide();
        cleanStatusBar?.hide();
    }
}
function updateFolderData() {
    initWorkspaceProvider();
    initWorkspaceDisposables();
    argumentsString = '';
    if (taskProvider) {
        taskProvider.updateFolderData(workspaceFolder, activeFolder);
        taskProvider.updateArguments(argumentsString);
        taskProvider.updateModeData(buildMode);
    }
    if (workspaceFolder && activeFolder) {
        if (settingsProvider) {
            settingsProvider.updateFolderData(workspaceFolder);
            settingsProvider.updateFileContent();
            if (propertiesProvider) {
                propertiesProvider.updateFolderData(workspaceFolder);
            }
            if (launchProvider) {
                launchProvider.updateFolderData(workspaceFolder, activeFolder);
                launchProvider.updateModeData(buildMode);
                launchProvider.updateFileContent();
            }
        }
    }
    if (folderStatusBar) {
        statusBarItems_1.updateFolderStatus(folderStatusBar, taskProvider, showStatusBarItems);
    }
    if (modeStatusBar) {
        statusBarItems_1.updateModeStatus(modeStatusBar, showStatusBarItems, activeFolder, buildMode);
    }
    if (buildStatusBar) {
        statusBarItems_1.updateBuildStatus(buildStatusBar, showStatusBarItems, activeFolder);
    }
    if (runStatusBar) {
        statusBarItems_1.updateRunStatus(runStatusBar, showStatusBarItems, activeFolder);
    }
    if (cleanStatusBar) {
        statusBarItems_1.updateCleanStatus(cleanStatusBar, showStatusBarItems, activeFolder);
    }
    if (debugStatusBar) {
        statusBarItems_1.updateDebugStatus(debugStatusBar, showStatusBarItems, activeFolder);
    }
}
function initFolderStatusBar() {
    if (folderStatusBar)
        return;
    folderStatusBar = vscodeUtils_1.createStatusBarItem();
    exports.extensionContext?.subscriptions.push(folderStatusBar);
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders) {
        if (workspaceFolders.length === 1) {
            if (!workspaceFolders[0] || !workspaceFolders[0].uri.fsPath)
                return;
            const workspaceFolderFs = workspaceFolders[0].uri.fsPath;
            const folders = fileUtils_1.foldersInDir(workspaceFolderFs);
            if (folders.length === 0) {
                workspaceFolder = workspaceFolderFs;
                activeFolder = workspaceFolderFs;
                updateFolderData();
            }
            else {
                statusBarItems_1.updateFolderStatus(folderStatusBar, taskProvider, showStatusBarItems);
            }
        }
        else {
            statusBarItems_1.updateFolderStatus(folderStatusBar, taskProvider, showStatusBarItems);
        }
    }
    if (commandFolderDisposable)
        return;
    const commandName = `${EXTENSION_NAME}.folder`;
    commandFolderDisposable = vscode.commands.registerCommand(commandName, async () => {
        const ret = await folderHandler_1.folderHandler(settingsProvider);
        if (ret && ret.activeFolder && ret.workspaceFolder) {
            activeFolder = ret.activeFolder;
            workspaceFolder = ret.workspaceFolder;
            updateFolderData();
        }
        else {
            const infoMessage = `Folder callback aborted.`;
            logger.log(exports.loggingActive, infoMessage);
        }
    });
    folderStatusBar.command = commandName;
    exports.extensionContext?.subscriptions.push(commandFolderDisposable);
}
function initModeStatusBar() {
    if (modeStatusBar)
        return;
    modeStatusBar = vscodeUtils_1.createStatusBarItem();
    exports.extensionContext?.subscriptions.push(modeStatusBar);
    statusBarItems_1.updateModeStatus(modeStatusBar, showStatusBarItems, activeFolder, buildMode);
    const commandName = `${EXTENSION_NAME}.mode`;
    commandModeDisposable = vscode.commands.registerCommand(commandName, async () => {
        const pickedMode = await modeHandler_1.modeHandler();
        if (pickedMode) {
            buildMode = pickedMode;
            if (taskProvider) {
                taskProvider.updateModeData(buildMode);
            }
            statusBarItems_1.updateModeStatus(modeStatusBar, showStatusBarItems, activeFolder, buildMode);
            if (!taskProvider)
                return;
            taskProvider.updateModeData(buildMode);
            if (!launchProvider)
                return;
            launchProvider.updateModeData(buildMode);
            launchProvider.updateFileContent();
        }
        else {
            const infoMessage = `Mode callback aborted.`;
            logger.log(exports.loggingActive, infoMessage);
        }
    });
    modeStatusBar.command = commandName;
    exports.extensionContext?.subscriptions.push(commandModeDisposable);
}
function initArgumentParser() {
    if (commandResetDisposable)
        return;
    const commandName = `${EXTENSION_NAME}.args`;
    commandResetDisposable = vscode.commands.registerCommand(commandName, async () => {
        argumentsString = await vscode.window.showInputBox();
        if (taskProvider) {
            taskProvider.updateArguments(argumentsString);
        }
    });
    exports.extensionContext?.subscriptions.push(commandResetDisposable);
}
function initReset() {
    if (commandArgumentDisposable)
        return;
    const commandName = `${EXTENSION_NAME}.resetLocalSettings`;
    commandArgumentDisposable = vscode.commands.registerCommand(commandName, async () => {
        if (!settingsProvider)
            return;
        settingsProvider.reset();
        propertiesProvider?.updateFileContent();
        taskProvider?.getTasks();
        launchProvider?.updateFileContent();
    });
    exports.extensionContext?.subscriptions.push(commandArgumentDisposable);
}
function initBuildStatusBar() {
    if (buildStatusBar)
        return;
    buildStatusBar = vscodeUtils_1.createStatusBarItem();
    exports.extensionContext?.subscriptions.push(buildStatusBar);
    statusBarItems_1.updateBuildStatus(buildStatusBar, showStatusBarItems, activeFolder);
    const commandName = `${EXTENSION_NAME}.build`;
    commandBuildDisposable = vscode.commands.registerCommand(commandName, async () => {
        if (!taskProvider || !taskProvider.tasks) {
            const infoMessage = `buildCallback failed`;
            logger.log(exports.loggingActive, infoMessage);
            return;
        }
        taskProvider.getTasks();
        const projectFolder = taskProvider.getProjectFolder();
        if (!projectFolder)
            return;
        const buildTaskIndex = 0;
        const buildTask = taskProvider.tasks[buildTaskIndex];
        if (!buildTask)
            return;
        if (!buildTask.execution ||
            !(buildTask.execution instanceof vscode.ShellExecution) ||
            !buildTask.execution.commandLine) {
            return;
        }
        buildTask.execution.commandLine = buildTask.execution.commandLine.replace('FILE_DIR', projectFolder);
        if (!activeFolder)
            return;
        const buildDir = path.join(activeFolder, 'build');
        const modeDir = path.join(buildDir, `${buildMode}`);
        if (!fileUtils_1.pathExists(modeDir))
            fileUtils_1.mkdirRecursive(modeDir);
        if (!settingsProvider)
            return;
        const hasNoneExtendedAsciiChars = [...buildDir].some((char) => char.charCodeAt(0) > 255);
        if (exports.experimentalExecutionEnabled ||
            buildDir.includes(' ') ||
            hasNoneExtendedAsciiChars) {
            await builder_1.executeBuildTask(buildTask, settingsProvider, activeFolder, buildMode);
        }
        else {
            await vscode.tasks.executeTask(buildTask);
        }
    });
    buildStatusBar.command = commandName;
    exports.extensionContext?.subscriptions.push(commandBuildDisposable);
}
function initRunStatusBar() {
    if (runStatusBar)
        return;
    runStatusBar = vscodeUtils_1.createStatusBarItem();
    exports.extensionContext?.subscriptions.push(runStatusBar);
    statusBarItems_1.updateRunStatus(runStatusBar, showStatusBarItems, activeFolder);
    const commandName = `${EXTENSION_NAME}.run`;
    commandRunDisposable = vscode.commands.registerCommand(commandName, async () => {
        if (!taskProvider || !taskProvider.tasks) {
            const infoMessage = `runCallback failed`;
            logger.log(exports.loggingActive, infoMessage);
            return;
        }
        taskProvider.getTasks();
        const projectFolder = taskProvider.getProjectFolder();
        if (!projectFolder)
            return;
        const runTaskIndex = 1;
        const runTask = taskProvider.tasks[runTaskIndex];
        if (!runTask)
            return;
        if (!runTask.execution ||
            !(runTask.execution instanceof vscode.ShellExecution) ||
            !runTask.execution.commandLine) {
            return;
        }
        runTask.execution.commandLine = runTask.execution.commandLine.replace('FILE_DIR', projectFolder);
        if (!activeFolder)
            return;
        const buildDir = path.join(activeFolder, 'build');
        const modeDir = path.join(buildDir, `${buildMode}`);
        if (!fileUtils_1.pathExists(modeDir))
            return;
        if (!settingsProvider) {
            return;
        }
        const hasNoneExtendedAsciiChars = [...buildDir].some((char) => char.charCodeAt(0) > 255);
        if (exports.experimentalExecutionEnabled ||
            buildDir.includes(' ') ||
            hasNoneExtendedAsciiChars) {
            await runner_1.executeRunTask(runTask, activeFolder, buildMode, argumentsString, settingsProvider.operatingSystem);
        }
        else {
            await vscode.tasks.executeTask(runTask);
        }
    });
    runStatusBar.command = commandName;
    exports.extensionContext?.subscriptions.push(commandRunDisposable);
}
function initDebugStatusBar() {
    if (debugStatusBar)
        return;
    debugStatusBar = vscodeUtils_1.createStatusBarItem();
    exports.extensionContext?.subscriptions.push(debugStatusBar);
    statusBarItems_1.updateDebugStatus(debugStatusBar, showStatusBarItems, activeFolder);
    const commandName = `${EXTENSION_NAME}.debug`;
    commandDebugDisposable = vscode.commands.registerCommand(commandName, () => {
        if (!activeFolder || !workspaceFolder) {
            const infoMessage = `debugCallback failed`;
            logger.log(exports.loggingActive, infoMessage);
            return;
        }
        if (taskProvider)
            debugger_1.runDebugger(activeFolder, workspaceFolder, buildMode);
    });
    debugStatusBar.command = commandName;
    exports.extensionContext?.subscriptions.push(commandDebugDisposable);
}
function initCleanStatusBar() {
    if (cleanStatusBar)
        return;
    cleanStatusBar = vscodeUtils_1.createStatusBarItem();
    exports.extensionContext?.subscriptions.push(cleanStatusBar);
    statusBarItems_1.updateCleanStatus(cleanStatusBar, showStatusBarItems, activeFolder);
    const commandName = `${EXTENSION_NAME}.clean`;
    commandCleanDisposable = vscode.commands.registerCommand(commandName, async () => {
        if (!taskProvider ||
            !taskProvider.tasks ||
            !activeFolder ||
            !workspaceFolder) {
            const infoMessage = `cleanCallback failed`;
            logger.log(exports.loggingActive, infoMessage);
            return;
        }
        const cleanTaskIndex = 2;
        const cleanTask = taskProvider.tasks[cleanTaskIndex];
        if (!cleanTask)
            return;
        const buildDir = path.join(activeFolder, 'build');
        const modeDir = path.join(buildDir, `${buildMode}`);
        if (!cleanTask.execution ||
            !(cleanTask.execution instanceof vscode.ShellExecution) ||
            !cleanTask.execution.commandLine) {
            return;
        }
        let relativeModeDir = modeDir.replace(workspaceFolder, '');
        relativeModeDir = fileUtils_1.replaceBackslashes(relativeModeDir);
        cleanTask.execution.commandLine = `echo Cleaning ${relativeModeDir}...`;
        if (!fileUtils_1.pathExists(modeDir))
            return;
        fileUtils_1.rmdirRecursive(modeDir);
        await vscode.tasks.executeTask(cleanTask);
    });
    cleanStatusBar.command = commandName;
    exports.extensionContext?.subscriptions.push(commandCleanDisposable);
}
//# sourceMappingURL=extension.js.map