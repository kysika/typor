import { bootstrapTables, database } from "../../core/database.js";

export default {
	name: "init",
	option: [["-c, --config <config>", "choose a config file, default is config.js"]],
	desc: "init this folder into tying-knots project.",
	action: async () => {
		await bootstrapTables();
		console.log("init successfully!");
		await database.destroy();
	},
};
