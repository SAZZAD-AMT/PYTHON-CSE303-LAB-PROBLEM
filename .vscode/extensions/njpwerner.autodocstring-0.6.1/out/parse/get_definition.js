"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefinition = void 0;
const utilities_1 = require("./utilities");
function getDefinition(document, linePosition) {
    const precedingLines = getPrecedingLines(document, linePosition);
    const precedingText = precedingLines.join(" ");
    // Don't parse if the preceding line is blank
    const precedingLine = precedingLines[precedingLines.length - 1];
    if (precedingLine == undefined || (0, utilities_1.blankLine)(precedingLine)) {
        return "";
    }
    const pattern = /\b(((async\s+)?\s*def)|\s*class)\b/g;
    // Get starting index of last def match in the preceding text
    let index;
    while (pattern.test(precedingText)) {
        index = pattern.lastIndex - RegExp.lastMatch.length;
    }
    if (index == undefined) {
        return "";
    }
    const lastFunctionDef = precedingText.slice(index);
    return lastFunctionDef.trim();
}
exports.getDefinition = getDefinition;
function getPrecedingLines(document, linePosition) {
    const lines = document.split("\n");
    const rawPrecedingLines = lines.slice(0, linePosition);
    const precedingLines = (0, utilities_1.preprocessLines)(rawPrecedingLines);
    return precedingLines;
}
//# sourceMappingURL=get_definition.js.map