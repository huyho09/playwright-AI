import { test, expect } from '@playwright/test';
import { login, logout, openMenuItem } from './support/auth';

async function openChangePassword(page: import('@playwright/test').Page) {
  await openMenuItem(page, 'Settings');
  await page.getByText('Change password', { exact: true }).last().click({ force: true });
  await page.waitForURL(/\/change-password/);
}

test.describe('UAT SurveyZ : Change Password', () => {
  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('10.1 navigate to the change-password screen', async ({ page }) => {
    // AC uses mjktest@code.com — substituted with TEST_EMAIL per team direction (see 01-login.spec.ts).
    // AC also expects a "Security" label in the menu, but live the menu goes straight from
    // Settings to "Change password" with no separate Security item — confirmed 2026-08-13.
    await login(page);
    await openChangePassword(page);

    await page.getByRole('textbox', { name: 'Current Password' }).fill('Password1!');
    await page.getByRole('textbox', { name: 'New Password' }).fill('Password1!');
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('Password1');
    // Deliberately not clicking "Update" — the AC only asks to fill and screenshot the form.
    await page.screenshot({ path: 'test-results/10.1-change-password-form.png' });
  });

  test('10.2 change password — mismatched confirmation shows error', async ({ page }) => {
    await login(page);
    await openChangePassword(page);

    await page.getByRole('textbox', { name: 'Current Password' }).fill('Password1!');
    await page.getByRole('textbox', { name: 'New Password' }).fill('Password1!');
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill('Password1');
    await page.getByRole('textbox', { name: 'Confirm Password' }).blur();

    await expect(page.getByText('Passwords do not match.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Update' })).toBeDisabled();
  });
});
