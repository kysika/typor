import knex from "knex";

export const database = knex({
	client: "sqlite3",
	connection: {
		filename: "database.db",
	},
	debug: false,
	useNullAsDefault: true,
});

/**
 * @type { Record<string, import("../../global").tableBuilder> }
 */

export const tablemap = {
	user: (table) => {
		table.increments("id").primary();
		table.string("username");
		table.integer("created_at");
		table.string("email");
		table.string("phone");
		table.string("password");
		table.string("slogan");
		table.string("avatar");
		table.string("address");
		table.string("concat");
	},
	timeline: (table) => {
		table.increments("id").primary();
		table.string("line").unique();
		table.foreign("id").references("article.timeline_id");
	},
	tag: (table) => {
		table.increments("id").primary();
		table.string("name").unique();
		table.string("color");
		table.string("back_color");
		table.foreign("id").references("article.tag_id");
	},
	category: (table) => {
		table.increments("id").primary();
		table.string("type").unique();
		table.foreign("id").references("article.category_id");
	},
	article: (table) => {
		table.increments("id").primary();
		table.string("title");
		table.text("content");
		table.text("excerpt");
		table.string("author");
		table.string("created_at");
		table.string("updated_at");
		table.foreign("id").references("tag.article_id");
		table.foreign("id").references("timeline.article_id");
		table.foreign("id").references("category.article_id");
	},
};

export async function bootstrapTables() {
	const tablenames = Object.keys(tablemap);
	for (const tablename of tablenames) {
		const existed = await database.schema.hasTable(tablename);
		if (!existed) {
			await database.schema.createTable(tablename, tablemap[tablename]);
		}
	}
}
