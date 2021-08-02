import Koa from "koa";
import apiRouter from "./router/api.js";
import { usePort } from "../core/utils.js";

/**
 *
 * @returns { Promise<void> }
 */
export async function bootstrap() {
	const port = await usePort();
	const app = new Koa();
	return new Promise((resolve) => {
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

		app.use(apiRouter.allowedMethods()).use(apiRouter.routes());

		app.use(async () => {
			throw Error("404 Not Found");
		});

		app.listen(port, () => {
			console.log(`server is running on http://localhost:${port}`);
			resolve();
		});
	});
}
