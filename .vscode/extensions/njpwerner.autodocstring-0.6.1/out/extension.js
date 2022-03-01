"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vs = require("vscode");
const generate_docstring_1 = require("./generate_docstring");
const parse_1 = require("./parse");
const constants_1 = require("./constants");
const telemetry_1 = require("./telemetry");
const logger_1 = require("./logger");
function activate(context) {
    constants_1.extensionRoot.path = context.extensionPath;
    context.subscriptions.push(vs.commands.registerCommand(constants_1.generateDocstringCommand, () => {
        const editor = vs.window.activeTextEditor;
        const autoDocstring = new generate_docstring_1.AutoDocstring(editor);
        try {
            return autoDocstring.generateDocstring();
        }
        catch (error) {
            (0, logger_1.logError)(error + "\n\t" + (0, telemetry_1.getStackTrace)(error));
        }
    }));
    ['python', 'starlark'].map((language) => {
        context.subscriptions.push(vs.languages.registerCompletionItemProvider(language, {
            provideCompletionItems: (document, position, _) => {
                if (validEnterActivation(document, position)) {
                    return [new AutoDocstringCompletionItem(document, position)];
                }
            },
        }, "\"", "'", "#"));
    });
    (0, logger_1.logInfo)("autoDocstring was activated");
}
exports.activate = activate;
/**
 * This method is called when the extension is deactivated
 */
function deactivate() { }
exports.deactivate = deactivate;
/**
 * Checks that the preceding characters of the position is a valid docstring prefix
 * and that the prefix is not part of an already closed docstring
 */
function validEnterActivation(document, position) {
    const docString = document.getText();
    const quoteStyle = getQuoteStyle();
    return ((0, parse_1.validDocstringPrefix)(docString, position.line, position.character, quoteStyle) &&
        !(0, parse_1.docstringIsClosed)(docString, position.line, position.character, quoteStyle));
}
/**
 * Completion item to trigger generate docstring command on docstring prefix
 */
class AutoDocstringCompletionItem extends vs.CompletionItem {
    constructor(_, position) {
        super("Generate Docstring", vs.CompletionItemKind.Snippet);
        this.insertText = "";
        this.filterText = getQuoteStyle();
        this.sortText = "\0";
        this.range = new vs.Range(new vs.Position(position.line, 0), position);
        this.command = {
            command: constants_1.generateDocstringCommand,
            title: "Generate Docstring",
        };
    }
}
function getQuoteStyle() {
    return vs.workspace.getConfiguration(constants_1.extensionID).get("quoteStyle").toString();
}
//# sourceMappingURL=extension.js.map