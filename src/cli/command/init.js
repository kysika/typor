import { bootstrapTables, database } from "../../core/database.js";

export default {
	name: "init",
	option: "-c, --config <config>",
	desc: "choose a config file, default is config.js",
	action: async () => {
		await bootstrapTables();
		console.log("init successfully!");
		await database.destroy();
	},
};
