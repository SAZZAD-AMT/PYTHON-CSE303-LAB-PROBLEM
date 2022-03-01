"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesProvider = void 0;
const fileUtils_1 = require("../utils/fileUtils");
const types_1 = require("../utils/types");
const fileProvider_1 = require("./fileProvider");
const TEMPLATE_FILENAME = 'properties_template.json';
const OUTPUT_FILENAME = 'c_cpp_properties.json';
const INCLUDE_PATTERN = '${workspaceFolder}/**';
class PropertiesProvider extends fileProvider_1.FileProvider {
    constructor(settings, workspaceFolder, activeFolder) {
        super(workspaceFolder, TEMPLATE_FILENAME, OUTPUT_FILENAME);
        this.settings = settings;
        this.workspaceFolder = workspaceFolder;
        this.activeFolder = activeFolder;
        const updateRequired = this.updateCheck();
        if (updateRequired && activeFolder) {
            this.createFileData();
        }
    }
    updateCheck() {
        let doUpdate = false;
        if (!fileUtils_1.pathExists(this._outputPath)) {
            doUpdate = true;
        }
        else {
            const configLocal = fileUtils_1.readJsonFile(this._outputPath);
            if (configLocal) {
                const triplet = configLocal.configurations[0].name;
                if (!triplet.includes(this.settings.operatingSystem)) {
                    doUpdate = true;
                }
            }
        }
        return doUpdate;
    }
    writeFileData() {
        let configLocal;
        if (!fileUtils_1.pathExists(this._outputPath)) {
            configLocal = fileUtils_1.readJsonFile(this.templatePath);
        }
        else {
            configLocal = fileUtils_1.readJsonFile(this._outputPath);
        }
        if (!configLocal)
            return;
        const triplet = `${this.settings.operatingSystem}-` +
            `${this.settings.cCompiler}-` +
            `${this.settings.architecure}`;
        const currentConfig = configLocal.configurations[0];
        currentConfig.compilerArgs = [];
        if (this.settings.warnings) {
            for (const warning of this.settings.warnings) {
                const compilerArgsSet = new Set(currentConfig.compilerArgs);
                if (!compilerArgsSet.has(warning)) {
                    currentConfig.compilerArgs.push(warning);
                }
            }
        }
        if (this.settings.compilerArgs) {
            for (const arg of this.settings.compilerArgs) {
                const compilerArgsSet = new Set(currentConfig.compilerArgs);
                if (!compilerArgsSet.has(arg)) {
                    currentConfig.compilerArgs.push(arg);
                }
            }
        }
        if (this.settings.includePaths) {
            currentConfig.includePath = [INCLUDE_PATTERN];
            for (const path of this.settings.includePaths) {
                const includePathSet = new Set(currentConfig.includePath);
                if (path !== INCLUDE_PATTERN && !includePathSet.has(path)) {
                    currentConfig.includePath.push(path);
                }
            }
        }
        else {
            currentConfig.includePath = [INCLUDE_PATTERN];
        }
        if (this.settings.cStandard) {
            currentConfig.cStandard = this.settings.cStandard;
        }
        else {
            currentConfig.cStandard = '${default}';
        }
        if (this.settings.cppStandard) {
            currentConfig.cppStandard = this.settings.cppStandard;
        }
        else {
            currentConfig.cppStandard = '${default}';
        }
        currentConfig.compilerPath = this.settings.cCompilerPath;
        if (this.settings.isCygwin &&
            this.settings.operatingSystem === types_1.OperatingSystems.windows) {
            currentConfig.name = triplet.replace('windows', 'windows-cygwin');
            currentConfig.intelliSenseMode = triplet.replace('windows', 'linux');
        }
        else {
            currentConfig.name = triplet;
            currentConfig.intelliSenseMode = triplet;
        }
        fileUtils_1.writeJsonFile(this._outputPath, configLocal);
    }
    updateFolderData(workspaceFolder) {
        super._updateFolderData(workspaceFolder);
    }
    changeCallback() {
        const configLocal = fileUtils_1.readJsonFile(this._outputPath);
        if (!configLocal)
            return;
        const currentConfig = configLocal.configurations[0];
        if (currentConfig.compilerPath !== this.settings.cCompilerPath &&
            currentConfig.compilerPath !== this.settings.cppCompilerPath) {
            let compilerName = currentConfig.compilerPath;
            this.settings.cCompilerPath = currentConfig.compilerPath;
            compilerName = fileUtils_1.getBasename(compilerName);
            compilerName = fileUtils_1.removeExtension(compilerName, 'exe');
            if (compilerName.includes(types_1.Compilers.clang)) {
                this.settings.setClang(currentConfig.compilerPath);
            }
            else if (compilerName.includes(types_1.Compilers.clangpp)) {
                this.settings.setClangpp(currentConfig.compilerPath);
            }
            else if (compilerName.includes(types_1.Compilers.gcc)) {
                this.settings.setGcc(currentConfig.compilerPath);
            }
            else if (compilerName.includes(types_1.Compilers.gpp)) {
                this.settings.setGpp(currentConfig.compilerPath);
            }
        }
        if (currentConfig.cStandard !== '${default}' &&
            currentConfig.cStandard !== this.settings.cStandard) {
            this.settings.cStandard = currentConfig.cStandard;
            this.settings.update('cStandard', currentConfig.cStandard);
        }
        if (currentConfig.cppStandard !== '${default}' &&
            currentConfig.cppStandard !== this.settings.cppStandard) {
            this.settings.cppStandard = currentConfig.cppStandard;
            this.settings.update('cppStandard', currentConfig.cppStandard);
        }
        const argsSet = new Set(currentConfig.compilerArgs);
        const args = [...argsSet];
        const warningArgs = args.filter((arg) => arg.includes('-W'));
        const compilerArgs = args.filter((arg) => !arg.includes('-W'));
        const includeArgs = currentConfig.includePath.filter((path) => path !== INCLUDE_PATTERN);
        this.settings.warnings = warningArgs;
        this.settings.compilerArgs = compilerArgs;
        this.settings.includePaths = includeArgs;
        this.settings.setOtherSettings();
    }
}
exports.PropertiesProvider = PropertiesProvider;
//# sourceMappingURL=propertiesProvider.js.map