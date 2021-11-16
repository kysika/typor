/** @typedef {  Record<string, (service: typeof import('../src/core/services/index').service) => Record<string, unknown> Schema}   */

/**
 * @type { Schema }
 */
export const BlogSchema = {
	"/": (service) => {},
	"/:page": () => {},
	"/article/:title": () => {},
};

export const BlogDomainObject = {};
