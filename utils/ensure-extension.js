import path from "path";

/**
 *
 * @param {string} filename
 * @param {string} extension
 * @returns {string}
 */
export function ensureExtension(filename, extension) {
	if (path.extname(filename) === extension) return filename;
	return filename + extension;
}
