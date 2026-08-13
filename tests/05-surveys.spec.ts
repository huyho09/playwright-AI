import { test, expect } from '@playwright/test';
import { login, logout, openMenuItem } from './support/auth';

const NAMED_ACCOUNT_BLOCKED =
  'Requires cyprest1@hmti.com / heyjude@bt.com / shyf@nba.com / cyprest3@hmti.com for this specific data ' +
  'state (available surveys, empty history, fixed $1.50 balance, unlinked-with-survey CTA). None of these ' +
  'are TEST_EMAIL, and the AC-named accounts are currently locked on UAT (see 01-login.spec.ts).';

async function openSurveysTab(page: import('@playwright/test').Page) {
  await openMenuItem(page, 'Surveys');
  await page.waitForURL(/\/dashboard\/surveys/);
}

test.describe('UAT SurveyZ : Surveys', () => {
  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('5.1 surveys — account with existing surveys', async ({ page }) => {
    test.fixme(true, NAMED_ACCOUNT_BLOCKED);
    await login(page);
    await openSurveysTab(page);
    await expect(page.getByText("You don't have any surveys right now.").first()).not.toBeVisible();
  });

  test('5.2 history tab — no completed surveys', async ({ page }) => {
    test.fixme(true, NAMED_ACCOUNT_BLOCKED);
    await login(page);
    await openSurveysTab(page);
    await page.getByText('History', { exact: true }).click();
    await expect(page.getByText(/no completed surveys/i)).toBeVisible();
  });

  test('5.3 no new surveys available', async ({ page }) => {
    // heyjude@bt.com (locked) is the AC's named account for this state; TEST_EMAIL happens to be
    // in the same "no surveys" state, so this is verified for real, just via a substitute account.
    await login(page);
    await openSurveysTab(page);
    await expect(page.getByText("You don't have any surveys right now.").first()).toBeVisible();
  });

  test('5.4 history tab — has completed surveys', async ({ page }) => {
    // heyjude@bt.com (locked) is the AC's named account; TEST_EMAIL has one completed survey of
    // its own ("Welcome Survey"), which also satisfies "completed surveys are listed."
    await login(page);
    await openSurveysTab(page);
    await page.getByText('History', { exact: true }).click();
    await expect(page.getByText(/no completed surveys/i)).not.toBeVisible();
  });

  test('5.5 linked account with survey available', async ({ page }) => {
    test.fixme(true, NAMED_ACCOUNT_BLOCKED);
    await login(page);
    await openSurveysTab(page);
    await expect(page.getByText("You don't have any surveys right now.").first()).not.toBeVisible();
  });

  test('5.6 balance card opens from surveys', async ({ page }) => {
    await login(page);
    await openSurveysTab(page);
    await page.getByText(/^\d+\.\d{2}$/).click();
    await page.waitForURL(/\/balance-history/);
  });

  test('5.7 open and navigate a survey', async ({ page }) => {
    test.fixme(true, NAMED_ACCOUNT_BLOCKED);
    await login(page);
    await openSurveysTab(page);
    await page.getByTestId('survey-card').first().click();
    await page.getByRole('button', { name: /next/i }).click();
    await expect(page.getByRole('button', { name: /back/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /next/i })).toBeVisible();
    await page.getByRole('button', { name: /next/i }).click();
  });

  test('5.8 balance value check ($1.50 account)', async ({ page }) => {
    test.fixme(true, NAMED_ACCOUNT_BLOCKED);
    await login(page);
    await openSurveysTab(page);
    await expect(page.getByText('1.50', { exact: true })).toBeVisible();
  });

  test('5.9 unlinked account with survey available — shows link CTA', async ({ page }) => {
    test.fixme(true, NAMED_ACCOUNT_BLOCKED);
    await login(page);
    await openSurveysTab(page);
    await expect(page.getByText("You don't have any surveys right now.").first()).not.toBeVisible();
    await expect(page.getByText(/link.*account/i)).toBeVisible();
  });

  test('5.10 unlinked account — linking explainer slides', async ({ page }) => {
    test.fixme(
      true,
      'Requires an unlinked account with an available survey to expose the in-app "Learn more" ' +
        'linking explainer. TEST_EMAIL has zero surveys, so no such CTA is rendered (confirmed live — ' +
        "the only 'Learn more' reachable from its dashboard opens an external help article, not the " +
        'in-app slide carousel). ' + NAMED_ACCOUNT_BLOCKED
    );
    await login(page);
    await openSurveysTab(page);
    await page.getByText('Learn more').click();
    await expect(page.getByText('Encrypted & Secure')).toBeVisible();
    await page.getByText('Encrypted & Secure').click();
    await expect(page.getByText('Private')).toBeVisible();
    await page.getByText('Private').click();
    await expect(page.getByText('Safe')).toBeVisible();
    await page.getByText('Safe').click();
    await expect(page.getByText('Boost your income')).toBeVisible();
  });
});
