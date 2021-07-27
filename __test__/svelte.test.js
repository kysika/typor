import { strictEqual } from "assert";
import { ssr } from "../src/core/svelte.js";

const name = "tying-knots";
const { html } = await ssr("__test__/app.svelte", { name });

strictEqual(`<h1>${name}</h1>`, html);
