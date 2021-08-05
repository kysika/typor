import { articleService } from "./services/article.js";

export const router = {
	"/api/articles": () => {
		return articleService.search();
	},
	"/api/article/:id": async ({ id }) => {
		const data = await articleService.search({ where: { id } });
		return data[0];
	},
};
