import { database } from "../../core/database.js";
import { articleService } from "../../core/services/article.js";
export default {
	name: "new <file>",
	action: async (file) => {
		await articleService.createFromFile(file);
		await database.destroy();
	},
};
