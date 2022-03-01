"use strict";
// Copyright (c) 2015 DonJayamanne. All rights reserved.
// Licensed under the MIT License.
// Code borrowed from https://github.com/DonJayamanne/gitHistoryVSCode
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDebug = exports.logInfo = exports.logError = exports.getLogChannel = void 0;
const vscode = require("vscode");
const constants_1 = require("./constants");
let outLogChannel;
const logLevel = vscode.workspace.getConfiguration(constants_1.extensionID).get("logLevel");
function getLogChannel() {
    if (outLogChannel === undefined) {
        outLogChannel = vscode.window.createOutputChannel("autoDocstring");
    }
    return outLogChannel;
}
exports.getLogChannel = getLogChannel;
function logError(error) {
    getLogChannel().appendLine(`[ERROR ${getTimeAndMs()}] ${error.toString()}`);
    getLogChannel().show();
    vscode.window.showErrorMessage("AutoDocstring encountered an error. Please view details in the 'autoDocstring' output window");
}
exports.logError = logError;
function logInfo(message) {
    if (logLevel === "Info" || logLevel === "Debug") {
        getLogChannel().appendLine(`[INFO ${getTimeAndMs()}] ${message}`);
    }
}
exports.logInfo = logInfo;
function logDebug(message) {
    if (logLevel === "Debug") {
        getLogChannel().appendLine(`[DEBUG ${getTimeAndMs()}] ${message}`);
    }
}
exports.logDebug = logDebug;
function getTimeAndMs() {
    const time = new Date();
    const hours = `0${time.getHours()}`.slice(-2);
    const minutes = `0${time.getMinutes()}`.slice(-2);
    const seconds = `0${time.getSeconds()}`.slice(-2);
    const milliSeconds = `00${time.getMilliseconds()}`.slice(-3);
    return `${hours}:${minutes}:${seconds}.${milliSeconds}`;
}
//# sourceMappingURL=logger.js.map