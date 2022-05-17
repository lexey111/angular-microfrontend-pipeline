const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');

const {Compilation, sources: {RawSource}} = require('webpack');

const base = path.resolve(__dirname); // folder of this file, 'microfrontend'

console.log('Base folder', path.resolve(base));

if (!fs.existsSync(path.join(base, 'loader'))) {
	throw new Error(`Base folder ${base} does not include "loader"!`);
}

function readableFileSize(size) {
	const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let i = 0;
	while (size >= 1024) {
		size /= 1024;
		++i;
	}
	return size.toFixed(1) + ' ' + units[i];
}

function getMicrofrontendProjects() {
	return fs.readdirSync(base, {withFileTypes: true})
		.filter(dirent => dirent.isDirectory())
		.filter(dirent => fs.existsSync(path.resolve(base, dirent.name, 'package.json')))
		.map(dirent => dirent.name)
}

function MicrofrontendCompiler(isDevelopment, isWatch) {
	const entries = getMicrofrontendProjects();
	console.log('Entries:', entries.join(', '));
	console.log();

	return {
		apply: (compiler) => {
			compiler.hooks.thisCompilation.tap('MicrofrontendCompilator', (compilation) => {
				compilation.hooks.processAssets.tapPromise({
					name: 'MicrofrontendCompilator',
					stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
				}, async () => {
					console.log();
					console.log(`Microfrontend: build [${entries.length}] projects...`);
					console.time('Microfrontend build time');
					console.log();

					let buildLog = '';
					let assetsSize = 0;
					let i = 1;
					entries.forEach(folder => {
						if (i >1) {
							buildLog += '\n';
						}
						buildLog += `${(i++ + '.').padStart(4)} [${folder}]\n`;
						try {
							execSync(`npm run ${isDevelopment || isWatch ? 'dev' : 'build'}`, {
								cwd: path.resolve(base, folder),
								stdio: ['inherit', 'pipe', 'inherit'] // stdio: 'inherit' to see console output
							});

							fs.readdirSync(path.resolve(base, folder, 'dist'))
								.forEach(file => {
									const content = fs.readFileSync(path.resolve(base, folder, 'dist', file));
									const fileName = path.basename(file);

									compilation.emitAsset(path.join('assets', fileName), new RawSource(content));

									buildLog += `     ${file.padEnd(28)} ${readableFileSize(content.length)}\n`;
									assetsSize += content.length;
								});

						} catch (err) {
							console.log();
							console.log('STOP');
							console.log(`Error on building "${folder}"!`);
							console.log();

							process.exit(-2);
						}
					});
					console.log(buildLog);
					console.log('Total:', readableFileSize(assetsSize));
					console.timeEnd('Microfrontend build time');
					console.log();
				});
			});
		}
	}
}

module.exports = MicrofrontendCompiler;
