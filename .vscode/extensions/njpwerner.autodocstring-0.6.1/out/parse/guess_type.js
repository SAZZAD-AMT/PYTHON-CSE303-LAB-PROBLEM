"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inArray = exports.guessType = void 0;
function guessType(parameter) {
    parameter = parameter.trim();
    if (hasTypeHint(parameter)) {
        return getTypeFromTypeHint(parameter);
    }
    if (isKwarg(parameter)) {
        return guessTypeFromDefaultValue(parameter);
    }
    return guessTypeFromName(parameter);
}
exports.guessType = guessType;
function getTypeFromTypeHint(parameter) {
    const sections = parameter.split(":");
    if (sections.length !== 2) {
        return undefined;
    }
    const typeHint = sections[1];
    const pattern = /\s*(['"]?\w["'\w\[\], |\.]*['"]?)/;
    const typeHintRegex = pattern.exec(typeHint);
    if (typeHintRegex == null) {
        return undefined;
    }
    // Remove enclosing quotes
    let type = typeHintRegex[0].trim();
    type = type.replace(/^['"]|['"]$/g, "");
    return type;
}
function guessTypeFromDefaultValue(parameter) {
    const pattern = /\w+\s*(?::[\w\[\], \.]+)?=\s*(.+)/;
    const defaultValueMatch = pattern.exec(parameter);
    if (defaultValueMatch == null || defaultValueMatch.length !== 2) {
        return undefined;
    }
    const defaultValue = defaultValueMatch[1];
    if (isInteger(defaultValue)) {
        return "int";
    }
    if (isFloat(defaultValue)) {
        return "float";
    }
    if (isHexadecimal(defaultValue)) {
        return "hexadecimal";
    }
    if (isString(defaultValue)) {
        return "str";
    }
    if (isBool(defaultValue)) {
        return "bool";
    }
    if (isList(defaultValue)) {
        return "list";
    }
    if (isTuple(defaultValue)) {
        return "tuple";
    }
    if (isDict(defaultValue)) {
        return "dict";
    }
    if (isRegexp(defaultValue)) {
        return "regexp";
    }
    if (isUnicode(defaultValue)) {
        return "unicode";
    }
    if (isBytes(defaultValue)) {
        return "bytes";
    }
    if (isFunction(defaultValue)) {
        return "function";
    }
    return undefined;
}
function guessTypeFromName(parameter) {
    if (parameter.startsWith("is") || parameter.startsWith("has")) {
        return "bool";
    }
    if (inArray(parameter, ["cb", "callback", "done", "next", "fn"])) {
        return "function";
    }
    return undefined;
}
function hasTypeHint(parameter) {
    const pattern = /^\w+\s*:/;
    return pattern.test(parameter);
}
function isKwarg(parameter) {
    return parameter.includes("=");
}
function isInteger(value) {
    const pattern = /^[-+]?[0-9]+$/;
    return pattern.test(value);
}
function isFloat(value) {
    const pattern = /^[-+]?[0-9]*\.[0-9]+$/;
    return pattern.test(value);
}
function isHexadecimal(value) {
    const pattern = /^[-+]?0x[0-9abcdef]+/;
    return pattern.test(value);
}
function isString(value) {
    const pattern = /^\".*\"$|^\'.*\'$/;
    return pattern.test(value);
}
function isBool(value) {
    const pattern = /^True$|^False$/;
    return pattern.test(value);
}
function isList(value) {
    const pattern = /^\[.*\]$/;
    return pattern.test(value);
}
function isTuple(value) {
    const pattern = /^\(.*\)$/;
    return pattern.test(value);
}
function isDict(value) {
    const pattern = /^\{.*\}$/;
    return pattern.test(value);
}
function isRegexp(value) {
    const pattern = /^[rR]/;
    return pattern.test(value) && isString(value.substr(1));
}
function isUnicode(value) {
    const pattern = /^[uU]/;
    return pattern.test(value) && isString(value.substr(1));
}
function isBytes(value) {
    const pattern = /^[bB]/;
    return pattern.test(value) && isString(value.substr(1));
}
function isFunction(value) {
    const pattern = /^lambda /;
    return pattern.test(value);
}
function inArray(item, array) {
    return array.some((x) => item === x);
}
exports.inArray = inArray;
//# sourceMappingURL=guess_type.js.map