import { Show, createResource, createSignal } from 'solid-js';


export default function AudioRecorder(props: {day: number, fileName: string, fileLocation: string}){
    const mimeType: string = "audio/webm";
    const [stream, setStream] = createSignal<MediaStream>();
    const [recording, setRecording] = createSignal(false);
    const [audioChunks, setAudioChunks] = createSignal<Blob[]>([]);
    const [audioUrl, setAudioUrl] = createSignal<string>("");
    const mediaRecorder = {
      current: null as MediaRecorder | null
    };

    const audioPermission = async (): Promise<boolean> => {
        if ("MediaRecorder" in window) {
          try {
            const streamData: MediaStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false,
            });
            setStream(streamData);
          } catch (err) {
            alert(err);
          }
        } else {
          alert("Shits fucked, you're probably on some weird OS.");
        }
    
        const permission = await navigator.permissions.query({ name: "microphone" as PermissionName });
        if(permission.state === "granted") return true; 
    
        return false;
    };
    const [permissionGranted] = createResource(audioPermission);

    const startRecording = async () => {
        setRecording(true);
        if(stream() === undefined) return;
    
        const options: MediaRecorderOptions = {
          mimeType: mimeType
        }
    
        const media = new MediaRecorder(stream()!, options);
    
        mediaRecorder.current = media
        mediaRecorder.current.start();
    
        let localAudioChunks: Blob[] = [];
        mediaRecorder.current.ondataavailable = (event) => {
          if(typeof event.data === undefined) return;
          if(event.data.size === 0) return;
    
          localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    }
    
    const stopRescording = async () => {
        if(mediaRecorder.current === undefined || mediaRecorder.current === null) return;
        setRecording(false);

        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks(), { type: mimeType })
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            setAudioChunks([]);
        }
    };

    console.log('day in audio recorder:', props.day);
    
    return (
        <div>
            <div class="flex flex-col space-y-3">
                <Show when={permissionGranted() && !recording()}>
                    <button class="text-md rounded-md p-4 dark:bg-neutral-900 dark:text-neutral-200 w-full" onClick={startRecording}>record</button>
                </Show>

                <Show when={recording()}>
                    <button class="text-md rounded-md p-4 dark:bg-red-600 dark:text-neutral-200 w-full" onclick={stopRescording}>stop recording</button>
                </Show>

                <Show when={audioUrl()}>
                    <audio controls src={audioUrl()}></audio>
                </Show>
                <div>
                    <p class="text-sm font-semibold">Day: {props.day}</p>
                    <p class="text-sm font-semibold">File Name: {props.fileName}</p>
                    <p class="text-sm font-semibold">File Location: {props.fileLocation}</p>
                </div>
            </div>
        </div>
    );
};