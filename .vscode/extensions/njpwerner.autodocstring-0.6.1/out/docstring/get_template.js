"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomTemplate = exports.getTemplate = void 0;
const fs_1 = require("fs");
function getTemplate(docstringFormat) {
    const fileName = docstringFormat + ".mustache";
    const filePath = __dirname + "/templates/" + fileName;
    // Default to docblockr
    if (!(0, fs_1.existsSync)(filePath)) {
        return (0, fs_1.readFileSync)(__dirname + "/templates/" + "docblockr.mustache", "utf8");
    }
    return (0, fs_1.readFileSync)(filePath, "utf8");
}
exports.getTemplate = getTemplate;
// TODO: handle error case
function getCustomTemplate(templateFilePath) {
    return (0, fs_1.readFileSync)(templateFilePath, "utf8");
}
exports.getCustomTemplate = getCustomTemplate;
//# sourceMappingURL=get_template.js.map