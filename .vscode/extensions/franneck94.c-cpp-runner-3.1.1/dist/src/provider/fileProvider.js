"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProvider = void 0;
const path = require("path");
const extension_1 = require("../extension");
const fileUtils_1 = require("../utils/fileUtils");
const vscodeUtils_1 = require("../utils/vscodeUtils");
const callbackProvider_1 = require("./callbackProvider");
class FileProvider extends callbackProvider_1.CallbackProvider {
    constructor(workspaceFolder, templateFileName, outputFileName) {
        super(workspaceFolder, templateFileName, outputFileName);
        const templateDirectory = path.join(extension_1.extensionPath ? extension_1.extensionPath : '', 'templates');
        this.templatePath = path.join(templateDirectory, templateFileName);
        if (!fileUtils_1.pathExists(this._vscodeDirectory)) {
            fileUtils_1.mkdirRecursive(this._vscodeDirectory);
        }
    }
    createFileData() {
        if (!fileUtils_1.pathExists(this._vscodeDirectory)) {
            fileUtils_1.mkdirRecursive(this._vscodeDirectory);
        }
        this.writeFileData();
    }
    updateFileContent() {
        this.writeFileData();
    }
    deleteCallback() {
        const extensionIsActive = vscodeUtils_1.getActivationState();
        if (extensionIsActive)
            this.createFileData();
    }
    _updateFolderData(_workspaceFolder) {
        this._workspaceFolder = _workspaceFolder;
        this._vscodeDirectory = path.join(this._workspaceFolder, '.vscode');
        this._outputPath = path.join(this._vscodeDirectory, this.outputFileName);
        this.createFileWatcher();
    }
}
exports.FileProvider = FileProvider;
//# sourceMappingURL=fileProvider.js.map