import { HiSolidArrowLeft, HiSolidArrowLeftCircle, HiSolidBackspace, HiSolidBackward, HiSolidChevronLeft, HiSolidCog6Tooth } from "solid-icons/hi";
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
            <div class="flex items-center justify-start w-28">
                <h1 class="text-center text-2xl font-semibold text-neutral-50">
                    :shrug:
                </h1>
            </div>
            <div class="flex items-center">
                <h2 class="text-center text-2xl font-semibold text-neutral-50">
                    {location.pathname}
                </h2>
            </div>
            <div class="flex items-center justify-end w-28">
                <Switch>
                    <Match when={location.pathname !== "/settings"}>
                        <A href="/settings"  class="text-md rounded-md p-2 dark:bg-neutral-900 dark:text-neutral-200">
                            <HiSolidCog6Tooth class="h-6 w-6"/>
                        </A>
                    </Match>
                    <Match when={location.pathname === "/settings"}>
                        <A href=""  class="text-md rounded-md p-2 dark:bg-neutral-900 dark:text-neutral-200">
                            <HiSolidChevronLeft class="h-6 w-6"/>
                        </A>
                    </Match>
                </Switch>

            </div>
        </header>
    );
}