"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFunctionName = void 0;
function getFunctionName(functionDefinition) {
    const pattern = /(?:def|class)\s+(\w+)\s*\(/;
    const match = pattern.exec(functionDefinition);
    if (match == undefined || match[1] == undefined) {
        return "";
    }
    return match[1];
}
exports.getFunctionName = getFunctionName;
//# sourceMappingURL=get_function_name.js.map