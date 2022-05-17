console.log('');
console.log('');
console.log('BUILDER EXTENSION');

const MicrofrontendCompiler = require("./microfrontend-plugin-compilation");
const MicrofrontendWatcher = require("./microfrontend-plugin-watch");

module.exports = (config) => {
	const isDevelopment = config.mode === 'development' ;
	const isWatch = Boolean(config.watch);

	console.log(`${isDevelopment ? 'Development' : 'Production'} mode | ${isWatch ? 'watch' : 'build'}`);
	config.plugins.push(new MicrofrontendCompiler(isDevelopment, isWatch));

	if (isWatch) {
		config.plugins.push(new MicrofrontendWatcher());
	}

	return config;
}
