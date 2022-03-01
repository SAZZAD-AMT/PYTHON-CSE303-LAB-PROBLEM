"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeBuildTask = void 0;
const path = require("path");
const vscode = require("vscode");
const fileUtils_1 = require("../utils/fileUtils");
const types_1 = require("../utils/types");
async function executeBuildTask(task, settingsProvider, activeFolder, buildMode) {
    const language = fileUtils_1.getLanguage(activeFolder);
    const files = fileUtils_1.filesInDir(activeFolder);
    const buildDir = path.join(activeFolder, 'build');
    const modeDir = path.join(buildDir, `${buildMode}`);
    if (!fileUtils_1.pathExists(modeDir)) {
        fileUtils_1.mkdirRecursive(modeDir);
    }
    let executableName;
    if (settingsProvider.operatingSystem === types_1.OperatingSystems.windows) {
        executableName = `out${buildMode}.exe`;
    }
    else {
        executableName = `out${buildMode}`;
    }
    const executablePath = path.join(modeDir, executableName);
    let compiler;
    let standard;
    if (language === types_1.Languages.cpp) {
        compiler = settingsProvider.cppCompilerPath;
        standard = settingsProvider.cppStandard;
    }
    else {
        compiler = settingsProvider.cCompilerPath;
        standard = settingsProvider.cStandard;
    }
    const useWarnings = settingsProvider.enableWarnings;
    const warningsAsErrors = settingsProvider.warningsAsError;
    let warnings = '';
    if (useWarnings) {
        warnings = settingsProvider.warnings.join(' ');
    }
    if (useWarnings && warningsAsErrors) {
        warnings += ' -Werror';
    }
    const includePaths = settingsProvider.includePaths;
    const includes = includePaths.join(' -I ');
    const compilerArgs = settingsProvider.compilerArgs;
    const linkerArgs = settingsProvider.linkerArgs;
    let fullCompilerArgs = '';
    if (warnings) {
        fullCompilerArgs += `${warnings}`;
    }
    if (standard) {
        fullCompilerArgs += ` --std=${standard}`;
    }
    if (buildMode === types_1.Builds.debug) {
        fullCompilerArgs += ' -g3 -O0';
    }
    else {
        fullCompilerArgs += ' -O3 -DNDEBUG';
    }
    if (compilerArgs) {
        fullCompilerArgs += compilerArgs;
    }
    if (linkerArgs) {
        fullCompilerArgs += linkerArgs;
    }
    if (includes) {
        fullCompilerArgs += includes;
    }
    let commandLine = '';
    const objectFiles = [];
    for (const file of files) {
        const fileExtension = path.parse(file).ext;
        if (language === types_1.Languages.c && !fileUtils_1.isCSourceFile(fileExtension)) {
            continue;
        }
        else if (language === types_1.Languages.cpp && !fileUtils_1.isCppSourceFile(fileExtension)) {
            continue;
        }
        const fileBaseName = path.parse(file).name;
        const filePath = path.join(activeFolder, file);
        const objectFilePath = path.join(modeDir, fileBaseName + '.o');
        objectFiles.push(objectFilePath);
        const fullFileArgs = `-c ${filePath} -o ${objectFilePath}`;
        if (commandLine.length === 0) {
            commandLine += `${compiler} ${fullCompilerArgs} ${fullFileArgs}`;
        }
        else {
            commandLine += ` && ${compiler} ${fullCompilerArgs} ${fullFileArgs}`;
        }
    }
    const objectFilesStr = objectFiles.join(' ');
    const fullObjectFileArgs = `${objectFilesStr} -o ${executablePath}`;
    if (task && task.execution) {
        commandLine += ` && ${compiler} ${fullCompilerArgs} ${fullObjectFileArgs}`;
        task.execution.commandLine = commandLine;
        await vscode.tasks.executeTask(task);
    }
}
exports.executeBuildTask = executeBuildTask;
//# sourceMappingURL=builder.js.map