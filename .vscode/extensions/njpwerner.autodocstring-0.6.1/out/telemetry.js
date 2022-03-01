"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code borrowed from https://github.com/microsoft/vscode-python
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStackTrace = void 0;
const stackTrace = require("stack-trace");
const path_1 = require("path");
const constants_1 = require("./constants");
function getStackTrace(ex) {
    // We aren't showing the error message (ex.message) since it might
    // contain PII.
    let trace = "\t";
    for (const frame of stackTrace.parse(ex)) {
        let filename = frame.getFileName();
        if (filename) {
            if (!constants_1.debug && !isExtensionFile(filename)) {
                continue;
            }
            filename = sanitizeFilename(filename);
            const lineno = frame.getLineNumber();
            const colno = frame.getColumnNumber();
            trace += `\n\tat ${getCallSite(frame)} ${filename}:${lineno}:${colno}`;
        }
        else {
            trace += "\n\tat <anonymous>";
        }
    }
    // Ensure we always use `/` as path separators.
    // This way stack traces (with relative paths) coming from different OS will always look the same.
    return trace.trim().replace(/\\/g, "/");
}
exports.getStackTrace = getStackTrace;
function isExtensionFile(filename) {
    const extensionPath = constants_1.extensionRoot.path;
    if (!extensionPath) {
        return true;
    }
    return filename.startsWith(extensionPath);
}
function sanitizeFilename(filename) {
    const extensionPath = constants_1.extensionRoot.path;
    if (!extensionPath) {
        return "<hidden_no_extension_root>";
    }
    if (filename.startsWith(extensionPath)) {
        filename = `<autoDocstring>${filename.substring(extensionPath.length)}`;
    }
    else {
        // We don't really care about files outside our extension.
        filename = `<hidden>${path_1.sep}${(0, path_1.basename)(filename)}`;
    }
    return filename;
}
function sanitizeName(name) {
    if (name.indexOf("/") === -1 && name.indexOf("\\") === -1) {
        return name;
    }
    else {
        return "<hidden>";
    }
}
function getCallSite(frame) {
    const parts = [];
    if (typeof frame.getTypeName() === "string" && frame.getTypeName().length > 0) {
        parts.push(frame.getTypeName());
    }
    if (typeof frame.getMethodName() === "string" && frame.getMethodName().length > 0) {
        parts.push(frame.getMethodName());
    }
    if (typeof frame.getFunctionName() === "string" && frame.getFunctionName().length > 0) {
        if (parts.length !== 2 || parts.join(".") !== frame.getFunctionName()) {
            parts.push(frame.getFunctionName());
        }
    }
    return parts.map(sanitizeName).join(".");
}
//# sourceMappingURL=telemetry.js.map