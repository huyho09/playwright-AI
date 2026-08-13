import { test, expect } from '@playwright/test';
import { logout } from './support/auth';
import {
  uniqueEmail,
  uniquePhone,
  fillAccountStep,
  selectGender,
  fillProfileStep,
  fillPhone,
  fillVerificationCode,
} from './support/signup';

const MOBILE_CODE = '314159';

test.describe('UAT SurveyZ : Sign Up (Registration)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('2.1 sign up — complete flow with bank linking', async ({ page }) => {
    test.fixme(
      true,
      'Mobile verification cannot be completed live for a brand-new signup: the AC\'s fixed test phone ' +
        '(0451781802) is already registered on UAT (blocks "Send the code"), and a fresh, unique phone number ' +
        'is accepted by "Send the code" but then rejects the documented mock code 314159 with "Wrong ' +
        'verification number." — the mock code appears wired to specific pre-whitelisted numbers only, all of ' +
        'which are already taken. Steps through Mobile Verification are live-verified; steps after (Welcome, ' +
        'bank linking) are written from the AC only and unverified. Needs a real/whitelisted UAT test number to unblock.'
    );

    await page.getByRole('button', { name: 'Join Now' }).click();
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();

    const email = uniqueEmail('cyprestesting');
    await fillAccountStep(page, { firstName: 'cypress test1', surname: 'Testing', email, password: 'Password1!' });
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Create your profile' })).toBeVisible();
    await selectGender(page, 'Male');
    await fillProfileStep(page, { day: '11', month: '11', year: '1998', postcode: '2222' });
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Mobile Verification' })).toBeVisible();
    await fillPhone(page, uniquePhone());
    await page.getByRole('button', { name: 'Send the code' }).click();

    await expect(page.getByRole('heading', { name: 'Enter code sent to your phone.' })).toBeVisible();
    await fillVerificationCode(page, MOBILE_CODE);
    await page.getByRole('button', { name: 'Verify' }).click();

    await expect(page.getByText('Welcome!')).toBeVisible();
    await page.getByRole('button', { name: /continue/i }).click();

    await page.getByRole('textbox', { name: /search/i }).fill('bank of statements');
    await page.getByText('bank of statements').click();
    await page.getByRole('textbox', { name: /username/i }).fill('12345678');
    await page.getByRole('textbox', { name: /password/i }).fill('TestMyMoney');
    await page.getByRole('button', { name: /submit|link|continue/i }).click();
    await expect(page.getByText(/linked|success/i)).toBeVisible();
    await page.getByRole('button', { name: /close|done/i }).click();
  });

  test('2.2 sign up — complete flow without bank linking', async ({ page }) => {
    test.fixme(true, 'Same mobile-verification blocker as 2.1 — see that test for details.');

    await page.getByRole('button', { name: 'Join Now' }).click();
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();

    const email = uniqueEmail('nolinkcyprestesting');
    await fillAccountStep(page, {
      firstName: 'cypress test1-nolinking',
      surname: 'Testing',
      email,
      password: 'Password1!',
    });
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Create your profile' })).toBeVisible();
    await selectGender(page, 'Male');
    await fillProfileStep(page, { day: '10', month: '11', year: '1998', postcode: '2222' });
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Mobile Verification' })).toBeVisible();
    await fillPhone(page, uniquePhone());
    await page.getByRole('button', { name: 'Send the code' }).click();

    await expect(page.getByRole('heading', { name: 'Enter code sent to your phone.' })).toBeVisible();
    await fillVerificationCode(page, MOBILE_CODE);
    await page.getByRole('button', { name: 'Verify' }).click();

    await expect(page.getByText('Welcome!')).toBeVisible();
    await page.getByRole('button', { name: /continue/i }).click();

    await page.getByRole('button', { name: /skip|not now|close/i }).click();
    await page.waitForURL(/\/dashboard\/home/);
  });
});
