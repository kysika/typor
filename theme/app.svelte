<script>
	import { Link, Route, Router, navigate } from "svelte-routing";
	export let url = "/";
	import Home from "./pages/home.svelte";
	import Article from "./pages/article.svelte";
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
	<Route path="/">
		<Home />
	</Route>

	<Route let:params path="/article/:id">
		<Article id={params.id} />
	</Route>
</Router>
