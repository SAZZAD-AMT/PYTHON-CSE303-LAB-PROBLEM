"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBody = void 0;
const utilities_1 = require("./utilities");
function getBody(document, linePosition) {
    const lines = document.split("\n");
    const body = [];
    let currentLineNum = linePosition;
    const originalIndentation = getBodyBaseIndentation(lines, linePosition);
    while (currentLineNum < lines.length) {
        const line = lines[currentLineNum];
        if ((0, utilities_1.blankLine)(line)) {
            currentLineNum++;
            continue;
        }
        if ((0, utilities_1.indentationOf)(line) < originalIndentation) {
            break;
        }
        body.push(line);
        currentLineNum++;
    }
    return (0, utilities_1.preprocessLines)(body);
}
exports.getBody = getBody;
function getBodyBaseIndentation(lines, linePosition) {
    let currentLineNum = linePosition;
    const functionDefRegex = /\s*def \w+/;
    while (currentLineNum < lines.length) {
        const line = lines[currentLineNum];
        if ((0, utilities_1.blankLine)(line)) {
            currentLineNum++;
            continue;
        }
        if (functionDefRegex.test(line)) {
            break;
        }
        return (0, utilities_1.indentationOf)(line);
    }
    return 10000;
}
//# sourceMappingURL=get_body.js.map