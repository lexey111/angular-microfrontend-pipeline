const path = require('path');
const fs = require('fs');
const glob = require('glob');

const base = path.resolve(__dirname); // folder of this file, 'microfrontend'

function collectFiles() {
	return glob.sync(path.join(base, '**/src/**/*'), {absolute: true})
		.filter(file => {
			// example: filtering. Remove tests from watching
			if (fs.lstatSync(file).isDirectory()) {
				return false;
			}
			if (file.indexOf('test.ts') !== -1) {
				return false;
			}
			return true;
		})
		.map(file => path.resolve(file));
}

function MicrofrontendWatcher() {
	console.log();

	const filesToWatch = collectFiles();
	if (filesToWatch.length === 0) {
		throw new Error('Nothing to watch!');
	}
	console.log('Files to watch:', filesToWatch.length);

	return {
		apply: (compiler) => {
			compiler.hooks.thisCompilation.tap('MicrofrontendWatcher', (compilation) => {
				if (Array.isArray(compilation.fileDependencies)) {
					filesToWatch.forEach(file => compilation.fileDependencies.push(file));
				} else {
					filesToWatch.forEach(file => compilation.fileDependencies.add(file));
				}
			});
		}
	}
}

module.exports = MicrofrontendWatcher;
