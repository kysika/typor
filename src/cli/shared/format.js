/**
 *
 * @param { number } total column total length
 * @param { string } value
 * @returns { [string, string] } space of left and right
 */
export function columnSideSpace(total, value) {
	const rest = total - String(value).length;
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
export function line(length, split) {
	return Array.from({ length }).fill(split).join("");
}
