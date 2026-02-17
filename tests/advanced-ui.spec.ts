import { test, expect } from '@playwright/test';

test.describe('Advanced UI interactions', () => {
  test('Checkboxes - check and uncheck', async ({ page }) => {
    await page.goto('/checkboxes', { waitUntil: 'domcontentloaded' });

    const checkboxes = page.locator('input[type="checkbox"]');
    await expect(checkboxes).toHaveCount(2);

    // pick first checkbox and ensure it becomes checked
    const first = checkboxes.nth(0);
    await first.check();
    await expect(first).toBeChecked();

    // pick second checkbox and ensure it becomes unchecked
    const second = checkboxes.nth(1);
    await second.uncheck();
    await expect(second).not.toBeChecked();
  });

  test('Dropdown - select option', async ({ page }) => {
    await page.goto('/dropdown', { waitUntil: 'domcontentloaded' });

    const dropdown = page.locator('#dropdown');

    // select by value '2' and assert selected option text
    await dropdown.selectOption('2');
    await expect(dropdown).toHaveValue('2');
  });

  test('Modal - open and close entry ad', async ({ page }) => {
    await page.goto('/entry_ad', { waitUntil: 'domcontentloaded' });

    // Entry Ad modal may appear with delay, assert and close if visible.
    const modal = page.locator('.modal');
    const closeBtn = page.locator('.modal .modal-footer p');

    await expect(modal).toBeVisible();
    await closeBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('File upload - upload a file and verify success', async ({ page }) => {
    await page.goto('/upload', { waitUntil: 'domcontentloaded' });

    // create a tiny temp file and point to it here:
    const filePath = 'tests/fixtures/hello.txt';

    await page.locator('#file-upload').setInputFiles(filePath);
    await page.getByRole('button', { name: 'Upload' }).click();

    await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
    // assert uploaded file name appears on page
    await expect(page.locator('#uploaded-files')).toContainText('hello.txt');
  });

  test('File download - download a file and verify it exists', async ({ page }) => {
    await page.goto('/download', { waitUntil: 'domcontentloaded' });

    // Choose any file link on the page
    const firstFileLink = page.locator('#content a').first();

    const downloadPromise = page.waitForEvent('download');
    await firstFileLink.click();
    const download = await downloadPromise;

    // Save to a deterministic path inside test-results
    const path = await download.path();
    // minimal assertion that download happened
    expect(path).toBeTruthy();
  });
});
