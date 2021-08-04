import chalk from "chalk";

function text(...args) {
	return console.log(chalk.bgHex("#05111b").hex("#fff")(...args));
}

function primary(...args) {
	return console.log(chalk.bgHex("#05111b").hex("#f8db42")(...args));
}

function accent(...args) {
	return console.log(chalk.bgHex("#05111b").hex("#d75d37")(...args));
}

function error(...args) {
	return console.log(chalk.bgHex("#05111b").hex("#af1f21")(...args));
}

export const renderer = Object.freeze({
	text,
	primary,
	accent,
	error,
});
