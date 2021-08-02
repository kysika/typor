import { Knex } from "knex";
export declare interface Article {}

export declare interface Theme {
	template: string;
	render: (articles: Article[]) => {};
}

export declare type tableBuilder = (table: Knex.CreateTableBuilder) => void;
