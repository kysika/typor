import { database } from "../database.js";
import { markdown } from "../markdown.js";
import fs from "fs-extra";
import path from "path";
import { DatabaseTable, Foreigns } from "../constants.js";

async function createFromFile(file, title) {
	const _title = title || path.basename(file);
	const resource = await fs.readFile(file, "utf-8");
	return create(_title, resource);
}

async function create(title, resource) {
	const content = markdown(resource);
	const timestamp = Date.now();
	const article = {
		title,
		content,
		resource,
		created_at: timestamp,
		updated_at: timestamp,
		excerpt: resource.replace(/\n/g, "").slice(0, 100),
	};
	await database.insert(article).into("article");
}

/**
 * @param {} searchOption
 * @returns { Promise<import("../../../global.js").Article[]>}
 */
async function search(searchOption = {}) {
	const option = {
		limit: 10,
		offset: 0,
		where: {},
		...searchOption,
	};
	return database.from(DatabaseTable.Article).select("*").limit(option.limit).offset(option.offset).where(option.where);
}

async function findOne(id) {
	const pt = database.from(DatabaseTable.ArticleTag).where(`${DatabaseTable.ArticleTag}.${Foreigns.article}`, id);
	const pa = database.select("*").from(DatabaseTable.Article).where({ id });

	const [article, tags] = await Promise.all([pa, pt]);
	if (article) {
		article.tags = tags || [];
	}

	return article;
}

export const articleService = Object.freeze({
	search,
	createFromFile,
	create,
	findOne,
});
