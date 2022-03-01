"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackProvider = void 0;
const path = require("path");
const vscode = require("vscode");
const vscodeUtils_1 = require("../utils/vscodeUtils");
class CallbackProvider {
    constructor(_workspaceFolder, templateFileName, outputFileName) {
        this._workspaceFolder = _workspaceFolder;
        this.templateFileName = templateFileName;
        this.outputFileName = outputFileName;
        this._vscodeDirectory = path.join(this._workspaceFolder, '.vscode');
        this._outputPath = path.join(this._vscodeDirectory, outputFileName);
        this.createFileWatcher();
    }
    createFileWatcher() {
        const filePattern = new vscode.RelativePattern(this._workspaceFolder, '.vscode/**');
        this._fileWatcherOnDelete = vscode.workspace.createFileSystemWatcher(filePattern, true, true, false);
        this._fileWatcherOnChange = vscode.workspace.createFileSystemWatcher(filePattern, true, false, true);
        this._fileWatcherOnDelete.onDidDelete((e) => {
            const pathName = e.fsPath;
            if (pathName === this._vscodeDirectory || pathName === this._outputPath) {
                const extensionIsActive = vscodeUtils_1.getActivationState();
                if (extensionIsActive)
                    this.deleteCallback();
            }
        });
        this._fileWatcherOnChange.onDidChange((e) => {
            const pathName = e.fsPath;
            if (pathName === this._outputPath) {
                this.changeCallback();
            }
        });
        return;
    }
}
exports.CallbackProvider = CallbackProvider;
//# sourceMappingURL=callbackProvider.js.map