const path = require('path');
const appName = path.basename(__dirname);

console.log(`Microfronted Apps e2e Runner: ${appName}`);

const sassPlugin = require('esbuild-sass-plugin').sassPlugin;

require('esbuild')
	.serve({
			servedir: './dist',
			port: 8000
		},
		{
			entryPoints: ['./src/tests/e2e/index.e2e.tsx', './src/tests/e2e/index.html'],
			outdir: path.resolve('./dist'),
			assetNames: '[name]',
			loader: {
				'.html': 'file'
			},
			define: {
				APPID: JSON.stringify(appName) // used in source as "declare const APPID"
			},
			bundle: true,
			minify: false,
			plugins: [sassPlugin()]
		})
	.then(result => {
		const {host, port} = result;
		console.log(`Serve: http://${host}:${port}/index.html`);
	})
	.catch(result => {
		console.log(`Build (${appName}) failed. Errors: ${result.errors.length}, warnings: ${result.warnings.length}`);
		process.exit(-1);
	});
