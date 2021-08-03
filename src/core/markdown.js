import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import container from "markdown-it-container";
import toc from "markdown-it-table-of-contents";

/**
 *  render the given markdown resource.
 * @param {string} resource
 * @param { Array<Function> } plugins
 */
export function markdown(resource, plugins = []) {
	function slugify(s) {
		return encodeURIComponent(String(s)).trim().toLowerCase().replace(/\s+/g, "-");
	}
	const level = [1, 2, 3];
	const md = new MarkdownIt();
	// todo  read plugins and use it
	md.use(anchor, { slugify, level }).use(container).use(toc, { slugify, includeLevel: level });
	// plugins.forEach(md.use.bind(md));
	return md.render(resource);
}
