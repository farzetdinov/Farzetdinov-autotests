import { test, expect } from '@playwright/test';

test.describe('Basic UI tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Test 1 - Page title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: /the-internet/i })
    ).toBeVisible();
  });

  test('Test 2 - Navigation to Login page', async ({ page }) => {
    await page.getByRole('link', { name: /Form Authentication/i }).click();

    await expect(page).toHaveURL(/\/login/);
    await expect(
      page.getByRole('heading', { name: /Login Page/i })
    ).toBeVisible();
  });

  test('Test 3 - Successful login', async ({ page }) => {
    await page.goto('/login');

    await page.getByLabel('Username').fill('tomsmith');
    await page.getByLabel('Password').fill('SuperSecretPassword!');
    await page.getByRole('button', { name: 'Login' }).click();

    const successMessage = page.locator('#flash');

    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText(
      'You logged into a secure area!'
    );
  });

});
