module.exports = {
	verbose: true,
	transform: {
		'^.+\\.(t|j)sx?$': 'ts-jest'
	},
	testEnvironment: 'jsdom',
	globals: {
		APPID: 'app-second' // declare const APPID: string;
	}
}
