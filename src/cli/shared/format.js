import sw from "string-width";
/**
 *
 * @param { number } total column total length
 * @param { string } value
 * @returns { [string, string] } space of left and right
 */
function columnSideSpace(total, value) {
	const rest = total - sw(String(value));
	const symmetric = rest % 2 === 0;
	const length = (symmetric ? rest : rest + 1) / 2;
	const base = Array.from({ length }).fill(" ").join("");
	return [symmetric ? base : base.slice(0, -1), base];
}

/**
 *
 * @param { number } length
 * @param { string } split
 * @returns
 */
function filledWith(length, split) {
	return Array.from({ length }).fill(split).join("");
}

/**
 *
 * @param {number} width
 * @param {string} value
 * @returns
 */
function center(width, value) {
	const [left, right] = columnSideSpace(width, value);
	return `${left}${value}${right}`;
}

/**
 *
 * @typedef {({direction: 'left' | 'right' ; indent: number; width: number; value: string})} TextAlignOption
 * @param { TextAlignOption } option
 */
function textAlign(option) {
	const { value = "", indent = 0, direction = "left" } = option;
	const width = option.width || value.length;
	const space = filledWith(width - value.length - indent, " ");
	const indentSpace = filledWith(indent, " ");
	return direction === "right" ? `${space}${value}${indentSpace}` : `${indentSpace}${value}${space}`;
}

/**
 *
 * @param {string} value
 * @param {number} indent
 * @returns
 */
function right(width, value, indent) {
	return textAlign({ direction: "right", width, value, indent });
}

/**
 *
 * @param {string} value
 * @param {number} indent
 * @returns
 */
function left(width, value, indent) {
	return textAlign({ direction: "left", width, value, indent });
}

export const formatter = Object.freeze({
	left,
	right,
	center,
	filledWith,
});
