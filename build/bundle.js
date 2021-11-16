import { rollup } from "rollup";
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import sveltePreprocess from "svelte-preprocess";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import precss from "precss";
import css from "rollup-plugin-css-only";

const resolvePlugin = resolve({ browser: true });

async function bundle(input, hydratable) {
	let styles = "";
	const cssplugin = css({
		output: (css) => {
			styles = css;
		},
	});
	const plugins = [svelte({ preprocess: sveltePreprocess(), emitCss: true, compilerOptions: { generate: "dom", hydratable, css: false } }), cssplugin, resolvePlugin];
	const bundle = await rollup({ input, plugins });
	const result = await bundle.generate({ format: "iife", name: "app_bundle" });
	const cssresult = await postcss([autoprefixer, precss]).process(styles);
	styles = cssresult.css;
	return {
		js: result.output[0].code,
		css: styles,
	};
}

/**
 * Generate a Client Side Render js bundle and css bundle.
 */
export function csr(input) {
	return bundle(input, false);
}

/**
 * Generate html string use a Svelte Server Side  Component
 * @param { string } input
 * @param { object } props
 * @param { Map<string, string> } context
 */
export async function ssr(input, props, context = new Map()) {
	const plugins = [svelte({ preprocess: sveltePreprocess(), emitCss: false, compilerOptions: { generate: "ssr", hydratable: true, format: "esm" } }), resolvePlugin];
	const bundle = await rollup({ input, plugins });
	const result = await bundle.generate({ format: "esm" });
	const js_code = result.output[0].code;

	const base64module = "data:text/javascript;base64," + Buffer.from(js_code).toString("base64");
	const module = await import(base64module);
	const component = module.default;
	const rs = component.render(props, { context });
	return {
		html: rs.html,
		head: rs.head,
	};
}

/**
 * Generate client side hydration render js bundle and css bundle. used with ssg/ssr
 * @param {string} input
 */
export function hydrate(input) {
	return bundle(input, true);
}
