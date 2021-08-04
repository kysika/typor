import { database } from "../../core/database.js";
import { articleService } from "../../core/services/article.js";
import { renderer } from "../shared/renderer/base.js";
export default {
	name: "new <markdown>",
	option: [
		["--title <title>", "title of this article"],
		["--tag <tag>", "tag for this article, split by ,"],
		["--author <author>", "author for this article"],
		["--excerpt <excerpt>", "excerpt for this article"],
	],
	action: async (markdown, { title, tag, author, excerpt }) => {
		try {
			await articleService.createFromFile(markdown, title);
		} catch (e) {
			renderer.error(e);
		}
		await database.destroy();
	},
};
