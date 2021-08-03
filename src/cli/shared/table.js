/**
 * @typedef { ({name: string; width: number})} Column
 * @typedef { ({ column: string; border: string}) } SplitOptions
 */

import { line, columnSideSpace } from "./format.js";

export class Table {
	/**
	 * @property { Column []}
	 * @private
	 */
	columns;

	/**
	 * @property { SplitOptions }
	 * @private
	 */
	options;

	/**
	 * @private
	 */
	tableWidth = 0;

	/**
	 * @private
	 */
	contentWidth = 0;

	/**
	 *
	 * @param {Column []} columns
	 * @param { SplitOptions } options
	 */
	constructor(columns, options) {
		this.columns = columns;
		this.options = { border: "=", column: "|", ...options };
		this.tableWidth = this.columns.reduce((total, value) => total + value.width, 0) + (this.columns.length + 1) * this.options.column.length;
		this.contentWidth = this.tableWidth - this.options.column.length * 2;
	}

	row(data) {
		return this.columns.reduce((t, { width, name }) => {
			const [left, right] = columnSideSpace(width, data[name]);
			return t + `${left}${data[name]}${right}${this.options.column}`;
		}, this.options.column);
	}

	border() {
		return line(this.tableWidth, this.options.border);
	}

	head() {
		return this.columns.reduce((t, { width, name }) => {
			const [left, right] = columnSideSpace(width, name);
			return t + `${left}${name}${right}${this.options.column}`;
		}, this.options.column);
	}

	oneline(content) {
		const [left, right] = columnSideSpace(this.contentWidth, content);
		return `${this.options.column}${left}${content}${right}${this.options.column}`;
	}

	empty() {
		return this.oneline("");
	}

	fillline(content) {
		return `${this.options.column}${line(this.contentWidth, content)}${this.options.column}`;
	}
}
