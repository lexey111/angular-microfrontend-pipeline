console.log('Microfronted Loader builder');
const path = require('path');

let isProd = true;
if (process?.argv.includes('--development') || process.env?.npm_config_mode === 'development') {
	isProd = false;
}
if (process?.argv.includes('--production') || process.env?.npm_config_mode === 'production') {
	isProd = true;
}
console.log(isProd ? 'Production mode' : 'Development mode');

require('esbuild')
	.build({
		entryPoints: ['./src/index.ts'], outfile: path.resolve('./dist', 'loader.js'), bundle: true, minify: isProd
	})
	.then(result => {
		console.log(`Build is done. Errors: ${result.errors.length}, warnings: ${result.warnings.length}`);
	})
	.catch(result => {
		console.log(`Build failed. Errors: ${result.errors.length}, warnings: ${result.warnings.length}`);
		process.exit(-1);
	});
