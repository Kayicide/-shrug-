import AudioRecorder from "./components/AudioRecorder";
import { createEffect, createSignal } from 'solid-js';
import settingsService, { UserSettings } from "./services/SettingsService";
import moment from "moment";


function App() {
  const [path, setPath] = createSignal<string>("");
  const [day, setDay] = createSignal<number>(0);
  const [settings, setSettings] = createSignal<UserSettings | null>();

  createEffect(async () => {
      await settingsService.loadSettings();
      setSettings(settingsService.getSettings());

      console.dir(settings());
      let settingsLol = settings();
      if(settingsLol != null) {
          setPath(settingsLol.path);
          let date = new Date(moment(settingsLol.startDate, "DD-MM-YYYY").toString());
          let day = moment(new Date()).diff(moment(date), 'days') + 1; 
          console.log(day);
          setDay(day);
      }
  });



  // let diff = (today.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;
  // console.log(diff);
  return (
    <div class="flex flex-1 flex-col overflow-auto justify-center gap-6 text-center">
        <div class="flex flex-1 justify-center">
          <div class="flex flex-row items-center align-middle">
              <AudioRecorder day={day()} fileName="TestFile" fileLocation={path()}></AudioRecorder>
          </div>
        </div>
    </div>
  );
}

export default App;
