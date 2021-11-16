import { bootstrapTables, database } from "../../schema/database.js";

export default {
	name: "init",
	option: [["-c, --config <config>", "choose a config file, default is config.js"], ["--force"]],
	desc: "init this folder into tying-knots project.",
	action: async (option) => {
		await bootstrapTables(option.force);
		console.log("init successfully!");
		await database.destroy();
	},
};
