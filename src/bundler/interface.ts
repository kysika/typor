export interface BundleResult {
	js: string;
	css: string;
}

export interface ServerSideRenderResult {
	html: string;
	[x: string]: string;
}

export interface Bundler {
	csr(entry: string): Promise<BundleResult>;
	hydrate(entry: string): Promise<BundleResult>;
	ssr(entry: string, router: string, initData?: Record<string, unknown>): Promise<ServerSideRenderResult>;
}
