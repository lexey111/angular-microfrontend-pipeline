module.exports = {
	verbose: true,
	transform: {
		'^.+\\.(t|j)sx?$': 'ts-jest'
	},
	testEnvironment: 'jsdom',
	globals: {
		APPID: 'app-users' // declare const APPID: string;
	}
}
