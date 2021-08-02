import { getContext, onMount } from "svelte";
import { writable } from "svelte/store";

const serverSideInjectedContextKey = Symbol.for("tying_knots_server_side_context");

const api = {
	article: "/api/article/",
	articles: "/api/articles",
	tag: "/api/tags",
	timeline: "/api/timeline",
	category: "/api/category",
};

function useData(url, defaultValue = {}) {
	const cache = getContext(url);
	const value = writable(cache ? cache : defaultValue);
	onMount(() => {
		if (!cache) {
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
					value.set(data);
				});
		}
	});
	return value;
}

/**
 *
 * @param {string} id
 * @returns { import("svelte/store").Writable<import("../../global").Article>}
 */
export function useArticle(id) {
	const url = api.article + id;
	return useData(url, {});
}

export function useArticlesList(page = 1, limit = 20) {
	return useData(api.articles + `?page=${page}&limit=${limit}`, []);
}

export function useTags() {
	return useData(api.tag, []);
}

export function useCategories() {
	return useData(api.category, []);
}

export function useTimeline() {
	return useData(api.timeline, []);
}

export function toggleTheme() {}

export function useServerSideInjectedContext() {
	return window[serverSideInjectedContextKey] || new Map();
}
