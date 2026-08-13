import { test, expect } from '@playwright/test';
import { login, logout, openMenuItem } from './support/auth';

const BALANCE_BLOCKED =
  'The "Withdraw" button only enables above a minimum account balance ($10.00, confirmed live). ' +
  'TEST_EMAIL (huytest2@yopmail.com) has a $3.00 balance, so the withdrawal flow cannot even be opened. ' +
  'os@gm.co has the AC\'s required "standard" balance but is currently locked on UAT (see 01-login.spec.ts).';

const SHARED_BALANCE_NOTE =
  ' os@gm.co\'s balance must also stay fixed per this file\'s own AC notes ("several tests rely on it") — ' +
  'do not enable this by simply swapping in a working os@gm.co login without also reviewing that constraint.';

async function openSurveysBalance(page: import('@playwright/test').Page) {
  await openMenuItem(page, 'Surveys');
  await page.waitForURL(/\/dashboard\/surveys/);
  await page.getByText(/^\d+\.\d{2}$/).click();
  await page.waitForURL(/\/balance-history/);
}

test.describe('UAT SurveyZ : Withdrawal', () => {
  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('6.1 balance card opens balance history', async ({ page }) => {
    // AC uses mahesh@fonto.com.au (linked, has balance history) — currently locked, so this runs
    // against TEST_EMAIL instead. TEST_EMAIL happens to have one balance-history row too.
    await login(page);
    await openSurveysBalance(page);
    await expect(page.getByText('Past transactions')).toBeVisible();
    const firstRow = page.getByText('Welcome Survey (Hive Edition)');
    await expect(firstRow).toBeVisible();
  });

  test('6.2 withdrawal button is enabled for an eligible balance', async ({ page }) => {
    test.fixme(true, BALANCE_BLOCKED);
    await login(page);
    await openSurveysBalance(page);
    await expect(page.getByRole('button', { name: 'Withdraw' })).toBeEnabled();
  });

  test('6.3 withdrawal flow — valid amount end to end', async ({ page }) => {
    test.fixme(true, BALANCE_BLOCKED + SHARED_BALANCE_NOTE + ' Also intentionally not live-executed even ' +
      'once unblocked — see 6.6/6.7.');
    await login(page);
    await openSurveysBalance(page);
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await page.getByRole('textbox', { name: /amount/i }).fill('20');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('textbox', { name: /account holder/i }).fill('MK Test');
    await page.getByRole('textbox', { name: /bsb/i }).fill('123456');
    await page.getByRole('textbox', { name: /account number/i }).fill('45567');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('button', { name: 'Confirm withdrawal' }).click();
  });

  test('6.4 error — withdrawal amount below the minimum', async ({ page }) => {
    test.fixme(true, BALANCE_BLOCKED);
    await login(page);
    await openSurveysBalance(page);
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await page.getByRole('textbox', { name: /amount/i }).fill('10');
    await expect(page.getByText('Withdrawal amount cannot be less than $20.00')).toBeVisible();
  });

  test('6.5 error — required bank fields on the bank details step', async ({ page }) => {
    test.fixme(true, BALANCE_BLOCKED);
    await login(page);
    await openSurveysBalance(page);
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await page.getByRole('textbox', { name: /amount/i }).fill('20');
    await page.getByRole('button', { name: /continue/i }).click();

    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.getByText('Account holder name is required')).toBeVisible();

    await page.getByRole('textbox', { name: /account holder/i }).fill('MK Test');
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.getByText('BSB is required')).toBeVisible();

    await page.getByRole('textbox', { name: /bsb/i }).fill('123456');
    await page.getByRole('button', { name: /continue/i }).click();
    await expect(page.getByText('Account number is required')).toBeVisible();
  });

  test('6.6 withdrawal + charity (Humaniti only)', async ({ page }) => {
    test.fixme(true, BALANCE_BLOCKED + SHARED_BALANCE_NOTE +
      ' Also: charity/donation is a Humaniti-brand feature per this file\'s own notes and may not apply ' +
      'to Surveyz at all — confirm the toggle exists before un-skipping.');
    await login(page);
    await openSurveysBalance(page);
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await page.getByRole('textbox', { name: /amount/i }).fill('20');
    await page.getByRole('switch', { name: /charity|donation/i }).click();
    await page.getByRole('textbox', { name: /donation/i }).fill('3');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('textbox', { name: /account holder/i }).fill('MK Test');
    await page.getByRole('textbox', { name: /bsb/i }).fill('123456');
    await page.getByRole('textbox', { name: /account number/i }).fill('45567');
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('button', { name: 'Confirm withdrawal' }).click();
    await page.getByRole('button', { name: /close/i }).click();
  });

  test('6.7 charity-only withdrawal (Humaniti only)', async ({ page }) => {
    test.fixme(true, BALANCE_BLOCKED + SHARED_BALANCE_NOTE +
      ' Also a Humaniti-brand feature per this file\'s own notes — may not apply to Surveyz.');
    await login(page);
    await openSurveysBalance(page);
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await page.getByRole('textbox', { name: /amount/i }).fill('0');
    await page.getByRole('switch', { name: /charity|donation/i }).click();
    await page.getByRole('textbox', { name: /donation/i }).fill('22');
    await page.getByRole('button', { name: /continue/i }).click();
  });

  test('6.8 error — charity on with withdrawal below the minimum (Humaniti only)', async ({ page }) => {
    test.fixme(true, BALANCE_BLOCKED + ' Also a Humaniti-brand feature per this file\'s own notes.');
    await login(page);
    await openSurveysBalance(page);
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await page.getByRole('textbox', { name: /amount/i }).fill('0');
    await page.getByRole('switch', { name: /charity|donation/i }).click();
    await page.getByRole('textbox', { name: /donation/i }).fill('3');
    await expect(page.getByText('Withdrawal amount cannot be less than $20.00')).toBeVisible();
  });

  test('6.9 error — no withdrawal value entered', async ({ page }) => {
    test.fixme(true, BALANCE_BLOCKED);
    await login(page);
    await openSurveysBalance(page);
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await page.getByRole('textbox', { name: /amount/i }).fill('0.00');
    await expect(page.getByRole('button', { name: /continue/i })).toBeDisabled();
  });

  test('6.10 charity toggle transitions', async ({ page }) => {
    test.fixme(true, BALANCE_BLOCKED + ' Also a Humaniti-brand feature per this file\'s own notes.');
    await login(page);
    await openSurveysBalance(page);
    await page.getByRole('button', { name: 'Withdraw' }).click();
    await page.getByRole('textbox', { name: /amount/i }).fill('0.00');
    await page.getByRole('switch', { name: /charity|donation/i }).click();
    await page.getByRole('textbox', { name: /donation/i }).fill('21.50');
    await page.getByRole('switch', { name: /charity|donation/i }).click();
    await page.getByRole('textbox', { name: /amount/i }).fill('0.00');
    await expect(page.getByRole('button', { name: 'Withdraw' })).toBeVisible();
  });
});
