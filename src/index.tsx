/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "./styles.css";
import App from "./App";
import Layout from "./components/Layout";
import Settings from "./pages/Settings";
import Day from "./pages/Day";

render(() => (
    <Router root={Layout}>
        <Route path="" component={App}></Route>
        <Route path="/settings" component={Settings}></Route>
        <Route path="/day/:number" component={Day}></Route>
    </Router>
), document.getElementById("root") as HTMLElement);
