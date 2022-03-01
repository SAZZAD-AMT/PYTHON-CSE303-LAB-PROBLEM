"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBasename = exports.removeExtension = exports.hasPathSeperators = exports.commandCheck = exports.naturalSort = exports.writeJsonFile = exports.readJsonFile = exports.foldersInDir = exports.excludePatternFromList = exports.filesInDir = exports.readDir = exports.getDirectoriesRecursive = exports.getLanguage = exports.isCSourceFile = exports.isCppSourceFile = exports.isHeaderFile = exports.addFileExtensionDot = exports.isSourceFile = exports.pathExists = exports.filterOnString = exports.rmdirRecursive = exports.mkdirRecursive = exports.replaceBackslashes = void 0;
const fs = require("fs");
const JSON5 = require("json5");
const minimatch = require("minimatch");
const path = require("path");
const extension_1 = require("../extension");
const logger = require("./logger");
const types_1 = require("./types");
function replaceBackslashes(text) {
    return text.replace(/\\/g, '/');
}
exports.replaceBackslashes = replaceBackslashes;
function mkdirRecursive(dir) {
    try {
        fs.mkdirSync(dir, { recursive: true });
    }
    catch (err) {
        const errorMessage = `mkdirRecursive: ${err}`;
        logger.log(extension_1.loggingActive, errorMessage);
    }
}
exports.mkdirRecursive = mkdirRecursive;
function rmdirRecursive(dir) {
    try {
        fs.rmdirSync(dir, { recursive: true });
    }
    catch (err) {
        const errorMessage = `rmdirSync: ${err}`;
        logger.log(extension_1.loggingActive, errorMessage);
    }
}
exports.rmdirRecursive = rmdirRecursive;
function filterOnString(names, filterName) {
    return names.filter((name) => !name.includes(filterName));
}
exports.filterOnString = filterOnString;
function pathExists(filepath) {
    try {
        fs.accessSync(filepath);
    }
    catch (err) {
        return false;
    }
    return true;
}
exports.pathExists = pathExists;
function isSourceFile(fileExt) {
    const fileExtLower = fileExt.toLowerCase();
    if (isHeaderFile(fileExtLower)) {
        return false;
    }
    if (!(isCSourceFile(fileExtLower) || isCppSourceFile(fileExtLower))) {
        return false;
    }
    return true;
}
exports.isSourceFile = isSourceFile;
function addFileExtensionDot(fileExt) {
    if (!fileExt.includes('.')) {
        fileExt = `.${fileExt}`;
    }
    return fileExt;
}
exports.addFileExtensionDot = addFileExtensionDot;
function isHeaderFile(fileExtLower) {
    fileExtLower = addFileExtensionDot(fileExtLower);
    return ['.hpp', '.hh', '.hxx', '.h'].some((ext) => fileExtLower === ext);
}
exports.isHeaderFile = isHeaderFile;
function isCppSourceFile(fileExtLower) {
    fileExtLower = addFileExtensionDot(fileExtLower);
    return ['.cpp', '.cc', '.cxx'].some((ext) => fileExtLower === ext);
}
exports.isCppSourceFile = isCppSourceFile;
function isCSourceFile(fileExtLower) {
    fileExtLower = addFileExtensionDot(fileExtLower);
    return fileExtLower === '.c';
}
exports.isCSourceFile = isCSourceFile;
function getLanguage(dir) {
    const files = filesInDir(dir);
    const anyCppFile = files.some((file) => isCppSourceFile(path.extname(file)));
    if (anyCppFile) {
        return types_1.Languages.cpp;
    }
    else {
        return types_1.Languages.c;
    }
}
exports.getLanguage = getLanguage;
function getDirectoriesRecursive(dir) {
    const directories = foldersInDir(dir);
    if (directories.length === 0)
        return;
    directories.forEach((dir) => getDirectoriesRecursive(dir)?.forEach((newDir) => directories.push(newDir)));
    return directories;
}
exports.getDirectoriesRecursive = getDirectoriesRecursive;
function readDir(dir) {
    try {
        return fs.readdirSync(dir, { withFileTypes: true });
    }
    catch (err) {
        const errorMessage = `readDir: ${err}`;
        logger.log(extension_1.loggingActive, errorMessage);
        return undefined;
    }
}
exports.readDir = readDir;
function filesInDir(dir) {
    const fileDirents = readDir(dir);
    if (!fileDirents)
        return [];
    const files = fileDirents
        .filter((file) => file.isFile())
        .map((file) => file.name);
    return files;
}
exports.filesInDir = filesInDir;
function excludePatternFromList(excludeSearch, foldersList) {
    for (const pattern of excludeSearch) {
        foldersList = foldersList.filter((folder) => !minimatch(folder, pattern));
    }
    return foldersList;
}
exports.excludePatternFromList = excludePatternFromList;
function foldersInDir(dir) {
    const fileDirents = readDir(dir);
    if (!fileDirents)
        return [];
    let folders = fileDirents.filter((folder) => folder.isDirectory());
    folders = folders.filter((folder) => !folder.name.includes('.'));
    folders = folders.filter((folder) => !folder.name.includes('__'));
    folders = folders.filter((folder) => !(folder.name === 'build'));
    folders = folders.filter((folder) => !folder.name.includes('CMake'.toLowerCase()));
    const folderNames = folders.map((folder) => path.join(dir.toString(), folder.name));
    return folderNames;
}
exports.foldersInDir = foldersInDir;
function readJsonFile(filepath) {
    let configJson;
    try {
        const fileContent = fs.readFileSync(filepath, 'utf-8');
        configJson = JSON5.parse(fileContent);
    }
    catch (err) {
        const errorMessage = `readJsonFile: ${err}`;
        logger.log(extension_1.loggingActive, errorMessage);
        return undefined;
    }
    return configJson;
}
exports.readJsonFile = readJsonFile;
function writeJsonFile(outputFilePath, jsonContent) {
    if (jsonContent === undefined)
        return;
    const dirname = path.dirname(outputFilePath);
    if (!pathExists(dirname)) {
        mkdirRecursive(dirname);
    }
    const jsonString = JSON.stringify(jsonContent, null, 2);
    try {
        fs.writeFileSync(outputFilePath, jsonString);
    }
    catch (err) {
        const errorMessage = `writeJsonFile: ${err}`;
        logger.log(extension_1.loggingActive, errorMessage);
        return;
    }
}
exports.writeJsonFile = writeJsonFile;
function naturalSort(names) {
    return names.sort((a, b) => a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base',
    }));
}
exports.naturalSort = naturalSort;
function commandCheck(key, jsonData) {
    const commandPath = jsonData[key];
    if (!commandPath)
        return false;
    if (!pathExists(commandPath))
        return false;
    return true;
}
exports.commandCheck = commandCheck;
function hasPathSeperators(pathStr) {
    return pathStr.includes('/') || pathStr.includes('\\');
}
exports.hasPathSeperators = hasPathSeperators;
function removeExtension(pathStr, ext) {
    const extStr = addFileExtensionDot(ext);
    if (pathStr.includes(extStr)) {
        return pathStr.replace(extStr, '');
    }
    return pathStr;
}
exports.removeExtension = removeExtension;
function getBasename(pathStr) {
    if (hasPathSeperators(pathStr)) {
        return path.basename(pathStr);
    }
    return pathStr;
}
exports.getBasename = getBasename;
//# sourceMappingURL=fileUtils.js.map