import { color } from "./color.js";

function text(...args) {
	return console.log(color.bg(color.text(...args)));
}

function primary(...args) {
	return console.log(color.bg(color.primary(...args)));
}

function accent(...args) {
	return console.log(color.bg(color.accent(...args)));
}

function error(...args) {
	return console.log(color.bg(color.error(...args)));
}

export const renderer = Object.freeze({
	text,
	primary,
	accent,
	error,
});
