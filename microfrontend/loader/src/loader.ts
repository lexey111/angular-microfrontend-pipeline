const RESOLVE_TIMEOUT = 5000;

const APPS: any = {}; // list of microfrontend apps
const APP_PATH = 'assets/';

function loadCSS(url: string): void {
	const tag = document.createElement('link');
	tag.setAttribute('rel', 'stylesheet');
	tag.setAttribute('type', 'text/css');
	tag.setAttribute('href', url);

	const fragment = document.createDocumentFragment();
	fragment.appendChild(tag);
	document.getElementsByTagName('head')[0].appendChild(fragment);
}

function loadScript(src: string, onLoad: () => void, onError: () => void): void {
	const tag = document.createElement('script');
	tag.onload = onLoad;
	tag.onerror = onError;
	tag.defer = true;
	tag.setAttribute('src', src);
	const fragment = document.createDocumentFragment();
	fragment.appendChild(tag);
	document.body.appendChild(fragment);
}

function createAppLoader(appId: string): Promise<any> {
	return new Promise((res, rej) => {
		console.log(`Loading "${APP_PATH}${appId}"...`);

		loadCSS(APP_PATH + appId + '.css');

		loadScript(APP_PATH + appId + '.js', () => {
			console.log(`Loaded: "${appId}.js"`);
			res(void 0);
		}, () => {
			Object.keys(APPS[appId].views).forEach((key) => {
				if (APPS[appId].views[key]._resolver) {
					APPS[appId].views[key]._resolver(Promise.reject(new Error(`File "${appId}.js" not found or broken.`)));
				}
			});
			rej(`File "${appId}.js" not found or broken`);
		});
	});
}

export const Loader: IMicrofrontendLoader = {
	mount: (appId: string, viewId: string, containerId: string): Promise<any> => {
		console.log(`Mounting "${appId}/${viewId}" to "${containerId}"`);

		if (typeof APPS[appId] === 'undefined') {
			console.log(`First call, loading "${appId}"...`);
			APPS[appId] = {
				views: {}, _loadPromise: createAppLoader(appId),
			};
		}

		if (typeof APPS[appId].views[viewId]?._promise === 'undefined') {
			console.log(`Pre-registering view ${viewId} of "${appId}"...`);
			APPS[appId].views[viewId] = {};
			APPS[appId].views[viewId]._resolver = null;

			// create (deferred) timeout
			APPS[appId].views[viewId]._promise = new Promise((res, rej) => {
				APPS[appId].views[viewId]._timeout = setTimeout(() => {
					rej(new Error(`Timeout of resolving "${appId}/${viewId}"`));
				}, RESOLVE_TIMEOUT);

				APPS[appId].views[viewId]._resolver = res;
			});
		}

		void APPS[appId].views[viewId]._promise.then(() => {
			console.log(`Rendering "${appId}/${viewId}"...`);
			if (!APPS[appId].views[viewId].render) {
				throw new Error(`No render function defined for "${appId}/${viewId}"`);
			}
			APPS[appId].views[viewId].render(containerId);
		});

		return APPS[appId].views[viewId]._promise;
	},

	unmount(appId: string, viewId: string): void {
		console.log(`Unmounting "${appId}/${viewId}"`);
		if (!APPS[appId]?.views?.[viewId]) {
			throw new Error(`Not found "${appId}/${viewId}" on unmounting`);
		}
		if (APPS[appId].views[viewId].unmount === 'function') {
			APPS[appId].views[viewId].unmount();
		}
	},

	registerView: (appId: string, viewId: string, render: any, unmount: any): void => {
		console.log(`Registering view "${viewId}" of "${appId}"`);
		if (!APPS[appId]) {
			throw new Error(`Application "${appId}" not found!`);
		}
		if (!APPS[appId].views[viewId]) {
			APPS[appId].views[viewId] = {
				_promise: Promise.resolve(void 0),
				_timeout: void 0,
				_resolver: () => void 0,
			};
		}

		APPS[appId].views[viewId].render = render;
		APPS[appId].views[viewId].unmount = unmount;
		clearTimeout(APPS[appId].views[viewId]?._timeout);
		APPS[appId].views[viewId]._resolver(void 0);
	},
};
