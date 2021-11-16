#! /usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import { version } from "./shared/version.js";
import path from "path";

const program = new Command();

program.version(version);

const commandFolder = "commands";

const url = new URL(commandFolder, import.meta.url);

const files = await fs.readdir(url.pathname);

const commands = await Promise.all(files.map((file) => import(path.resolve(url.pathname, file)).then((module) => module.default)));

commands.forEach(register);

program.parse(process.argv);

function register({ name, option, action, desc }) {
	const self = program.command(name);
	const options = Array.isArray(option) ? option : [];
	options.forEach((item) => Array.isArray(item) && self.option(...item));
	self.description(desc || "").action(action);
}
