import { appConfigDir } from "@tauri-apps/api/path";
import { exists, BaseDirectory, mkdir, writeFile, readFile } from "@tauri-apps/plugin-fs";


export module SettingsService {

    export interface Settings {
        path: string;
    }
    
    let blankSettings: Settings = {
        path: ""
    };

    async function createDefaultSettings() {
        return {
            path: await appConfigDir() + "/audio"
        } as Settings
    }

    export let Settings: Settings = blankSettings;

    export async function create() {
        await exists('', {baseDir: BaseDirectory.AppConfig}).then(async (dirExists) => {
                if(!dirExists) await mkdir('', {baseDir: BaseDirectory.AppConfig});
              
                await exists("config.json", {baseDir: BaseDirectory.AppConfig}).then(async (fileExists) => {
                    if(!fileExists){
                        let encoder = new TextEncoder();
                        let defaultConfig = await createDefaultSettings();
                        let data = encoder.encode(JSON.stringify(defaultConfig));
                        await writeFile("config.json", data, {baseDir: BaseDirectory.AppConfig});
                        mkdir(defaultConfig.path, {baseDir: BaseDirectory.AppData});
                    }
                });

                readFile("config.json", {baseDir: BaseDirectory.AppConfig}).then((data) => {
                        let decoder = new TextDecoder();
                        Settings = JSON.parse(decoder.decode(data)) as Settings;
                });
                
            });
    }

    export async function refresh() {
        await readFile("config.json", {baseDir: BaseDirectory.AppConfig}).then((data) => {
            let decoder = new TextDecoder();
            Settings = JSON.parse(decoder.decode(data)) as Settings;
        });
    }
}
