import { createContext, useContext } from "react";

const globalContext = createContext();

function useGlobalService() {}

export function providerGlobalContext() {
	return {
		Provider: globalContext.Provider,
		value: useGlobalService(),
	};
}

export function injectGlobalContext() {
	return useContext(globalContext);
}
