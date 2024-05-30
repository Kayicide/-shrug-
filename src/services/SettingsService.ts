import { exists, BaseDirectory, mkdir, writeFile, readFile } from "@tauri-apps/plugin-fs";


export module SettingsService {

    export interface Settings {
        path: string;
    }
    
    export const defaultSettings: Settings = {
        path: "",
    }; 

    export let Settings: Settings = defaultSettings;

    export async function create() {
        await exists('', {baseDir: BaseDirectory.AppConfig}).then(async (exists) => {
                if(!exists){
                    await mkdir('', {baseDir: BaseDirectory.AppConfig});
                    let encoder = new TextEncoder();
                    let data = encoder.encode(JSON.stringify(defaultSettings));
                    await writeFile("config.json", data, {baseDir: BaseDirectory.AppConfig});
                }else{
                        readFile("config.json", {baseDir: BaseDirectory.AppConfig}).then((data) => {
                                let decoder = new TextDecoder();
                                Settings = JSON.parse(decoder.decode(data)) as Settings;
                        });
                }
            });
    }

    export async function refresh() {
        await readFile("config.json", {baseDir: BaseDirectory.AppConfig}).then((data) => {
            let decoder = new TextDecoder();
            Settings = JSON.parse(decoder.decode(data)) as Settings;
        });
    }
}
