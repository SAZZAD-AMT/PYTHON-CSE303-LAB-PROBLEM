"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsProvider = void 0;
const path = require("path");
const vscode = require("vscode");
const fileUtils_1 = require("../utils/fileUtils");
const systemUtils_1 = require("../utils/systemUtils");
const types_1 = require("../utils/types");
const vscodeUtils_1 = require("../utils/vscodeUtils");
const fileProvider_1 = require("./fileProvider");
const TEMPLATE_FILENAME = 'settings_template.json';
const OUTPUT_FILENAME = 'settings.json';
const EXTENSION_NAME = 'C_Cpp_Runner';
class SettingsProvider extends fileProvider_1.FileProvider {
    constructor(workspaceFolder, activeFolder) {
        super(workspaceFolder, TEMPLATE_FILENAME, OUTPUT_FILENAME);
        this.workspaceFolder = workspaceFolder;
        this.activeFolder = activeFolder;
        this._configGlobal = vscode.workspace.getConfiguration(EXTENSION_NAME);
        this.operatingSystem = systemUtils_1.getOperatingSystem();
        this.isCygwin = false;
        this._cCompilerFound = false;
        this._cppCompilerFound = false;
        this._makeFound = false;
        this._debuggerFound = false;
        this._commands = new types_1.Commands();
        this.cCompilerPath = SettingsProvider.DEFAULT_C_COMPILER_PATH;
        this.cppCompilerPath = SettingsProvider.DEFAULT_CPP_COMPILER_PATH;
        this.debuggerPath = SettingsProvider.DEFAULT_DEBUGGER_PATH;
        this.makePath = SettingsProvider.DEFAULT_MAKE_PATH;
        this.cStandard = SettingsProvider.DEFAULT_C_STANDARD;
        this.cppStandard = SettingsProvider.DEFAULT_CPP_STANDARD;
        this.compilerArgs = SettingsProvider.DEFAULT_COMPILER_ARGS;
        this.linkerArgs = SettingsProvider.DEFAULT_LINKER_ARGS;
        this.includePaths = SettingsProvider.DEFAULT_INCLUDE_PATHS;
        this.excludeSearch = SettingsProvider.DEFAULT_EXCLUDE_SEARCH;
        this.enableWarnings = SettingsProvider.DEFAULT_ENABLE_WARNINGS;
        this.warningsAsError = SettingsProvider.DEFAULT_WARNINGS_AS_ERRORS;
        this.warnings = SettingsProvider.DEFAULT_WARNINGS;
        const updateRequired = this.updateCheck();
        if (updateRequired && activeFolder) {
            this.createFileData();
        }
        else if (activeFolder) {
            this.getSettings();
            this.getCommandTypes();
            this.getArchitecture();
        }
    }
    updateCheck() {
        let doUpdate = false;
        if (!fileUtils_1.pathExists(this._outputPath)) {
            doUpdate = true;
        }
        else if (!this.commandsStored()) {
            doUpdate = true;
        }
        return doUpdate;
    }
    commandsStored() {
        if (fileUtils_1.pathExists(this._outputPath)) {
            const settingsJson = fileUtils_1.readJsonFile(this._outputPath);
            if (!settingsJson)
                return false;
            if (fileUtils_1.commandCheck(`${EXTENSION_NAME}.cCompilerPath`, settingsJson) &&
                fileUtils_1.commandCheck(`${EXTENSION_NAME}.cppCompilerPath`, settingsJson) &&
                fileUtils_1.commandCheck(`${EXTENSION_NAME}.debuggerPath`, settingsJson) &&
                fileUtils_1.commandCheck(`${EXTENSION_NAME}.makePath`, settingsJson)) {
                return true;
            }
            if (this._cCompilerFound &&
                this._cppCompilerFound &&
                this._makeFound &&
                this._debuggerFound) {
                return true;
            }
        }
        return false;
    }
    writeFileData() {
        this.getSettings();
        if (!this.commandsStored()) {
            this.getCommands();
            this.setCommands();
            this.getCommandTypes();
            this.getArchitecture();
        }
    }
    deleteCallback() {
        const extensionIsActive = vscodeUtils_1.getActivationState();
        if (extensionIsActive)
            this.writeFileData();
    }
    changeCallback() {
        this.getSettings();
    }
    updateFolderData(workspaceFolder) {
        super._updateFolderData(workspaceFolder);
    }
    getSettings() {
        const settingsLocal = fileUtils_1.readJsonFile(this._outputPath);
        this.cCompilerPath = this.getSettingsValue(settingsLocal, 'cCompilerPath', SettingsProvider.DEFAULT_C_COMPILER_PATH);
        this.cppCompilerPath = this.getSettingsValue(settingsLocal, 'cppCompilerPath', SettingsProvider.DEFAULT_CPP_COMPILER_PATH);
        this.debuggerPath = this.getSettingsValue(settingsLocal, 'debuggerPath', SettingsProvider.DEFAULT_DEBUGGER_PATH);
        this.makePath = this.getSettingsValue(settingsLocal, 'makePath', SettingsProvider.DEFAULT_MAKE_PATH);
        this.enableWarnings = this.getSettingsValue(settingsLocal, 'enableWarnings', SettingsProvider.DEFAULT_ENABLE_WARNINGS);
        this.warnings = this.getSettingsValue(settingsLocal, 'warnings', SettingsProvider.DEFAULT_WARNINGS);
        this.warningsAsError = this.getSettingsValue(settingsLocal, 'warningsAsError', SettingsProvider.DEFAULT_WARNINGS_AS_ERRORS);
        this.cStandard = this.getSettingsValue(settingsLocal, 'cStandard', SettingsProvider.DEFAULT_C_STANDARD);
        this.cppStandard = this.getSettingsValue(settingsLocal, 'cppStandard', SettingsProvider.DEFAULT_CPP_STANDARD);
        this.compilerArgs = this.getSettingsValue(settingsLocal, 'compilerArgs', SettingsProvider.DEFAULT_COMPILER_ARGS);
        this.linkerArgs = this.getSettingsValue(settingsLocal, 'linkerArgs', SettingsProvider.DEFAULT_LINKER_ARGS);
        this.includePaths = this.getSettingsValue(settingsLocal, 'includePaths', SettingsProvider.DEFAULT_INCLUDE_PATHS);
        this.excludeSearch = this.getSettingsValue(settingsLocal, 'excludeSearch', SettingsProvider.DEFAULT_EXCLUDE_SEARCH);
    }
    getCommands() {
        this.searchPathVariables();
        this.searchCommands();
    }
    async searchCommands() {
        if (!this._commands.foundGcc) {
            ({
                f: this._commands.foundGcc,
                p: this._commands.pathGcc,
            } = await systemUtils_1.commandExists(types_1.Compilers.gcc));
            if (!this._commands.foundGcc) {
                ({
                    f: this._commands.foundClang,
                    p: this._commands.pathClang,
                } = await systemUtils_1.commandExists(types_1.Compilers.clang));
            }
        }
        if (!this._commands.foundGpp) {
            ({
                f: this._commands.foundGpp,
                p: this._commands.pathGpp,
            } = await systemUtils_1.commandExists(types_1.Compilers.gpp));
            if (!this._commands.foundGpp) {
                ({
                    f: this._commands.foundClangpp,
                    p: this._commands.pathClangpp,
                } = await systemUtils_1.commandExists(types_1.Compilers.clangpp));
            }
        }
        if (!this._commands.foundGDB) {
            ({
                f: this._commands.foundGDB,
                p: this._commands.pathGDB,
            } = await systemUtils_1.commandExists(types_1.Debuggers.gdb));
            if (!this._commands.foundGDB) {
                ({
                    f: this._commands.foundLLDB,
                    p: this._commands.pathLLDB,
                } = await systemUtils_1.commandExists(types_1.Debuggers.lldb));
            }
        }
        if (!this._commands.foundMake) {
            ({
                f: this._commands.foundMake,
                p: this._commands.pathMake,
            } = await systemUtils_1.commandExists(types_1.Makefiles.make));
            if (!this._commands.foundMake &&
                this.operatingSystem === types_1.OperatingSystems.windows) {
                ({
                    f: this._commands.foundMake,
                    p: this._commands.pathMake,
                } = await systemUtils_1.commandExists(types_1.Makefiles.make_mingw));
            }
        }
    }
    searchPathVariables() {
        this._commands = new types_1.Commands();
        const env = process.env;
        if (env['PATH']) {
            let paths = [];
            if (this.operatingSystem === types_1.OperatingSystems.windows) {
                paths = env['PATH'].split(';');
            }
            else {
                paths = env['PATH'].split(':');
            }
            for (const envPath of paths) {
                if ((this._commands.foundGcc &&
                    this._commands.foundGpp &&
                    this._commands.foundGDB) ||
                    (this._commands.foundClang &&
                        this._commands.foundClangpp &&
                        this._commands.foundLLDB)) {
                    break;
                }
                if (this.operatingSystem === types_1.OperatingSystems.windows) {
                    if (this.skipCheckWindows(envPath))
                        continue;
                }
                else if (this.operatingSystem === types_1.OperatingSystems.linux) {
                    if (this.skipCheckLinux(envPath))
                        continue;
                }
                else if (this.operatingSystem === types_1.OperatingSystems.mac) {
                    if (this.skipCheckMac(envPath))
                        continue;
                }
                if (this.operatingSystem === types_1.OperatingSystems.windows) {
                    this.searchPathVariablesWindows(envPath);
                }
                else if (this.operatingSystem === types_1.OperatingSystems.linux) {
                    this.searchPathVariablesLinux(envPath);
                }
                else if (this.operatingSystem === types_1.OperatingSystems.mac) {
                    this.searchPathVariablesMac(envPath);
                }
            }
        }
    }
    skipCheckWindows(envPath) {
        if (!envPath.toLowerCase().includes('bin') &&
            !envPath.toLowerCase().includes('mingw') &&
            !envPath.toLowerCase().includes('msys') &&
            !envPath.toLowerCase().includes('cygwin')) {
            return true;
        }
        return false;
    }
    skipCheckLinux(envPath) {
        if (!envPath.toLowerCase().startsWith('/bin') &&
            !envPath.toLowerCase().startsWith('/usr/bin')) {
            return true;
        }
        return false;
    }
    skipCheckMac(envPath) {
        if (!envPath.toLowerCase().includes('bin')) {
            return true;
        }
        return false;
    }
    searchPathVariablesWindows(envPath) {
        const lower_path = envPath.toLocaleLowerCase();
        if (lower_path.includes(types_1.CompilerSystems.cygwin) ||
            lower_path.includes(types_1.CompilerSystems.mingw) ||
            lower_path.includes(types_1.CompilerSystems.msys2)) {
            this._commands.pathGcc = path.join(envPath, types_1.Compilers.gcc + '.exe');
            this._commands.pathGpp = path.join(envPath, types_1.Compilers.gpp + '.exe');
            this._commands.pathGDB = path.join(envPath, types_1.Debuggers.gdb + '.exe');
            this._commands.pathMake = path.join(envPath, types_1.Makefiles.make + '.exe');
            if (fileUtils_1.pathExists(this._commands.pathGcc)) {
                this._commands.foundGcc = true;
            }
            if (fileUtils_1.pathExists(this._commands.pathGpp)) {
                this._commands.foundGpp = true;
            }
            if (fileUtils_1.pathExists(this._commands.pathGDB)) {
                this._commands.foundGDB = true;
            }
            if (fileUtils_1.pathExists(this._commands.pathMake)) {
                this._commands.foundMake = true;
            }
            else {
                const altPathMake = path.join(envPath, types_1.Makefiles.make_mingw + '.exe');
                if (fileUtils_1.pathExists(altPathMake)) {
                    this._commands.foundMake = true;
                }
            }
        }
    }
    searchPathVariablesLinux(envPath) {
        this._commands.pathGcc = path.join(envPath, types_1.Compilers.gcc);
        this._commands.pathGpp = path.join(envPath, types_1.Compilers.gpp);
        this._commands.pathGDB = path.join(envPath, types_1.Debuggers.gdb);
        this._commands.pathMake = path.join(envPath, types_1.Makefiles.make);
        if (fileUtils_1.pathExists(this._commands.pathGcc)) {
            this._commands.foundGcc = true;
        }
        if (fileUtils_1.pathExists(this._commands.pathGpp)) {
            this._commands.foundGpp = true;
        }
        if (fileUtils_1.pathExists(this._commands.pathGDB)) {
            this._commands.foundGDB = true;
        }
        if (fileUtils_1.pathExists(this._commands.pathMake)) {
            this._commands.foundMake = true;
        }
    }
    searchPathVariablesMac(envPath) {
        this._commands.pathClang = path.join(envPath, types_1.Compilers.clang);
        this._commands.pathClangpp = path.join(envPath, types_1.Compilers.clangpp);
        this._commands.pathLLDB = path.join(envPath, types_1.Debuggers.lldb);
        this._commands.pathMake = path.join(envPath, types_1.Makefiles.make);
        if (fileUtils_1.pathExists(this._commands.pathClang)) {
            this._commands.foundClang = true;
        }
        if (fileUtils_1.pathExists(this._commands.pathClangpp)) {
            this._commands.foundClangpp = true;
        }
        if (fileUtils_1.pathExists(this._commands.pathLLDB)) {
            this._commands.foundLLDB = true;
        }
        if (fileUtils_1.pathExists(this._commands.pathMake)) {
            this._commands.foundMake = true;
        }
    }
    setCommands() {
        if (this._commands.foundGcc && this._commands.pathGcc) {
            this.setGcc(this._commands.pathGcc);
        }
        else if (this._commands.foundClang && this._commands.pathClang) {
            this.setClang(this._commands.pathClang);
        }
        else {
            this.cCompiler = undefined;
        }
        if (this._commands.foundGpp && this._commands.pathGpp) {
            this.setGpp(this._commands.pathGpp);
        }
        else if (this._commands.foundClangpp && this._commands.pathClangpp) {
            this.setClangpp(this._commands.pathClangpp);
        }
        else {
            this.cppCompiler = undefined;
        }
        if (this._commands.foundGDB && this._commands.pathGDB) {
            this.setGDB(this._commands.pathGDB);
        }
        else if (this._commands.foundLLDB && this._commands.pathLLDB) {
            this.setLLDB(this._commands.pathLLDB);
        }
        else {
            this.debugger = undefined;
        }
        if (this._commands.foundMake && this._commands.pathMake) {
            this.setMake(this._commands.pathMake);
        }
        else {
            this._makeFound = false;
        }
        this.setOtherSettings();
    }
    getCommandTypes() {
        let cBasename = this.cCompilerPath;
        let cppBasename = this.cppCompilerPath;
        cBasename = fileUtils_1.getBasename(cBasename);
        cBasename = fileUtils_1.removeExtension(cBasename, 'exe');
        cppBasename = fileUtils_1.getBasename(cppBasename);
        cppBasename = fileUtils_1.removeExtension(cppBasename, 'exe');
        if (cBasename) {
            if (cBasename.includes(types_1.Compilers.clang)) {
                this.cCompiler = types_1.Compilers.clang;
                this.debugger = types_1.Debuggers.lldb;
            }
            else {
                this.cCompiler = types_1.Compilers.gcc;
                this.debugger = types_1.Debuggers.gdb;
            }
        }
        if (cppBasename) {
            if (cppBasename.includes(types_1.Compilers.clangpp)) {
                this.cppCompiler = types_1.Compilers.clangpp;
                this.debugger = types_1.Debuggers.lldb;
            }
            else {
                this.cppCompiler = types_1.Compilers.gpp;
                this.debugger = types_1.Debuggers.gdb;
            }
        }
    }
    getArchitecture() {
        if (this.cCompiler) {
            const ret = systemUtils_1.getCompilerArchitecture(this.cCompiler);
            this.architecure = ret.architecure;
            this.isCygwin = ret.isCygwin;
        }
        else if (this.cppCompiler) {
            const ret = systemUtils_1.getCompilerArchitecture(this.cppCompiler);
            this.architecure = ret.architecure;
            this.isCygwin = ret.isCygwin;
        }
        else {
            this.architecure = types_1.Architectures.x64;
            this.isCygwin = false;
        }
    }
    reset() {
        this.cCompilerPath = SettingsProvider.DEFAULT_C_COMPILER_PATH;
        this.cppCompilerPath = SettingsProvider.DEFAULT_CPP_COMPILER_PATH;
        this.debuggerPath = SettingsProvider.DEFAULT_DEBUGGER_PATH;
        this.makePath = SettingsProvider.DEFAULT_MAKE_PATH;
        this.enableWarnings = SettingsProvider.DEFAULT_ENABLE_WARNINGS;
        this.warnings = SettingsProvider.DEFAULT_WARNINGS;
        this.warningsAsError = SettingsProvider.DEFAULT_WARNINGS_AS_ERRORS;
        this.cStandard = SettingsProvider.DEFAULT_C_STANDARD;
        this.cppStandard = SettingsProvider.DEFAULT_CPP_STANDARD;
        this.compilerArgs = SettingsProvider.DEFAULT_COMPILER_ARGS;
        this.linkerArgs = SettingsProvider.DEFAULT_LINKER_ARGS;
        this.includePaths = SettingsProvider.DEFAULT_INCLUDE_PATHS;
        this.excludeSearch = SettingsProvider.DEFAULT_EXCLUDE_SEARCH;
        this.setGcc(this.cCompilerPath);
        this.setGpp(this.cppCompilerPath);
        this.setGDB(this.debuggerPath);
        this.setMake(this.makePath);
        this.setOtherSettings();
    }
    getSettingsValue(settingsLocal, name, defaultValue) {
        const settingName = `${EXTENSION_NAME}.${name}`;
        if (settingsLocal && settingsLocal[settingName] !== undefined) {
            return settingsLocal[settingName];
        }
        if (this._configGlobal.has(name)) {
            return this._configGlobal.get(name, defaultValue);
        }
        return defaultValue;
    }
    update(key, value) {
        let settingsJson = fileUtils_1.readJsonFile(this._outputPath);
        if (!settingsJson) {
            settingsJson = {};
        }
        const settingName = `${EXTENSION_NAME}.${key}`;
        settingsJson[settingName] = value;
        fileUtils_1.writeJsonFile(this._outputPath, settingsJson);
    }
    setGcc(pathGcc) {
        this.update('cCompilerPath', pathGcc);
        this.cCompiler = types_1.Compilers.gcc;
        this._cCompilerFound = true;
    }
    setClang(pathClang) {
        this.update('cCompilerPath', pathClang);
        this.cCompiler = types_1.Compilers.clang;
        this._cCompilerFound = true;
    }
    setGpp(pathGpp) {
        this.update('cppCompilerPath', pathGpp);
        this.cppCompiler = types_1.Compilers.gpp;
        this._cppCompilerFound = true;
    }
    setClangpp(pathClangpp) {
        this.update('cppCompilerPath', pathClangpp);
        this.cppCompiler = types_1.Compilers.clangpp;
        this._cppCompilerFound = true;
    }
    setLLDB(pathLLDB) {
        this.update('debuggerPath', pathLLDB);
        this.debugger = types_1.Debuggers.lldb;
        this._debuggerFound = true;
    }
    setGDB(pathGDB) {
        this.update('debuggerPath', pathGDB);
        this.debugger = types_1.Debuggers.gdb;
        this._debuggerFound = true;
    }
    setMake(pathMake) {
        this.update('makePath', pathMake);
        this._makeFound = true;
    }
    setOtherSettings() {
        this.update('warnings', this.warnings);
        this.update('compilerArgs', this.compilerArgs);
        this.update('includePaths', this.includePaths);
        this.update('linkerArgs', this.linkerArgs);
        this.update('cStandard', this.cStandard);
        this.update('cppStandard', this.cppStandard);
        this.update('excludeSearch', this.excludeSearch);
        this.update('enableWarnings', this.enableWarnings);
        this.update('warningsAsError', this.warningsAsError);
    }
}
exports.SettingsProvider = SettingsProvider;
SettingsProvider.DEFAULT_C_COMPILER_PATH = 'gcc';
SettingsProvider.DEFAULT_CPP_COMPILER_PATH = 'g++';
SettingsProvider.DEFAULT_DEBUGGER_PATH = 'gdb';
SettingsProvider.DEFAULT_MAKE_PATH = 'make';
SettingsProvider.DEFAULT_C_STANDARD = '';
SettingsProvider.DEFAULT_CPP_STANDARD = '';
SettingsProvider.DEFAULT_EXCLUDE_SEARCH = [];
SettingsProvider.DEFAULT_ENABLE_WARNINGS = true;
SettingsProvider.DEFAULT_WARNINGS_AS_ERRORS = false;
SettingsProvider.DEFAULT_WARNINGS = ['-Wall', '-Wextra', '-Wpedantic'];
SettingsProvider.DEFAULT_COMPILER_ARGS = [];
SettingsProvider.DEFAULT_LINKER_ARGS = [];
SettingsProvider.DEFAULT_INCLUDE_PATHS = [];
//# sourceMappingURL=settingsProvider.js.map