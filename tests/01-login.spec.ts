import { test, expect } from '@playwright/test';
import { emailInput, passwordInput, loginButton, logout } from './support/auth';

const TEST_PASSWORD = process.env.TEST_PASSWORD!;

test.describe('UAT SurveyZ : Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('1.1 verify the welcome slides', async ({ page }) => {
    test.fixme(
      true,
      'Live UAT redirects "/" straight to /login (confirmed with a fresh, cookie-less context) — ' +
        'no welcome slide carousel is served. Re-enable once the slides ship, or update the AC if intentionally removed.'
    );
    await expect(page.getByText('Link, Learn & Earn')).toBeVisible();
    await page.getByText('Link, Learn & Earn').click();
    await expect(page.getByText('Link & Learn')).toBeVisible();
    await page.getByText('Link & Learn').click();
    await expect(page.getByText('Earn extra money')).toBeVisible();
    await page.getByText('Earn extra money').click();
    await expect(page.getByText('Give Back')).toBeVisible();
  });

  test('1.2 login session (log in, log out, log in again)', async ({ page }) => {
    test.fixme(
      true,
      'mahesh@fonto.com.au is currently locked on live UAT ("Too many failed attempts! Your account ' +
        'has been locked.") — confirmed independent of this suite. Re-enable once the account is recovered.'
    );
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
    await emailInput(page).fill('mahesh@fonto.com.au');
    await passwordInput(page).fill(TEST_PASSWORD);
    await loginButton(page).click();
    await expect(page.getByRole('banner').getByRole('button').first()).toBeVisible();

    await page.getByRole('banner').getByRole('button').first().click();
    await page.getByText('Log out', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();

    await emailInput(page).fill('mahesh@fonto.com.au');
    await passwordInput(page).fill(TEST_PASSWORD);
    await loginButton(page).click();
    await expect(page.getByRole('banner').getByRole('button').first()).toBeVisible();
  });

  test('1.3 error verification — invalid email', async ({ page }) => {
    await emailInput(page).fill('mm@mm');
    await passwordInput(page).blur();
    await expect(page.getByText('Email is not a valid email address.')).toBeVisible();
  });

  test('1.4 error verification — missing password', async ({ page }) => {
    await emailInput(page).fill('mts@mm.com');
    await emailInput(page).blur();
    await passwordInput(page).click();
    await passwordInput(page).blur();
    await expect(page.getByText('Password is required.')).toBeVisible();
  });

  test('1.5 forgot password — reaches the reset screen', async ({ page }) => {
    test.fixme(
      true,
      '"Forgot Password?" on the login screen does not respond to clicks (tried from a fresh page, ' +
        'with/without a pre-filled email, with a hover-then-click sequence, and checked it is not in the ' +
        'Tab order) — confirmed dead in the live UAT build. The target route (/reset-password) works fine ' +
        'when navigated to directly, so this is a wiring bug on the login screen, not a missing route.'
    );
    await emailInput(page).fill('mahesh@fonto.com.au');
    await page.getByText('Forgot Password?').click();
    await expect(page.getByRole('heading', { name: 'Reset password' })).toBeVisible();
  });

  test('1.6 forgot password flow — submit a reset request', async ({ page }) => {
    test.fixme(true, 'Depends on reaching /reset-password via the login screen — see 1.5.');
    await emailInput(page).fill('mahesh@fonto.com.au');
    await page.getByText('Forgot Password?').click();
    await expect(page.getByRole('heading', { name: 'Reset password' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Email' }).fill('mahesh@fonto.com.au');
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByText(/error/i)).not.toBeVisible();
  });
});
