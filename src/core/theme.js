import fs from "fs-extra";

/**
 * @param { string } entry
 * @return { Promise<import("../../global").Theme>}
 */
export async function useTheme(entry) {
	const content = await fs.readFile(entry, "base64");
	const theme = await import("data:text/javascript;base64," + content).then((module) => module.default);
	return theme;
}
