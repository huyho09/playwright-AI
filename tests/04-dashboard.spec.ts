import { test, expect } from '@playwright/test';
import { login, logout, openMenuItem } from './support/auth';

const LINKED_ACCOUNT_BLOCKED =
  'Requires a linked financial account (os@gm.co / mahesh@fonto.com.au) to render this widget at all — ' +
  'TEST_EMAIL (huytest2@yopmail.com) has no linked accounts, and the named fixture accounts are currently ' +
  'locked on UAT (see 01-login.spec.ts). Re-enable once a working linked test account is available.';

test.describe('UAT SurveyZ : Dashboard', () => {
  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('4.1 promotions — scroll to and check contents', async ({ page }) => {
    await login(page);
    await openMenuItem(page, 'Promotions');
    await page.waitForURL(/\/dashboard\/promotions/);
    // Promo content (e.g. "Hungry Jacks") appears to rotate/vary by session, so assert on the
    // stable "Active" section rather than a specific promo's copy.
    await expect(page.getByText('Active', { exact: true })).toBeVisible();
  });

  test('4.2 recent bills widget', async ({ page }) => {
    test.fixme(true, LINKED_ACCOUNT_BLOCKED);
    await login(page);
    await expect(page.getByText('Recent Bills')).toBeVisible();
  });

  test('4.3 subscriptions — no subscriptions state', async ({ page }) => {
    test.fixme(true, LINKED_ACCOUNT_BLOCKED);
    await login(page);
    await expect(page.getByText('Subscriptions')).toBeVisible();
    await expect(page.getByText('No subscriptions identified')).toBeVisible();
  });

  test('4.4 cash flow — period dropdown', async ({ page }) => {
    test.fixme(true, LINKED_ACCOUNT_BLOCKED);
    await login(page);
    await expect(page.getByText('Cash Flow')).toBeVisible();
  });

  test('4.5 income details tab', async ({ page }) => {
    test.fixme(true, LINKED_ACCOUNT_BLOCKED);
    await login(page);
    await expect(page.getByText('Cash Flow')).toBeVisible();
  });

  test('4.6 spending details tab', async ({ page }) => {
    test.fixme(true, LINKED_ACCOUNT_BLOCKED);
    await login(page);
    await expect(page.getByText('Categories')).toBeVisible();
    await expect(page.getByText('Merchants')).toBeVisible();
  });

  test('4.7 net worth — open from dashboard', async ({ page }) => {
    test.fixme(true, LINKED_ACCOUNT_BLOCKED);
    await login(page);
    await expect(page.getByText('Total Net Worth')).toBeVisible();
    await expect(page.getByText('Assets')).toBeVisible();
    await expect(page.getByText('Liabilities')).toBeVisible();
  });

  test('4.8 net worth — navigate back to dashboard', async ({ page }) => {
    test.fixme(true, LINKED_ACCOUNT_BLOCKED);
    await login(page);
    await expect(page.getByText('Total Net Worth')).toBeVisible();
  });

  test('4.9 dashboard doughnut chart — change categories', async ({ page }) => {
    test.fixme(true, LINKED_ACCOUNT_BLOCKED);
    await login(page);
  });
});
