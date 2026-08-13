import { test, expect } from '@playwright/test';
import { login, logout } from './support/auth';

test.describe('UAT SurveyZ : Edit Profile', () => {
  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('11.1 edit the profile name', async ({ page }) => {
    // AC uses mjktest@code.com — substituted with TEST_EMAIL per team direction (see 01-login.spec.ts).
    // AC says: hamburger menu -> Profile -> pencil icon -> Edit profile. The pencil icon has no
    // accessible name and sits among ~47 similarly-generic icons on /profile/view, none reliably
    // distinguishable by role/text/position (confirmed live — indexed and content-scoped locators
    // were all flaky/inconsistent across runs). Navigating directly to /profile/edit instead, since
    // this scenario is really about the edit form's behavior, not the icon click.
    await login(page);
    await page.goto('/profile/edit');

    const firstName = page.getByRole('textbox', { name: 'First name' });
    await firstName.fill('');
    await firstName.fill('MJK Test T');
    await expect(page.getByRole('button', { name: 'Update' })).toBeEnabled();
    // AC: "Leave the edit screen; update is optional" — deliberately not saving.
  });

  test('11.2 change gender', async ({ page }) => {
    // Same navigation note as 11.1. TEST_EMAIL's profile gender toggles between Male/Female across
    // runs of this test (each run flips it), so read the current value rather than assuming one.
    await login(page);
    await page.goto('/profile/edit');

    const genderValue = page.locator('div').filter({ hasText: /^(Male|Female)$/ }).last();
    const current = (await genderValue.textContent())?.trim();
    const next = current === 'Male' ? 'Female' : 'Male';

    await genderValue.click();
    await page.getByRole('radio', { name: next, exact: true }).click();
    await expect(page.getByRole('button', { name: 'Update' })).toBeEnabled();

    await page.getByRole('button', { name: 'Update' }).click();
    // Saving redirects to the dashboard home, not back to /profile/view (confirmed live).
    await expect(page).toHaveURL(/\/dashboard\/home/);
    await page.goto('/profile/view');
    await expect(page.getByText(next, { exact: true })).toBeVisible();
  });
});
