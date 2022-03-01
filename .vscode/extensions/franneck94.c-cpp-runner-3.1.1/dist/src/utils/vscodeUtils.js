"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCourseProject = exports.isCmakeProject = exports.getActivationState = exports.getLoggingState = exports.getExperimentalExecutionState = exports.updateActivationState = exports.updateLoggingState = exports.getLaunchConfigIndex = exports.setContextValue = exports.createStatusBarItem = exports.disposeItem = void 0;
const path = require("path");
const vscode = require("vscode");
const extension_1 = require("../extension");
const fileUtils_1 = require("./fileUtils");
const STATUS_BAR_ALIGN = vscode.StatusBarAlignment.Left;
const STATUS_BAR_PRIORITY = 50;
function disposeItem(disposableItem) {
    disposableItem?.dispose();
}
exports.disposeItem = disposeItem;
function createStatusBarItem() {
    return vscode.window.createStatusBarItem(STATUS_BAR_ALIGN, STATUS_BAR_PRIORITY);
}
exports.createStatusBarItem = createStatusBarItem;
function setContextValue(key, value) {
    return vscode.commands.executeCommand('setContext', key, value);
}
exports.setContextValue = setContextValue;
function getLaunchConfigIndex(configJson, configName) {
    let configIdx = 0;
    if (configJson) {
        for (const config of configJson.configurations) {
            if (config.name !== configName) {
                configIdx++;
            }
            else {
                return configIdx;
            }
        }
    }
    return undefined;
}
exports.getLaunchConfigIndex = getLaunchConfigIndex;
function updateLoggingState() {
    extension_1.extensionState?.update('loggingActive', vscode.workspace
        .getConfiguration('C_Cpp_Runner')
        .get('loggingActive', false));
}
exports.updateLoggingState = updateLoggingState;
function updateActivationState(newState) {
    extension_1.extensionState?.update('activatedExtension', newState);
}
exports.updateActivationState = updateActivationState;
function getExperimentalExecutionState() {
    return vscode.workspace
        .getConfiguration('C_Cpp_Runner')
        .get('experimentalExecution', false);
}
exports.getExperimentalExecutionState = getExperimentalExecutionState;
function getLoggingState() {
    if (extension_1.extensionState) {
        const loggingActive = extension_1.extensionState.get('loggingActive');
        return loggingActive;
    }
    return false;
}
exports.getLoggingState = getLoggingState;
function getActivationState() {
    if (extension_1.extensionState) {
        return extension_1.extensionState.get('activatedExtension');
    }
    return false;
}
exports.getActivationState = getActivationState;
function isCmakeProject() {
    let cmakeFileFound = false;
    const workspaceFodlers = vscode.workspace.workspaceFolders;
    const cmakeExtensionName = 'cmake';
    const cmakeSettingName = 'sourceDirectory';
    if (workspaceFodlers) {
        workspaceFodlers.forEach((folder) => {
            if (!cmakeFileFound) {
                const files = fileUtils_1.filesInDir(folder.uri.fsPath);
                files.forEach((file) => {
                    if (file.toLowerCase() === 'CMakeLists.txt'.toLowerCase()) {
                        cmakeFileFound = true;
                    }
                });
                const settingsPath = path.join(folder.uri.fsPath, '.vscode', 'settings.json');
                if (fileUtils_1.pathExists(settingsPath)) {
                    const configLocal = fileUtils_1.readJsonFile(settingsPath);
                    if (configLocal &&
                        configLocal[`${cmakeExtensionName}.${cmakeSettingName}`]) {
                        cmakeFileFound = true;
                    }
                }
            }
        });
    }
    if (!cmakeFileFound) {
        const config = vscode.workspace.getConfiguration(cmakeExtensionName);
        const cmakeSetting = config.get(cmakeSettingName);
        if (cmakeSetting && cmakeSetting !== '${workspaceFolder}') {
            cmakeFileFound = true;
        }
    }
    return cmakeFileFound;
}
exports.isCmakeProject = isCmakeProject;
function isCourseProject() {
    const workspaceFodlers = vscode.workspace.workspaceFolders;
    if (workspaceFodlers) {
        workspaceFodlers.forEach((folder) => {
            const vscodePath = path.join(folder.uri.fsPath, '.vscode');
            const makefilePath = path.join(vscodePath, 'Makefile');
            if (fileUtils_1.pathExists(makefilePath)) {
                return true;
            }
        });
    }
    return false;
}
exports.isCourseProject = isCourseProject;
//# sourceMappingURL=vscodeUtils.js.map