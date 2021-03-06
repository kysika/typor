import path from "path";
import http from "http";

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

/**
 *
 * @param {string} str
 */
export function slash(str) {
	if (typeof str === "string") return str.replace(/\/{2}/g, "/");
	throw Error(`slash parameter is not a string`);
}

/**
 * @returns { Promise<number> }
 */
export async function usePort() {
	return new Promise((resolve) => {
		let port = 8080;

		const server = http.createServer();

		function start(port) {
			server.listen(port, "0.0.0.0");
		}

		server.on("error", () => {
			port++;
			start(port);
		});

		server.on("listening", () => {
			server.close();
			resolve(port);
		});

		start(port);
	});
}
