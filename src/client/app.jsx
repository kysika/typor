import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { providerGlobalContext } from "./hooks/use-global-context";
import { Layout } from "./layouts";
import { theme } from "./theme";

export function App() {
	const { Provider, value } = providerGlobalContext();
	return (
		<ThemeProvider theme={theme}>
			<Provider value={value}>
				<Layout>hello wrold</Layout>
			</Provider>
		</ThemeProvider>
	);
}
