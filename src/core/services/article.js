import { database } from "../database.js";
import { markdown } from "../markdown.js";
import fs from "fs-extra";
import path from "path";
import { ArticleStatus, DatabaseTable, Foreigns } from "../constants.js";
import excerpt from "excerpt-html";
import { createCURD } from "./base.js";

const base = createCURD(DatabaseTable.Article);

async function createFromFile(file, title) {
	const _title = title || path.basename(file, ".md");
	const resource = await fs.readFile(file, "utf-8");
	return create(_title, resource);
}

async function create(title, resource) {
	if (!title) {
		throw Error("provide a title please");
	}
	const _has = await base.search({ where: { title }, limit: 1 });

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
		status: ArticleStatus.display,
	};
	await base.create(article);
}

/**
 * @param { Partial<import("../../../global.js").SearchOption } searchOption
 * @returns { Promise<import("../../../global.js").Article[]>}
 */
async function search(searchOption = {}) {
	/** @type { import("../../../global.js").SearchOption } */
	const { limit, page, where } = {
		limit: 10,
		page: 1,
		where: {},
		...searchOption,
	};

	if (page <= 0) {
		throw new Error("use a valid page great than 0");
	}

	if (limit <= 0) {
		throw new Error("use a valid limit great than 0");
	}

	return database
		.from(DatabaseTable.Article)
		.select("*")
		.limit(limit)
		.offset((page - 1) * limit)
		.where(where);
}

async function findOne(id) {
	const pt = database.from(DatabaseTable.ArticleTag).where(`${DatabaseTable.ArticleTag}.${Foreigns.article}`, id);
	const pa = database.select("*").where({ id }).from(DatabaseTable.Article);

	const [article, tags] = await Promise.all([pa, pt]);
	if (article) {
		article.tags = tags || [];
	}

	return article;
}

async function count(where = {}) {
	const total = await database.count("id").where(where).from(DatabaseTable.Article);
	return total[0]["count(`id`)"];
}

async function deleteOne(id) {
	await database.delete().where({ id }).from(DatabaseTable.Article);
}

export const articleService = Object.freeze({
	search,
	createFromFile,
	create,
	findOne,
	count,
	deleteOne,
});
