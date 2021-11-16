import fs from "fs-extra";
const url = new URL("../../package.json", import.meta.url);
export const version = fs.readJsonSync(url.pathname).version;
