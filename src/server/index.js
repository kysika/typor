import Koa from "koa";
import { usePort } from "../core/utils.js";
import fs from "fs-extra";
import path from "path";

/**
 *
 * @returns { Promise<void> }
 */
export async function bootstrap() {
	const port = await usePort();
	const app = new Koa();
	app.use(async (ctx, next) => {
		try {
			await next();
		} catch (e) {
			ctx.body = {
				code: 500,
				msg: "Service Internal Error",
			};
		}
	});

	const routerURL = new URL("./router", import.meta.url);
	const routerfiles = await fs.readdir(routerURL.pathname);

	for (const routerfile of routerfiles) {
		const router = await import(path.resolve(routerURL.pathname, routerfile)).then((module) => module.default);
		app.use(router.allowedMethods()).use(router.routes());
	}

	app.use(async () => {
		throw Error("404 Not Found");
	});

	return new Promise((resolve) => {
		app.listen(port, () => {
			console.log(`server is running on http://localhost:${port}`);
			resolve();
		});
	});
}

await bootstrap();
