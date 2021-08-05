/* eslint-disable*/
import App from "./app.svelte";
import { useServerSideInjectedContext } from "../src/svelte/index.js";

new App({
	target: document.getElementById("app"),
	hydrate: true,
	context: useServerSideInjectedContext(),
});
