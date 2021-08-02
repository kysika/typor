import { strictEqual } from "assert";
import { useTheme } from "../src/core/theme.js";

const theme = await useTheme("__test__/theme.config.js");

console.log(theme.render());
strictEqual(theme.template, "fake-template");
