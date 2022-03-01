"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocstringIndentation = void 0;
const utilities_1 = require("./utilities");
function getDocstringIndentation(document, linePosition, defaultIndentation) {
    const lines = document.split("\n");
    const definitionPattern = /\b(((async\s+)?\s*def)|\s*class)\b/g;
    let currentLineNum = linePosition;
    while (currentLineNum >= 0) {
        const currentLine = lines[currentLineNum];
        if (!(0, utilities_1.blankLine)(currentLine)) {
            if (definitionPattern.test(currentLine)) {
                return (0, utilities_1.getIndentation)(currentLine) + defaultIndentation;
            }
        }
        currentLineNum--;
    }
    return defaultIndentation;
}
exports.getDocstringIndentation = getDocstringIndentation;
//# sourceMappingURL=get_docstring_indentation.js.map