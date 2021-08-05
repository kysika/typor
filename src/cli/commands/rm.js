import { database } from "../../core/database.js";
import { articleService } from "../../core/services/article.js";
import { renderer } from "../shared/renderer/base.js";
import { color } from "../shared/renderer/color.js";

const actions = {
	async article(id) {
		await articleService.deleteOne(id);
		renderer.primary("delete successfully!");
		await database.destroy();
	},
};

export default {
	name: "rm <type> <id>",
	desc: "remove something by its id, e.g. " + color.accent("rm article 1 "),
	action(type, id) {
		if (Object.keys(actions).includes(type)) {
			actions[type](id);
		} else {
			renderer.error("choose a type to rm.");
		}
	},
};
