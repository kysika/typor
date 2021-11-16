import { Table } from "../shared/table.js";
const columns = [
	{
		name: "id",
		width: 10,
	},
	{
		name: "name",
		width: 20,
	},
];

export const tagTable = new Table(columns, { border: "=", column: "|" });
