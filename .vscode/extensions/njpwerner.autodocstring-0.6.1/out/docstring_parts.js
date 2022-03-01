"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docstringPartsToString = void 0;
const ts_dedent_1 = require("ts-dedent");
function docstringPartsToString(docstringParts) {
    var _a, _b, _c, _d;
    const decoratorsText = docstringParts.decorators.length
        ? docstringParts.decorators.map((decorator) => `${decorator.name}`).join("\n")
        : "N/A";
    const argsText = docstringParts.args.length
        ? docstringParts.args.map((argument) => `${argument.var} ${argument.type}`).join("\n")
        : "N/A";
    const kwargsText = docstringParts.kwargs.length
        ? docstringParts.kwargs.map((arg) => `${arg.var} ${arg.type} ${arg.default}`).join("\n")
        : "N/A";
    const exceptionsText = docstringParts.exceptions.length
        ? docstringParts.exceptions.map((exception) => `${exception.type}`).join("\n")
        : "N/A";
    const returnsText = `${(_b = (_a = docstringParts.returns) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : "N/A"}`;
    const yieldsText = `${(_d = (_c = docstringParts.yields) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : "N/A"}`;
    return (0, ts_dedent_1.default) `
    Docstring parts:
        Name:
            ${docstringParts.name}
        Decorators:
            ${decoratorsText}
        Args:
            ${argsText}
        Kwargs:
            ${kwargsText}
        Exceptions:
            ${exceptionsText}
        Returns:
            ${returnsText}
        Yields:
            ${yieldsText}
    `;
}
exports.docstringPartsToString = docstringPartsToString;
//# sourceMappingURL=docstring_parts.js.map