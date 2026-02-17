import { expect, type Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

export async function expectFlashContains(page: Page, text: string) {
  const flash = page.locator('#flash');
  await expect(flash).toBeVisible();
  await expect(flash).toContainText(text);
}
