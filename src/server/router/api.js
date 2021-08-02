import Router from "koa-router";
import { database } from "../../core/data.js";

const router = new Router();

router.prefix("/api").get("/", async (ctx) => {
	const users = await database.select().from("test_user");
	ctx.body = users;
});

export default router;
