import AudioRecorder from "./components/AudioRecorder";
import { createEffect, createSignal } from 'solid-js';
import settingsService, { UserSettings } from "./services/SettingsService";


function App() {
  const [path, setPath] = createSignal<string>("");
  const [day, setDay] = createSignal<string>("");
  const [settings, setSettings] = createSignal<UserSettings | null>();

  createEffect(async () => {
      await settingsService.loadSettings();
      setSettings(settingsService.getSettings());

      console.dir(settings());
  });



  // let diff = (today.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;
  // console.log(diff);
  return (
    <div class="flex flex-1 flex-col overflow-auto justify-center gap-6 text-center">
        <div class="flex flex-1 justify-center">
          <div class="flex flex-row items-center align-middle">
              <AudioRecorder fileName="TestFile" fileLocation={path()}></AudioRecorder>
          </div>
        </div>
    </div>
  );
}

export default App;
