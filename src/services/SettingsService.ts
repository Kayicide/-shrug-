import { appConfigDir } from "@tauri-apps/api/path";
import { exists, BaseDirectory, mkdir, writeFile, readFile } from "@tauri-apps/plugin-fs";
import { LogHelper } from "./LogHelper";

export interface UserSettings {
    path: string;
    startDate: string;
}

class SettingsService {
    private static instance: SettingsService;
    private settings: UserSettings | null = null;
    private settingsLoaded: Promise<void>;

    private constructor() {
        this.settingsLoaded = this.loadSettings();
    }

    static getInstance(): SettingsService {
        if (!SettingsService.instance) {
            SettingsService.instance = new SettingsService();
        }
        return SettingsService.instance;
    }

    async createSettings(): Promise<void> {
        LogHelper.log('Creating user settings file');
        try{
            await exists('', {baseDir: BaseDirectory.AppConfig}).then(async (dirExists) => {
                if(!dirExists) await mkdir('', {baseDir: BaseDirectory.AppConfig});
                
                let date = new Date();
                date.toLocaleDateString();
        
                let defaultConfig = {
                    path: await appConfigDir() + "/audio",
                    startDate: date.toLocaleDateString()
                } as UserSettings;
        
                let encoder = new TextEncoder();
                let data = encoder.encode(JSON.stringify(defaultConfig));
                await writeFile("config.json", data, {baseDir: BaseDirectory.AppConfig});
        
                //make the location for the default location of the audio files, I should do this else where.
                await exists(defaultConfig.path).then(async (audioDirExists) => {
                    if(!audioDirExists) await mkdir(defaultConfig.path, {baseDir: BaseDirectory.AppData});
                });
            });
        }catch (error) {
            LogHelper.error('Error creating config file:', error);
        }
    }

    async loadSettings(): Promise<void> {
        LogHelper.log('Loading user settings file');
        if (this.settings) return;
        try {
            await exists('config.json', {baseDir: BaseDirectory.AppConfig}).then(async (fileExists) => {
                if(!fileExists) {
                    await this.createSettings();
                }

                await readFile("config.json", {baseDir: BaseDirectory.AppConfig}).then((data) => {
                    let decoder = new TextDecoder();
                    this.settings = JSON.parse(decoder.decode(data)) as UserSettings;
                });
            });
        } catch (error) {
            LogHelper.error('Error reading config file:', error);
        }
    }

    async getSettings(): Promise<UserSettings | null> {
        await this.settingsLoaded;
        return this.settings;
    }
}

const settingsService = SettingsService.getInstance();
export default settingsService;