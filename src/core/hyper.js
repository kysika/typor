import fs from "fs-extra";
import { slash } from "./utils.js";
import { ssr } from "./svelte.js";
import mustache from "mustache";

export async function hyper(url, data) {
	const template = await fs.readFile("theme/template.mustache", "utf-8");
	const injection = {
		...data,
		url,
	};
	const context = new Map(Object.entries(injection));
	const { html } = await ssr("theme/app.svelte", { url }, context);
	const page = mustache.render(template, { css: "/bundle.css", js: "/bundle.js", content: html, injection: JSON.stringify(injection) });
	const path = slash("public" + url + "/index.html");
	await fs.ensureFile(path);
	await fs.writeFile(path, page, { encoding: "utf-8", flag: "w+" });
}
