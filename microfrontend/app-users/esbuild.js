const path = require('path');
const appName = path.basename(__dirname);

console.log(`Microfronted Apps builder: ${appName}`);

let isProd = true;
if (process?.argv.includes('--development') || process.env?.npm_config_mode === 'development') {
	isProd = false;
}
if (process?.argv.includes('--production') || process.env?.npm_config_mode === 'production') {
	isProd = true;
}
console.log(isProd ? 'Production mode' : 'Development mode');

const sassPlugin = require('esbuild-sass-plugin').sassPlugin;
const {externalGlobalPlugin} = require('esbuild-plugin-external-global');

require('esbuild')
	.build({
		entryPoints: ['./src/index.tsx'],
		outfile: path.resolve('./dist', appName + '.js'),
		define: {
			APPID: JSON.stringify(appName) // used in source as "declare const APPID"
		},
		bundle: true,
		minify: isProd,
		plugins: [sassPlugin(), externalGlobalPlugin({
			'react': 'window.React', 'react-dom': 'window.ReactDOM',
		})]
	})
	.then(result => {
		console.log(`Build (${appName}) is done. Errors: ${result.errors.length}, warnings: ${result.warnings.length}`);
	})
	.catch(result => {
		console.log(`Build (${appName}) failed. Errors: ${result.errors.length}, warnings: ${result.warnings.length}`);
		process.exit(-1);
	});
