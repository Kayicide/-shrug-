import moment from "moment";
import settingsService, { UserSettings } from "./SettingsService";

export interface Day{
    day: number;
    audio: Blob;
}


class DayService {
    private static instance: DayService;
    private settings: UserSettings | null = null;
    private settingsLoaded: Promise<void>;

    private constructor() {
        this.settingsLoaded = this.initializeSettings();
    }

    private async initializeSettings() {
        this.settings = await settingsService.getSettings();
    }

    private async ensureSettingsInitialized(): Promise<void> {
        if (!this.settings) {
            await this.settingsLoaded;
        }
    }

    static getInstance(): DayService {
        if (!DayService.instance) {
            DayService.instance = new DayService();
        }
        return DayService.instance;
    }

    async getDayNumber(): Promise<number> {
        await this.ensureSettingsInitialized();

        let date = new Date(moment(this.settings!.startDate, "DD-MM-YYYY").toString());
        return moment(new Date()).diff(moment(date), 'days') + 1; 
    }
}

const dayService = DayService.getInstance();
export default dayService;