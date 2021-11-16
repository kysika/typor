import { models } from "../models/index.js";

/**
 * @template T
 * @param {string} table
 */
export function createBaseService(table) {
	const useModel = models[table];

	async function create(data) {
		const numbers = await useModel().insert(data);
		return numbers[0];
	}

	function remove(where) {
		return useModel().delete(where).limit(1);
	}

	function removeAll(where) {
		return useModel().delete(where);
	}

	/**
	 * @param { Partial<import("../../global.js").SearchOption } searchOption
	 * @returns { Promise<T[]>}
	 */
	async function search(searchOption = {}) {
		/** @type { import("../../global.js").SearchOption } */
		const { limit, page, where, reverse } = {
			limit: 10,
			page: 1,
			reverse: false,
			where: {},
			...searchOption,
		};

		if (page <= 0) {
			throw new Error("use a valid page great than 0");
		}

		if (limit <= 0) {
			throw new Error("use a valid limit great than 0");
		}

		return useModel()
			.select("*")
			.limit(limit)
			.offset((page - 1) * limit)
			.orderBy("id", reverse ? "desc" : "asc")
			.where(where);
	}

	function update(update, where) {
		return useModel().update(update, where).limit(1);
	}

	function updateAll(where) {
		return useModel().update(update, where);
	}

	async function total(where = {}) {
		const data = await useModel().count("id").where(where);
		return data[0]["count(`id`)"];
	}

	return Object.freeze({
		create,
		remove,
		removeAll,
		search,
		update,
		updateAll,
		useModel,
		total,
	});
}
