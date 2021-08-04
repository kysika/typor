import { database } from "../../core/database.js";
import { articleService } from "../../core/services/article.js";
import { renderer } from "../shared/renderer/base.js";

const actions = {
	async article(id) {
		await articleService.deleteOne(id);
		renderer.primary("delete successfully!");
		await database.destroy();
	},
};

export default {
	name: "rm <type> <id>",
	action(type, id) {
		actions[type]?.(id);
	},
};
