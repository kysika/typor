import { markdown } from "../markdown.js";
import fs from "fs-extra";
import path from "path";
import { ArticleStatus, DatabaseTable } from "../constants.js";
import excerpt from "excerpt-html";
import { createBaseService } from "./base.js";

const articleBaseService = createBaseService(DatabaseTable.Article);

async function createFromFile(file, title) {
	const _title = title || path.basename(file, ".md");
	const resource = await fs.readFile(file, "utf-8");
	return createWithResource(_title, resource);
}

async function createWithResource(title, resource) {
	if (!title) {
		throw Error("provide a title please");
	}
	const _has = await articleBaseService.search({ where: { title }, limit: 1 });

	if (_has.length > 0) {
		throw Error("Duplicated article.title");
	}

	const content = markdown(resource);

	const timestamp = Date.now();
	/**
	 * @type {import("../../../global.js").Article}
	 */
	const article = {
		title,
		content,
		resource,
		created_at: timestamp,
		updated_at: timestamp,
		excerpt: excerpt(content).replace(/\n/g, "").slice(0, 100),
		status: ArticleStatus.hide,
	};
	return await articleBaseService.create(article);
}

export const articleService = Object.freeze({
	...articleBaseService,
	createFromFile,
	createWithResource,
});
