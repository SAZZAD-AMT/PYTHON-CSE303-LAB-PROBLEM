"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchProvider = void 0;
const path = require("path");
const fileUtils_1 = require("../utils/fileUtils");
const types_1 = require("../utils/types");
const vscodeUtils_1 = require("../utils/vscodeUtils");
const fileProvider_1 = require("./fileProvider");
const settingsProvider_1 = require("./settingsProvider");
const TEMPLATE_FILENAME = 'launch_template.json';
const OUTPUT_FILENAME = 'launch.json';
const CONFIG_NAME = 'C/C++ Runner: Debug Session';
class LaunchProvider extends fileProvider_1.FileProvider {
    constructor(settings, workspaceFolder, activeFolder) {
        super(workspaceFolder, TEMPLATE_FILENAME, OUTPUT_FILENAME);
        this.settings = settings;
        this.workspaceFolder = workspaceFolder;
        this.activeFolder = activeFolder;
        this.buildMode = types_1.Builds.debug;
        if (!this.activeFolder) {
            this.activeFolder = this.workspaceFolder;
        }
        const updateRequired = this.updateCheck();
        if (updateRequired) {
            this.createFileData();
        }
    }
    updateCheck() {
        let doUpdate = false;
        if (!fileUtils_1.pathExists(this._outputPath)) {
            doUpdate = true;
        }
        else {
            const configJson = fileUtils_1.readJsonFile(this._outputPath);
            if (configJson) {
                let foundConfig = false;
                configJson.configurations.forEach((config) => {
                    const triplet = config.name;
                    if (triplet.includes(this.settings.operatingSystem)) {
                        foundConfig = true;
                    }
                });
                if (!foundConfig) {
                    doUpdate = true;
                }
            }
        }
        return doUpdate;
    }
    writeFileData() {
        if (!this.workspaceFolder && !this.activeFolder)
            return;
        if (!this.activeFolder) {
            this.activeFolder = this.workspaceFolder;
        }
        const launchTemplate = fileUtils_1.readJsonFile(this.templatePath);
        if (!launchTemplate)
            return;
        launchTemplate.configurations[0].name = CONFIG_NAME;
        if (this.settings.debugger) {
            launchTemplate.configurations[0].MIMode = this.settings.debugger;
            launchTemplate.configurations[0].miDebuggerPath = this.settings.debuggerPath;
            if (types_1.OperatingSystems.windows === this.settings.operatingSystem &&
                this.settings.isCygwin) {
                launchTemplate.configurations[0].externalConsole = true;
            }
        }
        else {
            launchTemplate.configurations[0].MIMode =
                settingsProvider_1.SettingsProvider.DEFAULT_DEBUGGER_PATH;
            launchTemplate.configurations[0].miDebuggerPath =
                settingsProvider_1.SettingsProvider.DEFAULT_DEBUGGER_PATH;
        }
        launchTemplate.configurations[0].cwd = this.activeFolder;
        const debugPath = path.join(this.activeFolder, `build/${this.buildMode}/out${this.buildMode}`);
        launchTemplate.configurations[0].program = debugPath;
        const launchLocal = fileUtils_1.readJsonFile(this._outputPath);
        if (!launchLocal) {
            fileUtils_1.writeJsonFile(this._outputPath, launchTemplate);
            return;
        }
        let configIdx = vscodeUtils_1.getLaunchConfigIndex(launchLocal, CONFIG_NAME);
        if (configIdx === undefined) {
            configIdx = launchLocal.configurations.length;
        }
        if (launchLocal && launchLocal.configurations.length === configIdx) {
            launchLocal.configurations.push(launchTemplate.configurations[0]);
        }
        else {
            launchLocal.configurations[configIdx] = launchTemplate.configurations[0];
        }
        fileUtils_1.writeJsonFile(this._outputPath, launchLocal);
    }
    updateFolderData(workspaceFolder, activeFolder) {
        this.activeFolder = activeFolder;
        super._updateFolderData(workspaceFolder);
    }
    updateModeData(buildMode) {
        this.buildMode = buildMode;
    }
    changeCallback() {
        const launchLocal = fileUtils_1.readJsonFile(this._outputPath);
        if (!launchLocal)
            return;
        const configIdx = vscodeUtils_1.getLaunchConfigIndex(launchLocal, CONFIG_NAME);
        if (configIdx !== undefined) {
            const currentConfig = launchLocal.configurations[configIdx];
            if (currentConfig.miDebuggerPath !== this.settings.debuggerPath) {
                this.settings.debuggerPath = currentConfig.miDebuggerPath;
                if (currentConfig.miDebuggerPath.includes(types_1.Debuggers.gdb)) {
                    this.settings.setGDB(currentConfig.miDebuggerPath);
                }
                else if (currentConfig.miDebuggerPath.includes(types_1.Debuggers.lldb)) {
                    this.settings.setLLDB(currentConfig.miDebuggerPath);
                }
            }
        }
        else {
            this.writeFileData();
        }
    }
}
exports.LaunchProvider = LaunchProvider;
//# sourceMappingURL=launchProvider.js.map