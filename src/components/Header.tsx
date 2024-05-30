import { HiSolidCog6Tooth } from "solid-icons/hi";
import { Match, Show, Switch, createSignal } from "solid-js";
import { open } from "@tauri-apps/plugin-dialog";
import { A, useLocation } from "@solidjs/router";

export default function Header() {
    const [path, setPath] = createSignal<string>("");
    const location = useLocation();


    const filePath = async () => {
        var path = await open({
            title: 'Audio Files',
            directory: true
        });
        if(path === null) return;
        setPath(path);
    }
    
    
    return (
        <header class="flex flex-row justify-between p-2">
            <div class="flex flex-col items-start">
                <h1 class="text-center text-2xl font-semibold text-neutral-50">
                    :shrug:
                </h1>
            </div>
            <div class="flex flex-col items-end">
                <Switch>
                    <Match when={location.pathname !== "/settings"}>
                        <A href="/settings"  class="text-md rounded-md p-2 dark:bg-neutral-900 dark:text-neutral-200">
                            <HiSolidCog6Tooth class="h-6 w-6"/>
                        </A>
                    </Match>
                    <Match when={location.pathname === "/settings"}>
                        <A href=""  class="text-md rounded-md p-2 dark:bg-green-400 dark:text-neutral-800">
                            Save & Close
                        </A>
                    </Match>
                </Switch>

            </div>
        </header>
    );
}