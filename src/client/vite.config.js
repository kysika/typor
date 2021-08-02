import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-refresh";

export default defineConfig({
	root: "src/client",
	plugins: [react()],
	esbuild: {
		jsxInject: `import React from 'react'`,
	},
});
