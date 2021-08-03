import { Knex } from "knex";
export declare interface Article {
	id?: number;
	title: string;
	content: string;
	resource: string;
	author: string;
	updated_at: number;
	created_at: number;
	excerpt: string;
}

export declare interface Theme {
	template: string;
	render: (articles: Article[]) => {};
}

export declare type tableBuilder = (table: Knex.CreateTableBuilder) => void;
