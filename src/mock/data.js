/**
 * @typedef {({path: string; response: (req: {params: Record<string, string}) => object})} MockData
 * @type { MockData[] }
 */
export const mock = [
	{
		path: "/api/articles",
		response({ params }) {
			return { data: [] };
		},
	},
];
