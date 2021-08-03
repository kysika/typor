import chalk from "chalk";

function text(...args) {
	return console.log(chalk.hex("#05111b")(...args));
}

function primary(...args) {
	return console.log(chalk.hex("#f8db42")(...args));
}

function accent(...args) {
	return console.log(chalk.hex("#d75d37")(...args));
}

export const renderer = Object.freeze({
	text,
	primary,
	accent,
});
