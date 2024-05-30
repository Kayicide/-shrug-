import AudioRecorder from "./components/AudioRecorder";
import { createSignal } from 'solid-js';

function App() {
  const [path, setPath] = createSignal<string>("");
  return (
    <div class="flex flex-1 flex-col overflow-auto justify-center gap-6 text-center">
        <div class="flex justify-center">
          <div class="flex flex-row items-center align-middle">

          </div>
          <AudioRecorder fileName="TestFile" fileLocation={path()}></AudioRecorder>
        </div>
    </div>
  );
}

export default App;
