// have to be in separate shared @types/ package
interface IMicrofrontendLoader {
	mount: (appId: string, viewId: string, containerId: string) => Promise<any>;
	unmount: (appId: string, viewId: string) => void;
	registerView: (appId: string, viewId: string, render: any, unmount: any) => void;
}

interface Window {
	Microfrontend: {
		loader: IMicrofrontendLoader
	}
}
