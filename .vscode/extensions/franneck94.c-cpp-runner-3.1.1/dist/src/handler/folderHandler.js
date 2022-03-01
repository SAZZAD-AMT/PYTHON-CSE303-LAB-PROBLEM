"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderHandler = void 0;
const path = require("path");
const vscode = require("vscode");
const fileUtils_1 = require("../utils/fileUtils");
async function folderHandler(settingsProvider) {
    const workspacesFolders = vscode.workspace.workspaceFolders;
    if (!workspacesFolders)
        return;
    let foldersList = [];
    workspacesFolders.forEach((folder) => {
        const directories = [folder.name];
        const recursiveDirectories = fileUtils_1.getDirectoriesRecursive(folder.uri.fsPath);
        if (recursiveDirectories) {
            directories.push(...recursiveDirectories);
        }
        directories.forEach((dir) => {
            let text = dir.replace(folder.uri.fsPath, folder.name);
            text = fileUtils_1.replaceBackslashes(text);
            foldersList.push(text);
        });
        if (settingsProvider) {
            foldersList = fileUtils_1.excludePatternFromList(settingsProvider.excludeSearch, foldersList);
        }
        foldersList = fileUtils_1.naturalSort(foldersList);
    });
    const activeFolderStr = await vscode.window.showQuickPick(foldersList, {
        placeHolder: 'Select folder to init the C/C++ Runner extension.',
    });
    let activeFolder;
    let workspaceFolder;
    if (activeFolderStr) {
        const folderSplit = activeFolderStr.split('/');
        const workspaceName = folderSplit[0];
        workspacesFolders.forEach((folder) => {
            if (folder.name === workspaceName) {
                workspaceFolder = folder.uri.fsPath;
            }
        });
        if (workspaceFolder) {
            activeFolder = path.join(workspaceFolder, ...folderSplit.slice(1));
        }
    }
    return { activeFolder, workspaceFolder };
}
exports.folderHandler = folderHandler;
//# sourceMappingURL=folderHandler.js.map