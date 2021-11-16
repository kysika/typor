import fs from "fs-extra";

/**
 *
 * @param {string} folder
 */
export async function ensureFolder(folder) {
	try {
		const file = await fs.stat(folder);
		if (file.isDirectory()) {
			const subs = await fs.readdir(folder);
			return subs.length === 0;
		} else {
			return false;
		}
	} catch (e) {
		if (e.code === "ENOENT") {
			await fs.ensureDir(folder);
			return true;
		}
		return false;
	}
}
