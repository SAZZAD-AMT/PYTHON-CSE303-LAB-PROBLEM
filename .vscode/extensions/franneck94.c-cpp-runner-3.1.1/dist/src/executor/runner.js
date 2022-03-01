"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeRunTask = void 0;
const path = require("path");
const vscode = require("vscode");
const fileUtils_1 = require("../utils/fileUtils");
const types_1 = require("../utils/types");
async function executeRunTask(task, activeFolder, buildMode, argumentsString, operatingSystem) {
    const buildDir = path.join(activeFolder, 'build');
    const modeDir = path.join(buildDir, `${buildMode}`);
    if (!fileUtils_1.pathExists(modeDir))
        return;
    let executableName;
    if (operatingSystem === types_1.OperatingSystems.windows) {
        executableName = `out${buildMode}.exe`;
    }
    else {
        executableName = `./out${buildMode}`;
    }
    if (argumentsString) {
        executableName += argumentsString;
    }
    const executablePath = path.join(modeDir, executableName);
    if (!fileUtils_1.pathExists(executablePath))
        return;
    if (task && task.execution) {
        const commandLine = `${executablePath}`;
        task.execution.commandLine = commandLine;
        await vscode.tasks.executeTask(task);
    }
}
exports.executeRunTask = executeRunTask;
//# sourceMappingURL=runner.js.map