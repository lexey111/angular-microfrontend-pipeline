import type {PlaywrightTestConfig} from '@playwright/test';
import {devices} from '@playwright/test';

const config: PlaywrightTestConfig = {
	testDir: './src/tests/e2e',
	timeout: 30 * 1000,
	expect: {
		timeout: 5000
	},
	retries: 0,
	reporter: 'html',
	use: {
		actionTimeout: 0,
		trace: 'on-first-retry',
	},

	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},

		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
			},
		},

		{
			name: 'webkit',
			use: {
				...devices['Desktop Safari'],
			},
		},

	],

	webServer: {
		command: 'npm run start',
		port: 8000,
		timeout: 10 * 1000,
		reuseExistingServer: false
	},
};

export default config;
