"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inArray = exports.parseParameters = void 0;
const _1 = require(".");
function parseParameters(parameterTokens, body, functionName) {
    return {
        name: functionName,
        decorators: parseDecorators(parameterTokens),
        args: parseArguments(parameterTokens),
        kwargs: parseKeywordArguments(parameterTokens),
        returns: parseReturn(parameterTokens, body),
        yields: parseYields(parameterTokens, body),
        exceptions: parseExceptions(body),
    };
}
exports.parseParameters = parseParameters;
function parseDecorators(parameters) {
    const decorators = [];
    const pattern = /^@(\w+)/;
    for (const param of parameters) {
        const match = param.trim().match(pattern);
        if (match == null) {
            continue;
        }
        decorators.push({
            name: match[1],
        });
    }
    return decorators;
}
function parseArguments(parameters) {
    const args = [];
    const excludedArgs = ["self", "cls"];
    const pattern = /^(\w+)/;
    for (const param of parameters) {
        const match = param.trim().match(pattern);
        if (match == null || param.includes("=") || inArray(param, excludedArgs)) {
            continue;
        }
        args.push({
            var: match[1],
            type: (0, _1.guessType)(param),
        });
    }
    return args;
}
function parseKeywordArguments(parameters) {
    const kwargs = [];
    const pattern = /^(\w+)(?:\s*:[^=]+)?\s*=\s*(.+)/;
    for (const param of parameters) {
        const match = param.trim().match(pattern);
        if (match == null) {
            continue;
        }
        kwargs.push({
            var: match[1],
            default: match[2],
            type: (0, _1.guessType)(param),
        });
    }
    return kwargs;
}
function parseReturn(parameters, body) {
    const returnType = parseReturnFromDefinition(parameters);
    if (returnType == null || isIterator(returnType.type)) {
        return parseFromBody(body, /return /);
    }
    return returnType;
}
function parseYields(parameters, body) {
    const returnType = parseReturnFromDefinition(parameters);
    if (returnType != null && isIterator(returnType.type)) {
        return returnType;
    }
    // To account for functions that yield but don't have a yield signature
    const yieldType = returnType ? returnType.type : undefined;
    const yieldInBody = parseFromBody(body, /yield /);
    if (yieldInBody != null && yieldType != undefined) {
        yieldInBody.type = `Iterator[${yieldType}]`;
    }
    return yieldInBody;
}
function parseReturnFromDefinition(parameters) {
    const pattern = /^->\s*(["']?)(['"\w\[\], |\.]*)\1/;
    for (const param of parameters) {
        const match = param.trim().match(pattern);
        if (match == null) {
            continue;
        }
        // Skip "-> None" annotations
        return match[2] === "None" ? null : { type: match[2] };
    }
    return null;
}
function parseExceptions(body) {
    const exceptions = [];
    const pattern = /(?<!#.*)raise\s+([\w.]+)/;
    for (const line of body) {
        const match = line.match(pattern);
        if (match == null) {
            continue;
        }
        exceptions.push({ type: match[1] });
    }
    return exceptions;
}
function inArray(item, array) {
    return array.some((x) => item === x);
}
exports.inArray = inArray;
function parseFromBody(body, pattern) {
    for (const line of body) {
        const match = line.match(pattern);
        if (match == null) {
            continue;
        }
        return { type: undefined };
    }
    return undefined;
}
/**
 * Check whether the annotated type is an iterator.
 * @param type The annotated type
 */
function isIterator(type) {
    return type.startsWith("Generator") || type.startsWith("Iterator");
}
//# sourceMappingURL=parse_parameters.js.map