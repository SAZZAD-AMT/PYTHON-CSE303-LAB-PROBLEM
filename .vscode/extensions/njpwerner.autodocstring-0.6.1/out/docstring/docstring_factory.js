"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocstringFactory = void 0;
const mustache_1 = require("mustache");
const template_data_1 = require("./template_data");
const ts_dedent_1 = require("ts-dedent");
class DocstringFactory {
    constructor(template, quoteStyle = '"""', startOnNewLine = false, includeDescription = true, includeName = false, guessTypes = true) {
        this.quoteStyle = quoteStyle;
        this.startOnNewLine = startOnNewLine;
        this.guessTypes = guessTypes;
        this.includeName = includeName;
        this.includeDescription = includeDescription;
        this.template = template;
    }
    generateDocstring(docstringParts, indentation = "") {
        const templateData = new template_data_1.TemplateData(docstringParts, this.guessTypes, this.includeName, this.includeDescription);
        let docstring = (0, mustache_1.render)(this.template, templateData);
        docstring = this.addSnippetPlaceholders(docstring);
        docstring = this.condenseNewLines(docstring);
        docstring = this.condenseTrailingNewLines(docstring);
        docstring = this.commentText(docstring);
        docstring = this.indentDocstring(docstring, indentation);
        return docstring;
    }
    toString() {
        return (0, ts_dedent_1.dedent) `
        DocstringFactory Configuration
        quoteStyle:
            ${this.quoteStyle}
        startOnNewLine:
            ${this.startOnNewLine}
        guessTypes:
            ${this.guessTypes}
        includeName:
            ${this.includeName}
        includeDescription:
            ${this.includeDescription}
        template:
        ${this.template}
        `;
    }
    addSnippetPlaceholders(snippetString) {
        let placeholderNumber = 0;
        snippetString = snippetString.replace(/@@@/g, () => {
            return (++placeholderNumber).toString();
        });
        return snippetString;
    }
    condenseNewLines(snippet) {
        return snippet.replace(/\n{3,}/gm, "\n\n");
    }
    condenseTrailingNewLines(snippet) {
        return snippet.replace(/\n+$/g, "\n");
    }
    commentText(snippet) {
        if (this.startOnNewLine) {
            snippet = "\n" + snippet;
        }
        return this.quoteStyle + snippet + this.quoteStyle;
    }
    indentDocstring(snippet, indentation) {
        const snippetLines = snippet.split("\n");
        snippetLines.forEach((line, index) => {
            if (line !== "") {
                snippetLines[index] = indentation + line;
            }
        });
        return snippetLines.join("\n");
    }
}
exports.DocstringFactory = DocstringFactory;
//# sourceMappingURL=docstring_factory.js.map