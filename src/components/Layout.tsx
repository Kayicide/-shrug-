import Footer from "./Footer";
import Header from "./Header";

export default function Layout(props: any) {
    return (
        <div class="h-screen flex flex-col dark:bg-neutral-800 dark:text-neutral-200">
            <Header></Header>
                {props.children}
            <Footer></Footer>
        </div>
    );
}

