"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCleanStatus = exports.updateDebugStatus = exports.updateRunStatus = exports.updateBuildStatus = exports.updateModeStatus = exports.updateFolderStatus = void 0;
const path = require("path");
const fileUtils_1 = require("../utils/fileUtils");
function updateFolderStatus(status, taskProvider, showStatusBarItems) {
    if (!status)
        return;
    if (taskProvider &&
        taskProvider.workspaceFolder &&
        taskProvider.activeFolder) {
        const workspaceFolder = taskProvider.workspaceFolder;
        const workspaceName = path.basename(workspaceFolder);
        let text = taskProvider.activeFolder.replace(workspaceFolder, workspaceName);
        text = fileUtils_1.replaceBackslashes(text);
        const dirs = text.split('/');
        if (dirs.length > 2) {
            const lastElement = dirs.length - 1;
            text = `${dirs[0]}/.../${dirs[lastElement]}`;
        }
        status.color = '';
        status.text = `$(folder-active) ${text}`;
    }
    else {
        status.color = '#ffff00';
        status.text = '$(alert) Select folder.';
    }
    if (showStatusBarItems) {
        status.show();
    }
    else {
        status.hide();
    }
}
exports.updateFolderStatus = updateFolderStatus;
function updateModeStatus(status, showStatusBarItems, activeFolder, buildMode) {
    if (!status)
        return;
    status.text = `$(tools) ${buildMode}`;
    toggleShow(status, showStatusBarItems, activeFolder);
}
exports.updateModeStatus = updateModeStatus;
function updateBuildStatus(status, showStatusBarItems, activeFolder) {
    if (!status)
        return;
    status.text = `$(gear)`;
    toggleShow(status, showStatusBarItems, activeFolder);
}
exports.updateBuildStatus = updateBuildStatus;
function updateRunStatus(status, showStatusBarItems, activeFolder) {
    if (!status)
        return;
    status.text = `$(play)`;
    toggleShow(status, showStatusBarItems, activeFolder);
}
exports.updateRunStatus = updateRunStatus;
function updateDebugStatus(status, showStatusBarItems, activeFolder) {
    if (!status)
        return;
    status.text = `$(bug)`;
    toggleShow(status, showStatusBarItems, activeFolder);
}
exports.updateDebugStatus = updateDebugStatus;
function updateCleanStatus(status, showStatusBarItems, activeFolder) {
    if (!status)
        return;
    status.text = `$(trash)`;
    toggleShow(status, showStatusBarItems, activeFolder);
}
exports.updateCleanStatus = updateCleanStatus;
function toggleShow(status, showStatusBarItems, activeFolder) {
    if (!status)
        return;
    if (showStatusBarItems && activeFolder) {
        status.show();
    }
    else {
        status.hide();
    }
}
//# sourceMappingURL=statusBarItems.js.map