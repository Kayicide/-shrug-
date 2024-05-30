import AudioRecorder from "./components/AudioRecorder";
import { createSignal } from 'solid-js';
import { SettingsService } from "./services/SettingsService";


function App() {
  const [path, setPath] = createSignal<string>("");


  SettingsService.create();

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
