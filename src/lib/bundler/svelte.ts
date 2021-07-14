import * as rollup from "rollup";
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import sveltePreprocess from "svelte-preprocess";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
// @ts-ignore
import precss from "precss";
// @ts-ignore
import css from "rollup-plugin-css-only";
import { Bundler } from "./interface";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import btoa from "btoa";

type SvelteServerSideComponent = {
    render(
        props?: Record<string, unknown>,
        option?: { context: Map<string, unknown> }
    ): {
        html: string;
        css: {
            code: string;
        };
        head: string;
    };
};

export class SvelteBundler implements Bundler {
    private resolvePlugin = resolve({ browser: true });
    private commonjsPlugin = commonjs();
    private jsonPlugin = json();

    private async _bundle(input: string, hydratable: boolean) {
        let styles: string = "";
        const cssplugin = css({
            output: (css: string) => {
                styles = css;
            },
        }) as rollup.Plugin;

        const plugins: rollup.Plugin[] = [
            svelte({ preprocess: sveltePreprocess(), emitCss: true, compilerOptions: { generate: "dom", hydratable, css: false } }),
            cssplugin,
            this.resolvePlugin,
            this.commonjsPlugin,
            this.jsonPlugin,
        ];

        const bundle = await rollup.rollup({ input, plugins });
        const result = await bundle.generate({ format: "iife", name: "app_bundle" });
        const cssresult = await postcss([autoprefixer, precss]).process(styles, { from: undefined, map: false });
        styles = cssresult.css;

        return {
            js: result.output[0].code,
            css: styles,
        };
    }

    /**
     * Generate client side hydration render js bundle and css bundle. used with ssg/ssr
     */
    hydrate(input: string) {
        return this._bundle(input, true);
    }

    /**
     * Generate a Client Side Render js bundle and css bundle.
     */
    csr(input: string) {
        return this._bundle(input, false);
    }

    /**
     * Generate html string use a Svelte Server Side  Component
     */
    async ssr(input: string, props: Record<string, unknown>, context?: Record<string, unknown>) {
        const plugins = [
            svelte({ preprocess: sveltePreprocess(), emitCss: false, compilerOptions: { generate: "ssr", hydratable: true, format: "esm" } }),
            this.resolvePlugin,
            this.commonjsPlugin,
            this.jsonPlugin,
        ];

        const bundle = await rollup.rollup({ input, plugins });
        const result = await bundle.generate({ format: "esm" });
        const js_code = result.output[0].code;

        // previous work
        // const temp_file = path.resolve(path.dirname(""), ".temp.js");
        // await fs.ensureFile(temp_file);
        // await fs.writeFile(temp_file, "// @ts-nocheck \n" + js_code, "utf-8");
        // const module = await import(temp_file);
        // await fs.rm(temp_file);
        // now use import base64

        const base64module = "data:text/javascript;base64," + btoa(js_code);
        const module = await import(base64module);
        const component = module.default as SvelteServerSideComponent;

        let _context = new Map();
        if (context) {
            for (const key in context) {
                _context.set(key, context[key]);
            }
        }
        const rs = component.render(props, { context: _context });

        return {
            html: rs.html,
            head: rs.head,
        };
    }
}

export const svelteBundler = new SvelteBundler();
