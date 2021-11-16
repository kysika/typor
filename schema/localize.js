import fs from "fs-extra";

export async function localize(data, dest) {
	await fs.ensureFile(dest);
	await fs.writeFile(dest, JSON.stringify(data), { flag: "w+", encoding: "utf-8" });
}
