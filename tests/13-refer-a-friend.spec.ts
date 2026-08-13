import { test, expect } from '@playwright/test';
import { login, logout, openMenuItem } from './support/auth';

const BLOCKED =
  'No "Refer a friend" entry point is discoverable anywhere in TEST_EMAIL\'s UI (checked the full ' +
  'hamburger menu, Settings submenu, and the Wallet screen — confirmed live 2026-08-13). The AC-named ' +
  'accounts (mjktest@code.com, mahesh@fonto.com.au) are not TEST_EMAIL and mahesh is currently locked ' +
  'on UAT (see 01-login.spec.ts). May be gated behind a referral-eligibility condition TEST_EMAIL ' +
  "doesn't meet, or a route this account can't reach — needs a working named account to investigate.";

test.describe('UAT SurveyZ : Refer a Friend', () => {
  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('13.1 open Refer a Friend from the Settings menu', async ({ page }) => {
    test.fixme(true, BLOCKED);
    await login(page);
    await openMenuItem(page, 'Refer a friend');
    await expect(page.getByRole('heading', { name: 'Refer a friend' })).toBeVisible();
  });

  test('13.2 refer a friend with an existing referral', async ({ page }) => {
    test.fixme(true, BLOCKED);
    await login(page);
    await openMenuItem(page, 'Refer a friend');
    await expect(page.getByText('1', { exact: true })).toBeVisible();
    await expect(page.getByText('$30.00', { exact: true })).toBeVisible();
  });

  test('13.3 open Refer a Friend from the Wallet screen', async ({ page }) => {
    test.fixme(true, BLOCKED);
    await login(page);
    await openMenuItem(page, 'Wallet');
    await page.waitForURL(/\/dashboard\/wallet/);
    await page.getByText(/refer a friend/i).click();
    await expect(page.getByText('1', { exact: true })).toBeVisible();
    await expect(page.getByText('$30.00', { exact: true })).toBeVisible();
  });
});
