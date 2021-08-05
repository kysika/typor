import chalk from "chalk";

function text(...args) {
	return chalk.hex("#fff")(...args);
}

function primary(...args) {
	return chalk.hex("#f8db42")(...args);
}

function accent(...args) {
	return chalk.hex("#d75d37")(...args);
}

function error(...args) {
	return chalk.hex("#af1f21")(...args);
}

function bg(...args) {
	return chalk.bgHex("#05111b")(...args);
}

export const color = Object.freeze({
	text,
	primary,
	accent,
	error,
	bg,
});
