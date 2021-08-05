import { hyper } from "./core/hyper.js";
import { generateTheme } from "./core/theme.js";

await generateTheme({
	entry: "theme/index.js",
	output: {
		jspath: "public/bundle.js",
		csspath: "public/bundle.css",
	},
});

await Promise.all([hyper("/"), hyper("/article/1")]);
