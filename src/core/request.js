import { router } from "./router.js";
import { match } from "path-to-regexp";

export async function request(url) {
	const routes = Object.keys(router);
	const route = routes.find((route) => match(route, { decode: decodeURIComponent })(url));
	const params = match(route, { decode: decodeURIComponent })(url).params;
	return router[route](params);
}
