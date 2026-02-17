import { test } from '@playwright/test';
import { login, expectFlashContains } from './helpers';

test.describe('Data-driven tests', () => {
  const cases = [
    {
      name: 'Valid credentials',
      username: 'tomsmith',
      password: 'SuperSecretPassword!',
      expected: 'You logged into a secure area!',
      success: true,
    },
    {
      name: 'Invalid password',
      username: 'tomsmith',
      password: 'WrongPassword',
      expected: 'Your password is invalid!',
      success: false,
    },
    {
      name: 'Invalid username',
      username: 'wronguser',
      password: 'SuperSecretPassword!',
      expected: 'Your username is invalid!',
      success: false,
    },
  ];

  for (const c of cases) {
    test(`Login - ${c.name}`, async ({ page }) => {
      await login(page, c.username, c.password);
      await expectFlashContains(page, c.expected);

      // if (c.success) { assert Logout button visible }
    });
  }
});
