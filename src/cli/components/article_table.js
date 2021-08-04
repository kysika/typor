import { Table } from "../shared/table.js";
import dayjs from "dayjs";

const colums = [
	{
		name: "id",
		width: 5,
	},
	{
		name: "title",
		width: 30,
		/**
		 *
		 * @param {string} title
		 * @returns
		 */
		render(title) {
			return title.length > 20 ? title.slice(0, 20) + "..." : title;
		},
	},
	{
		name: "updated_at",
		width: 20,
		render(time) {
			return dayjs(time).format("YYYY/MM/DD HH:mm");
		},
	},
	{
		name: "created_at",
		width: 20,
		render(time) {
			return dayjs(time).format("YYYY/MM/DD HH:mm");
		},
	},
	{
		name: "excerpt",
		width: 40,
		/**
		 *
		 * @param {string} excerpt
		 * @returns
		 */
		render(excerpt) {
			return excerpt.length > 30 ? excerpt.slice(0, 30) + "..." : excerpt;
		},
	},
];

export const articleTable = new Table(colums, { border: "=", column: "|" });
