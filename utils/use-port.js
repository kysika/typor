import http from "http";

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
