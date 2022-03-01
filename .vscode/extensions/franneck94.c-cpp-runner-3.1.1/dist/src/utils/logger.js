"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.getOutputChannelLogger = exports.showOutputChannel = exports.getOutputChannel = exports.Logger = void 0;
const os = require("os");
const vscode = require("vscode");
let outputChannel;
let outputChannelLogger;
class Logger {
    constructor(writer) {
        this.writer = writer;
    }
    append(message) {
        this.writer(message);
    }
    appendLine(message) {
        this.writer(message + os.EOL);
    }
    showInformationMessage(message, items) {
        this.appendLine(message);
        if (!items) {
            return vscode.window.showInformationMessage(message);
        }
        return vscode.window.showInformationMessage(message, ...items);
    }
    showWarningMessage(message, items) {
        this.appendLine(message);
        if (!items) {
            return vscode.window.showWarningMessage(message);
        }
        return vscode.window.showWarningMessage(message, ...items);
    }
    showErrorMessage(message, items) {
        this.appendLine(message);
        if (!items) {
            return vscode.window.showErrorMessage(message);
        }
        return vscode.window.showErrorMessage(message, ...items);
    }
}
exports.Logger = Logger;
function getOutputChannel() {
    if (!outputChannel) {
        outputChannel = vscode.window.createOutputChannel('C/C++ Runner');
    }
    return outputChannel;
}
exports.getOutputChannel = getOutputChannel;
function showOutputChannel() {
    getOutputChannel().show(true);
}
exports.showOutputChannel = showOutputChannel;
function getOutputChannelLogger() {
    if (!outputChannelLogger) {
        outputChannelLogger = new Logger((message) => getOutputChannel().append(message));
    }
    return outputChannelLogger;
}
exports.getOutputChannelLogger = getOutputChannelLogger;
function log(loggingActive, message) {
    if (loggingActive) {
        getOutputChannel().appendLine(message);
        showOutputChannel();
    }
}
exports.log = log;
//# sourceMappingURL=logger.js.map