import {expect, test} from '@playwright/test';

const testUrl = 'http://localhost:8000/index.html';

test.describe('app-simple', () => {
	test.beforeEach(async ({page}) => {
		await page.goto(testUrl);
	})

	test('should include View One', async ({page}) => {
		const title = page.locator('h2#title_1');
		await expect(title).toHaveText('View One');
	});

	test('should include View Two', async ({page}) => {
		const title = page.locator('h2#title_2');
		await expect(title).toHaveText('View Twon');
	});
});
