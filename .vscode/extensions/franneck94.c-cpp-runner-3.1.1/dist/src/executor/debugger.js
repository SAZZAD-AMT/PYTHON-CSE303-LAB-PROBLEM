"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDebugger = void 0;
const path = require("path");
const vscode = require("vscode");
const fileUtils_1 = require("../utils/fileUtils");
const vscodeUtils_1 = require("../utils/vscodeUtils");
const CONFIG_NAME = 'C/C++ Runner: Debug Session';
async function runDebugger(activeFolder, workspaceFolder, buildMode) {
    if (!activeFolder)
        return;
    if (!workspaceFolder)
        return;
    const uriWorkspaceFolder = vscode.Uri.file(workspaceFolder);
    const folder = vscode.workspace.getWorkspaceFolder(uriWorkspaceFolder);
    const launchPath = path.join(workspaceFolder, '.vscode', 'launch.json');
    const configJson = fileUtils_1.readJsonFile(launchPath);
    if (!configJson)
        return;
    const configIdx = vscodeUtils_1.getLaunchConfigIndex(configJson, CONFIG_NAME);
    if (configIdx === undefined)
        return;
    const buildDir = path.join(activeFolder, 'build');
    const modeDir = path.join(buildDir, `${buildMode}`);
    if (!fileUtils_1.pathExists(modeDir))
        return;
    await vscode.debug.startDebugging(folder, configJson.configurations[configIdx]);
}
exports.runDebugger = runDebugger;
//# sourceMappingURL=debugger.js.map