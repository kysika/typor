import { formatter } from "./format.js";

/**
 * @typedef { ({name: string; width: number, render?:(value: any) => string})} Column
 * @typedef { ({ column: string;row: string; border: string}) } SplitOptions
 */
export class Table {
	/**
	 * @type { Column []}
	 * @private
	 */
	columns;

	/**
	 * @type { SplitOptions }
	 * @readonly
	 */
	options;

	/**
	 * @readonly
	 */
	tableWidth = 0;

	/**
	 * @readonly
	 */
	contentWidth = 0;

	/**
	 *
	 * @param {Column []} columns
	 * @param { SplitOptions } options
	 */
	constructor(columns, options) {
		this.columns = columns;
		this.options = { border: "=", column: "|", row: "-", ...options };
		this.tableWidth = this.columns.reduce((total, value) => total + value.width, 0) + (this.columns.length + 1) * this.options.column.length;
		this.contentWidth = this.tableWidth - this.options.column.length * 2;
	}

	row(data) {
		return this.columns.reduce((t, { width, name, render }) => {
			const value = render ? render(data[name]) : data[name];
			return t + `${formatter.center(width, value)}${this.options.column}`;
		}, this.options.column);
	}

	border() {
		return `${this.options.column}${formatter.filledWith(this.contentWidth, this.options.row)}${this.options.column}`;
	}

	outline() {
		return formatter.filledWith(this.tableWidth, this.options.border);
	}

	head() {
		return this.columns.reduce((t, { width, name }) => {
			return t + `${formatter.center(width, name)}${this.options.column}`;
		}, this.options.column);
	}

	oneline(content) {
		return `${this.options.column}${formatter.center(this.contentWidth, content)}${this.options.column}`;
	}
}
