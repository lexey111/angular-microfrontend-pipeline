// Template file,
// should be somehow propagated to each app-* micro-application source
// preferably via symlink

import {createRoot} from 'react-dom/client';

declare const APPID: string; // esbuild DEFINE = name of application folder
console.log('Registering:', APPID);

const {loader} = window.Microfrontend;

export class CApp {
	private readonly appId: string = APPID;
	private readonly viewId: string = '';
	private readonly component: JSX.Element | undefined = void 0
	private root: any;

	constructor(viewId: string, component: JSX.Element) {
		this.viewId = viewId;
		this.component = component;

		void this.registerView();
	}

	private readonly render = (elementId: string): void => {
		const element = document.getElementById(elementId);
		if (!element) {
			return;
		}
		// create container div
		const target = document.createElement('div');
		target.setAttribute('id', '_microfront_container');
		element.insertBefore(target, element.firstChild);
		this.root = createRoot(target)
		this.root.render(this.component!);
	}

	private readonly unmount = (): void => {
		if (this.root) {
			this.root.unmount();
		}
	}

	private readonly registerView = (): void => {
		loader.registerView(this.appId, this.viewId, this.render, this.unmount);
	}
}
