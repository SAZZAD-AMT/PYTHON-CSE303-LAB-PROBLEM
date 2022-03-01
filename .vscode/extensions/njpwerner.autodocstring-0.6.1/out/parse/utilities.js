"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultIndentation = exports.blankLine = exports.indentationOf = exports.preprocessLines = exports.getIndentation = void 0;
function getIndentation(line) {
    const whiteSpaceMatches = line.match(/^[^\S\r]+/);
    if (whiteSpaceMatches == undefined) {
        return "";
    }
    return whiteSpaceMatches[0];
}
exports.getIndentation = getIndentation;
/**
 * Preprocess an array of lines.
 * For example trim spaces and discard comments
 * @param lines The lines to preprocess.
 */
function preprocessLines(lines) {
    return lines
        .map(line => line.trim())
        .filter((line) => !line.startsWith("#"));
}
exports.preprocessLines = preprocessLines;
function indentationOf(line) {
    return getIndentation(line).length;
}
exports.indentationOf = indentationOf;
function blankLine(line) {
    return line.match(/[^\s]/) == undefined;
}
exports.blankLine = blankLine;
function getDefaultIndentation(useSpaces, tabSize) {
    if (!useSpaces) {
        return "\t";
    }
    return " ".repeat(tabSize);
}
exports.getDefaultIndentation = getDefaultIndentation;
//# sourceMappingURL=utilities.js.map