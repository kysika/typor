import { renderer } from "../shared/renderer.js";
import { Table } from "../shared/table.js";

const colums = [
	{
		name: "id",
		width: 5,
	},
	{
		name: "title",
		width: 30,
	},
	{
		name: "updated_at",
		width: 20,
	},
	{
		name: "created_at",
		width: 20,
	},
	{
		name: "excerpt",
		width: 120,
	},
];

const table = new Table(colums, { border: "=", column: "|" });
const headline = table.head();
const borderline = table.border();
const dashline = table.fillline("-");

function head() {
	renderer.text(headline);
}

function border() {
	renderer.primary(borderline);
}

function dash() {
	renderer.text(dashline);
}

function empty() {
	const _e = table.empty();
	const text = table.oneline("now is empty, use tk creaet <file> to create a article page!");
	renderer.text(_e);
	renderer.text(_e);
	renderer.text(text);
	renderer.text(_e);
	renderer.text(_e);
	dash();
}

/**
 *
 * @param {Array} data
 */
export function render(data) {
	border();
	dash();
	head();
	dash();
	if (data.length === 0) {
		empty();
	} else {
		data.forEach((article) => {
			renderer.text(table.row(article));
			dash();
		});
	}
	border();
}
