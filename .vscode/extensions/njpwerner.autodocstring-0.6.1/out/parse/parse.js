"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const _1 = require(".");
function parse(document, positionLine) {
    const definition = (0, _1.getDefinition)(document, positionLine);
    const body = (0, _1.getBody)(document, positionLine);
    const parameterTokens = (0, _1.tokenizeDefinition)(definition);
    const functionName = (0, _1.getFunctionName)(definition);
    const docstringParts = (0, _1.parseParameters)(parameterTokens, body, functionName);
    return docstringParts;
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map