"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateData = void 0;
class TemplateData {
    constructor(docstringParts, guessTypes, includeName, includeExtendedSummary) {
        this.name = docstringParts.name;
        this.decorators = docstringParts.decorators;
        this.args = docstringParts.args;
        this.kwargs = docstringParts.kwargs;
        this.exceptions = docstringParts.exceptions;
        this.returns = docstringParts.returns;
        this.yields = docstringParts.yields;
        this.includeName = includeName;
        this.includeExtendedSummary = includeExtendedSummary;
        if (!guessTypes) {
            this.removeTypes();
        }
        this.addDefaultTypePlaceholders("_type_");
    }
    placeholder() {
        return (text, render) => {
            return "${@@@:" + render(text) + "}";
        };
    }
    summaryPlaceholder() {
        if (this.includeName) {
            return this.name + " ${@@@:_summary_}";
        }
        return "${@@@:_summary_}";
    }
    extendedSummaryPlaceholder() {
        if (this.includeExtendedSummary) {
            return "${@@@:_extended_summary_}";
        }
        return "";
    }
    typePlaceholder() {
        // @ts-ignore
        return "${@@@:" + this.type + "}";
    }
    descriptionPlaceholder() {
        return "${@@@:_description_}";
    }
    argsExist() {
        return this.args.length > 0;
    }
    kwargsExist() {
        return this.kwargs.length > 0;
    }
    parametersExist() {
        return this.args.length > 0 || this.kwargs.length > 0;
    }
    exceptionsExist() {
        return this.exceptions.length > 0;
    }
    returnsExist() {
        return this.returns !== undefined;
    }
    yieldsExist() {
        return this.yields != undefined;
    }
    removeTypes() {
        for (const arg of this.args) {
            arg.type = undefined;
        }
        for (const kwarg of this.kwargs) {
            kwarg.type = undefined;
        }
        if (this.yieldsExist()) {
            this.yields.type = undefined;
        }
        if (this.returnsExist()) {
            this.returns.type = undefined;
        }
    }
    addDefaultTypePlaceholders(placeholder) {
        for (const arg of this.args) {
            if (arg.type === undefined) {
                arg.type = placeholder;
            }
        }
        for (const kwarg of this.kwargs) {
            if (kwarg.type === undefined) {
                kwarg.type = placeholder;
            }
        }
        const returns = this.returns;
        if (returns !== undefined && returns.type === undefined) {
            returns.type = placeholder;
        }
        const yields = this.yields;
        if (yields != undefined && yields.type == undefined) {
            yields.type = placeholder;
        }
    }
}
exports.TemplateData = TemplateData;
//# sourceMappingURL=template_data.js.map