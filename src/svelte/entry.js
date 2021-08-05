import path from "path";
const configpath = path.resolve(process.cwd(), "theme/config.js");

const module = await import(configpath).then((m) => m.default);

const c = module.router.map((route) => {
	return {
		name: route.name,
		component: path.join(path.dirname(configpath), route.component),
		path: route.path,
	};
});

const imports = c.map((item) => `import ${item.name} from "${item.component}";`);

const components = c.map(
	(item) => `<Route>
<${item.name}/>
</Route>`,
);

const app = `
<script>
	import { Link, Route, Router, navigate } from "svelte-routing";
	export let url = "/";
	${imports}
	import { onMount } from "svelte";
	import { useInitURL } from "../src/svelte";
	onMount(() => {
		const url = useInitURL();
		if (url) {
			navigate(url);
		}
	});
</script>

<Router {url}>
	<Link to="/">home</Link>
	<Link to="/article/1">article</Link>
	${components}
</Router>

`;

console.log(app);
