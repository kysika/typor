import { database } from "../../schema/database.js";
import { articleService } from "../../schema/services/article.js";

export default {
	name: "find <id>",
	action: async (id) => {
		const data = await articleService.findOne(id);
		console.log(data);
		database.destroy();
	},
};
