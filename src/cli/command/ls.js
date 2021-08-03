import { database } from "../../core/database.js";
import { articleService } from "../../core/services/article.js";
import { render } from "../components/article_table.js";

export default {
	name: "ls",
	action: async () => {
		const data = await articleService.search();
		render(data);
		database.destroy();
	},
};
