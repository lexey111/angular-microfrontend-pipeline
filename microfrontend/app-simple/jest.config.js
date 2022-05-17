module.exports = {
	verbose: true,
	transform: {
		'^.+\\.(t|j)sx?$': 'ts-jest'
	},
	testEnvironment: 'jsdom',
	globals: {
		APPID: 'simple-one' // declare const APPID: string;
	}
}
