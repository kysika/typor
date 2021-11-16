import { formatter } from "../format.js";
import { renderer } from "./base.js";
/** @typedef { import("../table.js").Table } Table */
/** @typedef { ({limit:number; offset: number; empty: string; total: number}) } Pagination */

export class TableRenderer {
	/**
	 *
	 * @param {Table} table
	 * @param {Pagination} pagination
	 */
	constructor(table, option = {}) {
		this.table = table;
		({ empty: this.empty = "NO DATA" } = option);
	}

	/**
	 * @param {({data: any[]; pagination?: Pagination; showHead: boolean; title?: string}) } option
	 */
	render(option) {
		const { data = [], pagination, showHead = true } = option;
		this.renderOutline();
		showHead && this.renderHead();
		this.renderBody(data);
		this.renderOutline();
		if (pagination) {
			this.renderPagination(pagination);
			this.renderOutline();
		}
	}

	/**
	 *
	 * @param {T[]} data
	 * @private
	 */
	renderBody(data) {
		if (data.length === 0) {
			const emptyLine = this.table.oneline(" ");
			const text = this.table.oneline(this.empty);
			renderer.text(emptyLine);
			renderer.text(emptyLine);
			renderer.text(text);
			renderer.text(emptyLine);
			renderer.text(emptyLine);
			renderer.text(this.table.border());
		} else {
			data.forEach((article) => {
				renderer.text(this.table.row(article));
				renderer.text(this.table.border());
			});
		}
	}

	/**
	 *  @private
	 */
	renderHead() {
		renderer.text(this.table.border());
		renderer.text(this.table.head());
		renderer.text(this.table.border());
	}

	/**
	 *  @private
	 */
	renderOutline() {
		renderer.primary(this.table.outline());
	}

	/**
	 *
	 * @param {*} title
	 *  @private
	 */
	renderTitle(title) {}

	/**
	 *
	 * @param { Pagination } pagination
	 * @private
	 */
	renderPagination({ total, page, limit }) {
		const text = {
			total: "TOTAl: " + total,
			page: "PAGE: " + page,
			limit: "LIMIT: " + limit,
			totalPage: "TOTAL PAGE: " + Math.ceil(total / limit),
		};
		const { tableWidth, options } = this.table;
		const { column } = options;
		const pagination = formatter.left(tableWidth, `${text.total} ${column} ${text.limit} ${column} ${text.page} ${column} ${text.totalPage}`, 1);
		renderer.text(pagination);
	}
}
