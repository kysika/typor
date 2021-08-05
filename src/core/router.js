import { articleService } from "./services/article.js";

export const router = {
	"/api/articles/:page": ({ page }) => {
		return articleService.search({ reverse: true, page });
	},
	"/api/article/:id": async ({ id }) => {
		const data = await articleService.search({ where: { id } });
		return data[0];
	},
};
