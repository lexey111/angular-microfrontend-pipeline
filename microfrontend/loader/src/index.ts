import {Loader} from './loader';

console.log('Microfrontend Loader is ready');

window.Microfrontend = {
	loader: Loader
}

export {}; // to make a module for esbuild
