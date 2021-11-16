import { database } from "../../schema/database.js";
import { articleService } from "../../schema/services/article.js";
import { articleTable } from "../components/article_table.js";
import { tagTable } from "../components/tag_table.js";
import { renderer } from "../shared/renderer/base.js";
import { TableRenderer } from "../shared/renderer/table.js";

const actions = {
	tag() {
		const tagTableRenderer = new TableRenderer(tagTable);
		tagTableRenderer.render([]);
	},
	timeline() {},
	category() {},
	async article(option) {
		try {
			const tr = new TableRenderer(articleTable);
			const [data, total] = await Promise.all([articleService.search(option), articleService.total(option.where)]);
			tr.render({ data, pagination: { total, ...option } });
		} catch (e) {
			renderer.error(e);
		}
	},
};

function qs2obj(search) {
	const usp = new URLSearchParams(search);
	return Object.fromEntries(usp.entries());
}

export default {
	name: "ls [type]",
	option: [
		["--limit <limit>", ""],
		["--page <page>", ""],
		["--search <search>", "query string"],
		["--reverse", ""],
	],
	action: async (type = "article", { limit = 10, page = 1, search, reverse }) => {
		const where = qs2obj(search);
		const searchOption = {
			limit,
			page,
			where,
			reverse,
		};
		await actions[type]?.(searchOption);
		database.destroy();
	},
};
