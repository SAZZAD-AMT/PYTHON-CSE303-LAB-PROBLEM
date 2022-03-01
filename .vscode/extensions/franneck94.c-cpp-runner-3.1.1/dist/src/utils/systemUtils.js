"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompilerArchitecture = exports.getOperatingSystem = exports.commandExists = void 0;
const child_process_1 = require("child_process");
const lookpath_1 = require("lookpath");
const os_1 = require("os");
const types_1 = require("./types");
async function commandExists(command) {
    let commandPath = await lookpath_1.lookpath(command);
    if (!commandPath) {
        return { f: false, p: commandPath };
    }
    if (commandPath.includes('.EXE')) {
        commandPath = commandPath.replace('.EXE', '.exe');
    }
    return { f: true, p: commandPath };
}
exports.commandExists = commandExists;
function getOperatingSystem() {
    const platformName = os_1.platform();
    let operatingSystem;
    if (platformName === 'win32') {
        operatingSystem = types_1.OperatingSystems.windows;
    }
    else if (platformName === 'darwin') {
        operatingSystem = types_1.OperatingSystems.mac;
    }
    else {
        operatingSystem = types_1.OperatingSystems.linux;
    }
    return operatingSystem;
}
exports.getOperatingSystem = getOperatingSystem;
function getCompilerArchitecture(compiler) {
    const command = `${compiler} -dumpmachine`;
    let byteArray;
    try {
        byteArray = child_process_1.execSync(command);
    }
    catch (err) {
        byteArray = Buffer.from('x64', 'utf-8');
    }
    const str = String.fromCharCode(...byteArray);
    let architecure = types_1.Architectures.x86;
    let isCygwin = false;
    if (str.includes('64')) {
        architecure = types_1.Architectures.x64;
    }
    if (str.includes('cygwin')) {
        isCygwin = true;
    }
    return { architecure: architecure, isCygwin: isCygwin };
}
exports.getCompilerArchitecture = getCompilerArchitecture;
//# sourceMappingURL=systemUtils.js.map