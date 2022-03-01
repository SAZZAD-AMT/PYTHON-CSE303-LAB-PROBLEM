"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validDocstringPrefix = void 0;
/**
 * Checks whether the 3 characters proceeding the position are the correct start
 * to a docstring and that there are no other characters on the line.
 */
function validDocstringPrefix(document, linePosition, charPosition, quoteStyle) {
    const lines = document.split(/\r?\n/);
    const line = lines[linePosition];
    const prefix = line.slice(0, charPosition + 1);
    const regex = RegExp("^[^\\S\\r]*" + quoteStyle + "$");
    return regex.test(line) && regex.test(prefix);
}
exports.validDocstringPrefix = validDocstringPrefix;
//# sourceMappingURL=valid_docstring_prefix.js.map