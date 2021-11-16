/**
 *
 * @param {string} str
 */
export function slash(str) {
	if (typeof str === "string") return str.replace(/\/{2}/g, "/");
	throw Error(`slash parameter is not a string`);
}
