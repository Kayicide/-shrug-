import moment from "moment";
import settingsService, { UserSettings } from "./SettingsService";

export interface Day{
    day: number;
    audio: Blob;
}


class DayService {
    private static instance: DayService;
    private settings: UserSettings | null = settingsService.getSettings();

    private constructor() {}

    static getInstance(): DayService {
        if (!DayService.instance) {
            DayService.instance = new DayService();
        }
        return DayService.instance;
    }

    async getDayNumber(): Promise<number> {
        if(this.settings === null) return 0;

        let date = new Date(moment(this.settings.startDate, "DD-MM-YYYY").toString());
        return moment(new Date()).diff(moment(date), 'days') + 1; 
    }
}

const dayService = DayService.getInstance();
export default dayService;