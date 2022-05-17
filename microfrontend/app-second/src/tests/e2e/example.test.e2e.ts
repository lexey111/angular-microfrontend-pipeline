import {expect, test} from '@playwright/test';

const testUrl = 'http://localhost:8000/index.html';

test.describe('app-second', () => {
	test.beforeEach(async ({page}) => {
		await page.goto(testUrl);
	})

	test('should include View Text', async ({page}) => {
		const title = page.locator('h3');
		await expect(title).toHaveText('Wise words');
	});
});
