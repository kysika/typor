import { match } from "path-to-regexp";
import { mock } from "./data.js";

export function createMockMiddleware() {
	/**
	 *
	 * @param {import("connect").IncomingMessage} req
	 * @param {import("http").ServerResponse} res
	 * @param {import("connect").NextFunction} next
	 * @returns
	 */
	return (req, res, next) => {
		const route = mock.find((route) => match(route.path)(req.url));
		if (route) {
			const params = match(route.path)(req.url).params;
			const body = route.response(params);
			res.setHeader("Content-Type", "application/json");
			res.statusCode = 200;
			res.end(JSON.stringify(body));
		} else {
			next();
		}
	};
}
