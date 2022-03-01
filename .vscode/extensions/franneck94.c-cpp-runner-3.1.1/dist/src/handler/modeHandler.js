"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeHandler = void 0;
const vscode = require("vscode");
const types_1 = require("../utils/types");
async function modeHandler() {
    const combinations = [types_1.Builds.debug, types_1.Builds.release];
    const pickedCombination = await vscode.window.showQuickPick(combinations, {
        placeHolder: 'Select a build mode',
    });
    if (!pickedCombination)
        return undefined;
    const pickedMode = pickedCombination.includes(types_1.Builds.debug)
        ? types_1.Builds.debug
        : types_1.Builds.release;
    return pickedMode;
}
exports.modeHandler = modeHandler;
//# sourceMappingURL=modeHandler.js.map