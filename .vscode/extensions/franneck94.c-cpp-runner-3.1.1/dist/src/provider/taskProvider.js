"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskProvider = void 0;
const path = require("path");
const vscode = require("vscode");
const extension_1 = require("../extension");
const fileUtils_1 = require("../utils/fileUtils");
const types_1 = require("../utils/types");
const vscodeUtils_1 = require("../utils/vscodeUtils");
const settingsProvider_1 = require("./settingsProvider");
const EXTENSION_NAME = 'C_Cpp_Runner';
const CONFIG_NAME = 'C/C++ Runner: Debug Session';
class TaskProvider {
    constructor(_settingsProvider, _workspaceFolder, _activeFolder, _buildMode, _argumentsString) {
        this._settingsProvider = _settingsProvider;
        this._workspaceFolder = _workspaceFolder;
        this._activeFolder = _activeFolder;
        this._buildMode = _buildMode;
        this._argumentsString = _argumentsString;
        const templateDirectory = path.join(extension_1.extensionPath ? extension_1.extensionPath : '', 'templates');
        this._tasksFile = path.join(templateDirectory, 'tasks_template.json');
        this._makefileFile = path.join(templateDirectory, 'Makefile');
        this.getTasks();
    }
    async resolveTask(task) {
        return task;
    }
    provideTasks() {
        return this.getTasks();
    }
    getTasks() {
        if (!this.activeFolder)
            return [];
        const language = fileUtils_1.getLanguage(this.activeFolder);
        this.setTasksDefinition(language);
        if (!this.tasks)
            return [];
        return this.tasks;
    }
    setTasksDefinition(language) {
        const taskType = 'shell';
        const configJson = fileUtils_1.readJsonFile(this._tasksFile);
        if (!configJson) {
            return [];
        }
        this.tasks = [];
        for (const taskJson of configJson.tasks) {
            if (taskJson.type !== taskType) {
                continue;
            }
            if (taskJson.options) {
                if (taskJson.options.hide) {
                    continue;
                }
            }
            this.updateTaskBasedOnSettings(taskJson, language);
            const shellCommand = `${taskJson.command} ${taskJson.args.join(' ')}`;
            const definition = {
                type: taskType,
                task: taskJson.label,
            };
            const problemMatcher = '$gcc';
            const scope = vscode.TaskScope.Workspace;
            const execution = new vscode.ShellExecution(shellCommand);
            const task = new types_1.Task(definition, scope, taskJson.label, EXTENSION_NAME, execution, problemMatcher);
            this.tasks.push(task);
        }
        this.addDebugTask();
        return this.tasks;
    }
    updateTaskBasedOnSettings(taskJson, language) {
        if (!this.workspaceFolder || !this.activeFolder)
            return;
        const settings = this._settingsProvider;
        const activeFolder = this.activeFolder;
        const workspaceFolder = this.workspaceFolder;
        const folder = activeFolder.replace(workspaceFolder, path.basename(workspaceFolder));
        taskJson.label = taskJson.label.replace(taskJson.label.split(': ')[1], folder);
        taskJson.label = fileUtils_1.replaceBackslashes(taskJson.label);
        taskJson.command = settings.makePath;
        taskJson.args[1] = `--file=${this._makefileFile}`;
        const isRunTask = taskJson.label.includes(types_1.Tasks.run);
        taskJson.args.push(`COMPILATION_MODE=${this.buildMode}`);
        if (this._settingsProvider.operatingSystem === types_1.OperatingSystems.windows) {
            taskJson.args.push(`EXECUTABLE_NAME=out${this.buildMode}.exe`);
        }
        else {
            taskJson.args.push(`EXECUTABLE_NAME=out${this.buildMode}`);
        }
        taskJson.args.push(`LANGUAGE_MODE=${language}`);
        if (!isRunTask) {
            if (language === types_1.Languages.c) {
                taskJson.args.push(`C_COMPILER=${settings.cCompilerPath}`);
                if (settings.cStandard &&
                    settings.cStandard !== settingsProvider_1.SettingsProvider.DEFAULT_C_STANDARD) {
                    taskJson.args.push(`C_STANDARD=${settings.cStandard}`);
                }
            }
            else {
                taskJson.args.push(`CPP_COMPILER=${settings.cppCompilerPath}`);
                if (settings.cppStandard &&
                    settings.cppStandard !== settingsProvider_1.SettingsProvider.DEFAULT_CPP_STANDARD) {
                    taskJson.args.push(`CPP_STANDARD=${settings.cppStandard}`);
                }
            }
            taskJson.args.push(`ENABLE_WARNINGS=${+settings.enableWarnings}`);
            taskJson.args.push(`WARNINGS_AS_ERRORS=${+settings.warningsAsError}`);
            if (settings.warnings && settings.warnings.length > 0) {
                const warningsStr = settings.warnings.join(' ');
                taskJson.args.push(`WARNINGS="${warningsStr}"`);
            }
            if (settings.compilerArgs && settings.compilerArgs.length > 0) {
                const compilerArgsStr = settings.compilerArgs.join(' ');
                taskJson.args.push(`COMPILER_ARGS="${compilerArgsStr}"`);
            }
            if (settings.linkerArgs && settings.linkerArgs.length > 0) {
                const linkerArgsStr = settings.linkerArgs.join(' ');
                taskJson.args.push(`LINKER_ARGS="${linkerArgsStr}"`);
            }
            if (settings.includePaths && settings.includePaths.length > 0) {
                const includePathsStr = settings.includePaths.join(' ');
                taskJson.args.push(`INCLUDE_PATHS="${includePathsStr}"`);
            }
        }
        if (isRunTask) {
            if (this.argumentsString) {
                taskJson.args.push(`ARGUMENTS=${this.argumentsString}`);
            }
        }
    }
    updateModeData(buildMode) {
        this.buildMode = buildMode;
    }
    updateArguments(argumentsString) {
        this.argumentsString = argumentsString;
        if (this.workspaceFolder) {
            const launchPath = path.join(this.workspaceFolder, '.vscode', 'launch.json');
            const configJson = fileUtils_1.readJsonFile(launchPath);
            if (!configJson)
                return;
            const configIdx = vscodeUtils_1.getLaunchConfigIndex(configJson, CONFIG_NAME);
            if (configIdx === undefined)
                return;
            if (this.argumentsString) {
                configJson.configurations[configIdx].args.push(this.argumentsString);
            }
            else {
                configJson.configurations[configIdx].args = [];
            }
            fileUtils_1.writeJsonFile(launchPath, configJson);
        }
    }
    updateFolderData(workspaceFolder, activeFolder) {
        this.resetArguments();
        this.workspaceFolder = workspaceFolder;
        this.activeFolder = activeFolder;
    }
    resetArguments() {
        if (this.workspaceFolder) {
            const launchPath = path.join(this.workspaceFolder, '.vscode', 'launch.json');
            const configJson = fileUtils_1.readJsonFile(launchPath);
            if (configJson) {
                const configIdx = vscodeUtils_1.getLaunchConfigIndex(configJson, CONFIG_NAME);
                if (configIdx === undefined)
                    return;
                configJson.configurations[configIdx].args = [];
                fileUtils_1.writeJsonFile(launchPath, configJson);
            }
        }
        this.argumentsString = undefined;
    }
    getProjectFolder() {
        if (this.activeFolder) {
            return this.activeFolder;
        }
        if (this.workspaceFolder) {
            return this.workspaceFolder;
        }
        return undefined;
    }
    addDebugTask() {
        if (!this.tasks)
            return;
        if (!this.workspaceFolder || !this.activeFolder)
            return;
        const folder = this.activeFolder.replace(this.workspaceFolder, path.basename(this.workspaceFolder));
        let label = `Debug: ${this.activeFolder}`;
        const splitted = label.split(': ');
        if (!splitted[1])
            return;
        label = label.replace(splitted[1], folder);
        label = fileUtils_1.replaceBackslashes(label);
        const definition = {
            type: 'shell',
            task: label,
        };
        const problemMatcher = '$gcc';
        const scope = vscode.TaskScope.Workspace;
        const task = new types_1.Task(definition, scope, label, EXTENSION_NAME, undefined, problemMatcher);
        this.tasks.push(task);
    }
    get buildMode() {
        return this._buildMode;
    }
    set buildMode(value) {
        this._buildMode = value;
    }
    get activeFolder() {
        return this._activeFolder;
    }
    set activeFolder(value) {
        this._activeFolder = value;
    }
    get workspaceFolder() {
        return this._workspaceFolder;
    }
    set workspaceFolder(value) {
        this._workspaceFolder = value;
    }
    get argumentsString() {
        return this._argumentsString;
    }
    set argumentsString(value) {
        this._argumentsString = value;
    }
}
exports.TaskProvider = TaskProvider;
//# sourceMappingURL=taskProvider.js.map