"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docstringIsClosed = void 0;
const utilities_1 = require("./utilities");
function docstringIsClosed(document, linePosition, charPosition, quoteStyle) {
    const lines = document.split("\n");
    if (quotesCloseExistingDocstring(lines, linePosition, charPosition, quoteStyle)) {
        return true;
    }
    if (quotesOpenExistingDocstring(lines, linePosition, charPosition, quoteStyle)) {
        return true;
    }
    return false;
}
exports.docstringIsClosed = docstringIsClosed;
function quotesCloseExistingDocstring(lines, linePosition, charPosition, quoteStyle) {
    const linesBeforePosition = sliceUpToPosition(lines, linePosition, charPosition);
    let numberOfTripleQuotes = 0;
    for (const line of linesBeforePosition.reverse()) {
        if (line.includes("def ") || line.includes("class ")) {
            break;
        }
        numberOfTripleQuotes += occurrences(line, quoteStyle);
    }
    return numberOfTripleQuotes % 2 === 0;
}
function quotesOpenExistingDocstring(lines, linePosition, charPosition, quoteStyle) {
    const linesAfterPosition = sliceFromPosition(lines, linePosition, charPosition);
    const originalIndentation = (0, utilities_1.indentationOf)(lines[linePosition]);
    // Need to check first line separately because indentation was sliced off
    if (linesAfterPosition[0].includes(quoteStyle)) {
        return true;
    }
    for (const line of linesAfterPosition.slice(1)) {
        if (line.includes(quoteStyle)) {
            return true;
        }
        if ((!(0, utilities_1.blankLine)(line) && (0, utilities_1.indentationOf)(line) < originalIndentation) ||
            line.includes("def ") ||
            line.includes("class ")) {
            return false;
        }
    }
    return false;
}
function sliceUpToPosition(lines, linePosition, charPosition) {
    const slicedDocument = lines.slice(0, linePosition);
    slicedDocument.push(lines[linePosition].slice(0, charPosition));
    return slicedDocument;
}
function sliceFromPosition(lines, linePosition, charPosition) {
    let slicedDocument = [lines[linePosition].slice(charPosition)];
    slicedDocument = slicedDocument.concat(lines.slice(linePosition + 1));
    return slicedDocument;
}
function occurrences(str, word) {
    return str.split(word).length - 1;
}
//# sourceMappingURL=docstring_is_closed.js.map