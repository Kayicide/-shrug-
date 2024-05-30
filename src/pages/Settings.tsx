
import { createSignal } from "solid-js";
import { open } from "@tauri-apps/plugin-dialog";

function Settings() {
    const [path, setPath] = createSignal<string>("");

    const filePath = async () => {
      var path = await open({
            title: 'Audio Files',
            directory: true
        });
      if(path === null) return;
      setPath(path);
    }


    return (
        <div>
            lol
        </div>
    );
}

export default Settings;
