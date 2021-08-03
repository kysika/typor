#! /usr/bin/env node

// TODO theme dev
// init
// server

import { Command } from "commander";
import fs from "fs-extra";
import { version } from "./shared/version.js";

const cli = new Command();

cli.version(version);

const url = new URL("./command", import.meta.url);
const files = await fs.readdir(url.pathname);

const configs = await Promise.all(files.map((file) => import(`./command/${file}`).then((module) => module.default)));

for (const { name, option, action, desc } of configs) {
	const self = cli.command(name);
	if (option) {
		self.option(option);
	}
	self.description(desc || "").action(action);
}

cli.parse(process.argv);
