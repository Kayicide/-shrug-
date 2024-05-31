import AudioRecorder from "./components/AudioRecorder";
import { createEffect, createSignal } from 'solid-js';
import settingsService from "./services/SettingsService";
import dayService from "./services/DayService";

function App() {
  const [path, setPath] = createSignal<string>("");
  const [day, setDay] = createSignal<number>(0);

  createEffect(async () => {
      await settingsService.loadSettings();
      let settings = await settingsService.getSettings()
      setPath(settings!.path);
  });

  createEffect(async () => {
    let dayNumber = await dayService.getDayNumber();
    console.log('day number:', dayNumber);
    setDay(dayNumber);
  });

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
