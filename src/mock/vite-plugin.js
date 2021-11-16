import { createMockMiddleware } from "./create-mock-middleware.js";

/**
 * @type {() =>  import("vite").Plugin}
 */
export function VitePluginMock() {
	return {
		name: "vite:tyke:mock",
		enforce: "pre",
		configureServer: async ({ middlewares }) => {
			const middleware = createMockMiddleware();
			middlewares.use(middleware);
		},
	};
}
