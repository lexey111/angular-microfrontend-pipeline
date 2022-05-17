import {expect, test} from '@playwright/test';

const testUrl = 'http://localhost:8000/index.html';

test.describe('app-users', () => {
	test.beforeEach(async ({page}) => {
		await page.goto(testUrl);
	})

	test('should include View Users', async ({page}) => {
		const container = page.locator('._m_view_users');
		await expect(container).toBeTruthy();
	});

	test('should fetch and render 100 cards', async ({page}) => {
		await page.waitForTimeout(3000);
		const cards = await page.locator('.user-card').count();
		expect(cards).toBe(100);
	});
});
