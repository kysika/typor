import { Knex } from "knex";
export declare interface Article {
	id?: number;
	title: string;
	content: string;
	resource: string;
	updated_at: number;
	created_at: number;
	excerpt: string;
	status: ArticleStatus;
}

export declare interface Theme {
	template: string;
	render: (articles: Article[]) => {};
}

export declare type tableBuilder = (table: Knex.CreateTableBuilder) => void;

export declare interface SearchOption {
	limit: number;
	page: number;
	where: Record<string, unknown>;
	reverse: boolean;
}

export declare enum ArticleStatus {
	hide,
	display,
	invalide,
}
