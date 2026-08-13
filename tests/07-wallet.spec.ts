import { test, expect } from '@playwright/test';
import { login, logout, openMenuItem } from './support/auth';

const NAMED_ACCOUNT_BLOCKED =
  'Requires os@gm.co for this specific state (multiple transactions / a visible Refer-a-Friend entry ' +
  'point from the wallet). os@gm.co is currently locked on UAT (see 01-login.spec.ts); TEST_EMAIL has ' +
  'only a single transaction and no Refer-a-Friend entry point visible from its Wallet screen.';

test.describe('UAT SurveyZ : Wallet', () => {
  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('7.1 open the Wallet tab', async ({ page }) => {
    await login(page);
    await openMenuItem(page, 'Wallet');
    await page.waitForURL(/\/dashboard\/wallet/);
    await expect(page.getByText('Your balance', { exact: true })).toBeVisible();
  });

  test('7.2 wallet — open balance history', async ({ page }) => {
    await login(page);
    await openMenuItem(page, 'Wallet');
    await page.waitForURL(/\/dashboard\/wallet/);
    await page.getByText('View history').click();
    await page.waitForURL(/\/balance-history/);
    await expect(page.getByText('Balance history')).toBeVisible();
    await expect(page.getByText('Past transactions')).toBeVisible();
  });

  test('7.3 wallet — balance history with multiple transactions', async ({ page }) => {
    test.fixme(true, NAMED_ACCOUNT_BLOCKED);
    await login(page);
    await openMenuItem(page, 'Wallet');
    await page.waitForURL(/\/dashboard\/wallet/);
    await page.getByText('View history').click();
    await page.waitForURL(/\/balance-history/);
    await expect(page.getByText('Balance history')).toBeVisible();
    await expect(page.getByText('Past transactions')).toBeVisible();
  });

  test('7.4 wallet — open Refer a Friend entry point', async ({ page }) => {
    test.fixme(true, NAMED_ACCOUNT_BLOCKED);
    await login(page);
    await openMenuItem(page, 'Wallet');
    await page.waitForURL(/\/dashboard\/wallet/);
    await page.getByText(/refer a friend/i).click();
    await expect(page.getByText('Refer a friend')).toBeVisible();
  });
});
