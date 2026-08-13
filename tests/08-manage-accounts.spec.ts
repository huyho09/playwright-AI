import { test, expect } from '@playwright/test';
import { login, logout, openMenuItem } from './support/auth';

const TYPE_SHEET_BLOCKED =
  '"Add account" only shows the Bank/Super/Share trading/Property/Other-assets type-selector sheet ' +
  'when the account already has at least one linked account (confirmed live) — for a zero-account user ' +
  'it skips straight to the bank-linking explainer. os@gm.co (which has existing accounts) is currently ' +
  'locked on UAT (see 01-login.spec.ts), so the type sheet itself cannot be reached with TEST_EMAIL.';

const BANK_FLOW_DIVERGED =
  'The live bank-linking flow (even when reached) goes through a real Mastercard Open Banking Sandbox ' +
  'consent dialog (iframe) before any username/password step — it no longer matches the AC\'s simpler ' +
  '"enter username 12345678 / password TestMyMoney" description. Confirmed live 2026-08-13; needs a ' +
  'rewrite against the actual Mastercard sandbox flow, and ideally re-verifying with a linked account ' +
  '(os@gm.co) rather than a fresh zero-account signup.';

test.describe('UAT SurveyZ : Manage Accounts', () => {
  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('8.1 open Manage Accounts from the hamburger menu', async ({ page }) => {
    test.fixme(true, TYPE_SHEET_BLOCKED);
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await expect(page.getByText('Bank', { exact: true })).toBeVisible();
    await expect(page.getByText('Super', { exact: true })).toBeVisible();
    await page.getByText('Bank', { exact: true }).click();
  });

  test('8.2 Manage Accounts tab shows Add account', async ({ page }) => {
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.waitForURL(/\/manage-accounts/);
    await expect(page.getByRole('button', { name: 'Add account' })).toBeVisible();
  });

  test('8.3 add account — Bank type', async ({ page }) => {
    test.fixme(true, TYPE_SHEET_BLOCKED);
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await expect(page.getByText('Bank', { exact: true })).toBeVisible();
    await page.getByText('Bank', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Bank' })).toBeVisible();
  });

  test('8.4 add account — Super type', async ({ page }) => {
    test.fixme(true, TYPE_SHEET_BLOCKED);
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await expect(page.getByText('Bank', { exact: true })).toBeVisible();
    await expect(page.getByText('Super', { exact: true })).toBeVisible();
    await page.getByText('Super', { exact: true }).click();
    await expect(page.getByText('Select your super fund')).toBeVisible();
  });

  test('8.5 add account — Share trading type', async ({ page }) => {
    test.fixme(true, TYPE_SHEET_BLOCKED);
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await expect(page.getByText('Share trading')).toBeVisible();
    await page.getByText('Share trading').click();
    await expect(page.getByRole('heading', { name: 'Share trading' })).toBeVisible();
  });

  test('8.6 add account — Property type', async ({ page }) => {
    test.fixme(true, TYPE_SHEET_BLOCKED);
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await expect(page.getByText('Property', { exact: true })).toBeVisible();
    await page.getByText('Property', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Property' })).toBeVisible();
  });

  test('8.7 add account — Other assets type', async ({ page }) => {
    test.fixme(true, TYPE_SHEET_BLOCKED);
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await expect(page.getByText('Add other assets')).toBeVisible();
    await page.getByText('Add other assets').click();
    await expect(page.getByRole('heading', { name: 'Add other assets' })).toBeVisible();
  });

  test('8.8 add a bank account — happy path', async ({ page }) => {
    test.fixme(true, BANK_FLOW_DIVERGED);
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await page.getByText('Bank', { exact: true }).click();
    await page.getByRole('textbox', { name: /search/i }).fill('bank of s');
    await page.getByText('bank of statements').click();
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('textbox', { name: /username/i }).fill('12345678');
    await page.getByRole('textbox', { name: /password/i }).fill('TestMyMoney');
    await page.getByRole('button', { name: /submit/i }).click();
  });

  test('8.9 add a bank account — wrong credentials shows error', async ({ page }) => {
    test.fixme(true, BANK_FLOW_DIVERGED);
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await page.getByText('Bank', { exact: true }).click();
    await page.getByRole('textbox', { name: /search/i }).fill('bank of s');
    await page.getByText('bank of statements').click();
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('textbox', { name: /username/i }).fill('12345678');
    await page.getByRole('textbox', { name: /password/i }).fill('password');
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText('Oops, something went wrong')).toBeVisible();
  });

  test('8.10 add and delete an "other asset"', async ({ page }) => {
    test.fixme(
      true,
      TYPE_SHEET_BLOCKED + ' The AC also names bio2@test.com specifically for this case, which was not ' +
        'attempted (avoiding further named-account login attempts after the mahesh/os@gm.co/cyprest1 lockouts).'
    );
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await page.getByText('Add other assets').click();
    await page.getByRole('textbox', { name: /asset name/i }).fill('car');
    await page.getByRole('textbox', { name: /value/i }).fill('2000');
    await page.getByRole('button', { name: /save/i }).click();
    await page.getByRole('button', { name: /close/i }).click();

    await openMenuItem(page, 'Manage Accounts');
    await page.getByText('car').click();
    await page.getByRole('button', { name: /delete/i }).click();
  });

  test('8.11 add an MFA bank account — Westpac', async ({ page }) => {
    test.fixme(true, TYPE_SHEET_BLOCKED + ' ' + BANK_FLOW_DIVERGED);
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await page.getByText('Bank', { exact: true }).click();
    await page.getByRole('textbox', { name: /search/i }).fill('bank of m');
    await page.getByText('bank of mfa').click();
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('textbox', { name: /username/i }).fill('westpac');
    await page.getByRole('textbox', { name: /password/i }).fill('westpac');
    await page.getByRole('button', { name: /submit/i }).click();
    await page.getByRole('radio').first().click();
    await page.getByRole('button', { name: /continue/i }).click();
  });

  test('8.12 add an MFA bank account — CBA', async ({ page }) => {
    test.fixme(true, TYPE_SHEET_BLOCKED + ' ' + BANK_FLOW_DIVERGED);
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.getByRole('button', { name: 'Add account' }).click();
    await page.getByText('Bank', { exact: true }).click();
    await page.getByRole('textbox', { name: /search/i }).fill('bank of m');
    await page.getByText('bank of mfa').click();
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('textbox', { name: /username/i }).fill('cba');
    await page.getByRole('textbox', { name: /password/i }).fill('cba');
    await page.getByRole('button', { name: /submit/i }).click();
    await page.getByRole('textbox', { name: /code/i }).fill('123456');
    await page.getByRole('button', { name: /continue/i }).click();
  });

  test('8.13 view an already-added account', async ({ page }) => {
    test.fixme(
      true,
      'TEST_EMAIL has zero linked accounts, so there is nothing in the account list to open. ' +
        TYPE_SHEET_BLOCKED
    );
    await login(page);
    await openMenuItem(page, 'Manage Accounts');
    await page.waitForURL(/\/manage-accounts/);
    await page.locator('[data-testid="account-list-item"]').first().click();
  });
});
