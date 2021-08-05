import App from "./app.svelte";
import "./assets/global.css";
import { useInitURL, useServerSideInjectedContext } from "../src/svelte/index.js";

const app = new App({
	target: document.getElementById("app"),
	hydrate: true,
	context: useServerSideInjectedContext(),
});

console.log(useInitURL());

app.$set({ url: useInitURL() });
