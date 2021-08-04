import { database } from "../database.js";
/**
 * @template T
 * @param {string} table
 */
export function createCURD(table) {
	function create(data) {
		return database.insert(data).into(table);
	}

	function remove(where) {
		return database.from(table).delete(where).limit(1);
	}

	function removeAll(where) {
		return database.from(table).delete(where);
	}

	/**
	 * @param { Partial<import("../../../global.js").SearchOption } searchOption
	 * @returns { Promise<T[]>}
	 */
	async function search(searchOption = {}) {
		/** @type { import("../../../global.js").SearchOption } */
		const { limit, page, where } = {
			limit: 10,
			page: 1,
			where: {},
			...searchOption,
		};

		if (page <= 0) {
			throw new Error("use a valid page great than 0");
		}

		if (limit <= 0) {
			throw new Error("use a valid limit great than 0");
		}

		return database
			.from(table)
			.select("*")
			.limit(limit)
			.offset((page - 1) * limit)
			.where(where);
	}

	function update(update, where) {
		return database.from(table).update(update, where).limit(1);
	}

	function updateAll(where) {
		return database.from(table).update(update, where);
	}

	return Object.freeze({
		create,
		remove,
		removeAll,
		search,
		update,
		updateAll,
	});
}
