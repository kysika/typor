import { database } from "../../schema/database.js";
import { articleService } from "../../schema/services/article.js";
import { renderer } from "../shared/renderer/base.js";
export default {
	name: "new <markdown>",
	option: [
		["--title <title>", "title of this article"],
		["--tag <tag>", "tag for this article, split by ,"],
		["--author <author>", "author for this article"],
		["--excerpt <excerpt>", "excerpt for this article"],
		["--no-page", "pevent generate html"],
	],
	action: async (markdown, { title, tag, author, excerpt }) => {
		try {
			const id = await articleService.createFromFile(markdown, title);
			console.log(id);
		} catch (e) {
			renderer.error(e);
		}
		await database.destroy();
	},
};
