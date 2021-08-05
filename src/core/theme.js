import fs from "fs-extra";
import { hydrate } from "./svelte.js";
import { templatePath } from "./constants.js";

/**
 * @param { string } entry
 * @return { Promise<import("../../global").Theme>}
 */
export async function useThemeConfig(entry) {
	const content = await fs.readFile(entry, "base64");
	const theme = await import("data:text/javascript;base64," + content).then((module) => module.default);
	return theme;
}

/**
 *
 * @param {({entry: string; output: {csspath:string;jspath:string; }})} option
 */
export async function generateTheme(option) {
	const { entry, output } = option;
	const { csspath, jspath } = output;
	const { js, css } = await hydrate(entry);
	// TODO move assets
	await Promise.all([fs.writeFile(csspath, css, { flag: "w+", encoding: "utf-8" }), fs.writeFile(jspath, js, { flag: "w+", encoding: "utf-8" })]);
	const _template = `
	<html lang="zh-CN">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="{{{css}}}" />
		<title>{{title}}</title>
	</head>
	<body>
		<div id="app">{{{content}}}</div>
		<script>
			window[Symbol.for("tying_knots_server_side_context")] = {{{injection}}}
		</script>
		<script src="{{{js}}}"></script>
	</body>
</html>
`;
	await fs.ensureFile(templatePath);
	await fs.writeFile(templatePath, _template, { flag: "w+", encoding: "utf-8" });
}
