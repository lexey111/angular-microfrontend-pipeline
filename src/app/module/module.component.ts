import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';

let loader: IMicrofrontendLoader;
let id = 1;

@Component({
	selector: 'app-module',
	templateUrl: './module.component.html',
	styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements AfterViewInit, OnDestroy {
	@Input()
	delay: number = 0;
	@Input()
	app: string;
	@Input()
	view: string;
	public loading = true;
	public error = '';
	public loaded = false;
	public readonly containerId = '_module_' + id++;
	private destroying = false;

	constructor() {

		this.app = '';
		this.view = '';

		loader = window?.Microfrontend?.loader;
		if (!loader) {
			this.loading = false;
			this.error = 'No loader available. Please check if microfrontend loaded.';
			return;
		}
	}

	ngOnDestroy(): void {
		this.destroying = true;
		if (loader && this.loaded) {
			loader?.unmount(this.app, this.view);
		}
	}

	ngAfterViewInit(): void {
		this.loadModule();
	}

	private loadModule = () => {
		if (!loader) {
			console.error('No loader available.');
			return;
		}

		console.log(`Loading module: "${this.app}/${this.view}"`);

		// add a little delay, just to pretend some work is done
		setTimeout(() => {
			loader?.mount(this.app, this.view, this.containerId)
				.then(v => {
					console.log(`Mounted: "${this.app}/${this.view}".`);
					this.loading = false;
					this.loaded = true;
					return v;
				})
				.catch(err => {
					if (this.destroying) {
						return;
					}
					this.loading = false;
					this.loaded = false;
					this.error = err.toString() || 'Error on loading';
					return void 0;
				});
		}, 1 + this.delay);
	}
}
