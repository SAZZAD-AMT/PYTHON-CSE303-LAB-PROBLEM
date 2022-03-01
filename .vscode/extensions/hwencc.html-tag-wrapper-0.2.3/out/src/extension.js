'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let disposable = vscode_1.commands.registerCommand('extension.wrapTag', () => {
        const editor = vscode_1.window.activeTextEditor;
        // if (!editor || !(editor.document.languageId === 'html')) return;
        if (!editor)
            return;
        let selection = editor.selection;
        let selectedText = editor.document.getText(selection);
        let wrapper = new TagWrapper(selectedText, selection);
        if (wrapper.isAvaliableTag) {
            editor.insertSnippet(wrapper.snippet); //insert snippet to replace the selection text
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
class TagWrapper {
    constructor(selectedText, selection) {
        this.replacementTag = 'div';
        this.selectedText = this.formatSelectedText(selectedText, selection);
    }
    get snippet() {
        return this.generateSnippet();
    }
    get isAvaliableTag() {
        return /\<(.|\n)*\>/g.test(this.selectedText);
    }
    generateSnippet() {
        let sn = new vscode_1.SnippetString();
        sn.appendText('<');
        // sn.appendTabstop(1)
        sn.appendPlaceholder(`${this.replacementTag}`, 1);
        sn.appendText(`>\n${this.selectedText}</`);
        sn.appendPlaceholder(`${this.replacementTag}`, 1);
        sn.appendText('>');
        return sn;
    }
    //format multi line selected text
    formatSelectedText(selectedText, selection) {
        let start = selection.start.character;
        let textArr;
        let endLine;
        if (selectedText.indexOf('\n') > -1) {
            textArr = selectedText.split('\n');
            endLine = '\n';
        }
        else {
            textArr = selectedText.split('\r');
            endLine = '\r';
        }
        let formated = '';
        textArr.forEach((line, index) => {
            formated += index === 0 ? `\t${line}${endLine}` : `\t${line.substr(start)}${endLine}`;
        });
        return formated;
    }
    ;
    dispose() {
        // do nothing
    }
}
//# sourceMappingURL=extension.js.map