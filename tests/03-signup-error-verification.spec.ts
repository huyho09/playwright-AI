import { test, expect } from '@playwright/test';
import { logout } from './support/auth';
import { uniqueEmail, fillAccountStep, selectGender, fillPhone, fillVerificationCode } from './support/signup';

test.describe('UAT SurveyZ : Sign Up — Error Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('3.1 account step — invalid email and missing password errors', async ({ page }) => {
    await page.getByRole('button', { name: 'Join Now' }).click();
    await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();

    await page.getByRole('textbox', { name: 'First name' }).fill('cypress test');
    await page.getByRole('textbox', { name: 'Email' }).last().fill('cypres');
    await page.getByRole('textbox', { name: 'Password' }).last().click();
    await expect(page.getByText('Email is not a valid email address.')).toBeVisible();

    await page.getByRole('textbox', { name: 'Password' }).last().blur();
    await expect(page.getByText('Password is required.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  test('3.2 profile step — accepts valid data after account step', async ({ page }) => {
    await page.getByRole('button', { name: 'Join Now' }).click();
    await fillAccountStep(page, {
      firstName: 'cypress test',
      surname: 'Testing',
      email: uniqueEmail('cypreserr'),
      password: 'Password1!',
    });
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Create your profile' })).toBeVisible();
    await selectGender(page, 'Male');
    await page.getByRole('textbox', { name: 'DD' }).fill('11');
    await page.getByRole('textbox', { name: 'MM' }).fill('13');
    await page.getByRole('textbox', { name: 'YYYY' }).fill('1998');
    await page.getByRole('textbox', { name: 'Postcode' }).fill('2222');
    // Month 13 is invalid — the AC only asks to capture this state, not proceed.
    await expect(page.getByText('Date of birth is invalid.')).toBeVisible();
    await page.screenshot({ path: 'test-results/03.2-profile-state.png' });
  });

  test('3.3 profile step — invalid postcode', async ({ page }) => {
    await page.getByRole('button', { name: 'Join Now' }).click();
    await fillAccountStep(page, {
      firstName: 'cypress test',
      surname: 'Testing',
      email: uniqueEmail('cypreserr'),
      password: 'Password1!',
    });
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Create your profile' })).toBeVisible();
    await selectGender(page, 'Male');
    await page.getByRole('textbox', { name: 'DD' }).fill('11');
    await page.getByRole('textbox', { name: 'MM' }).fill('11');
    await page.getByRole('textbox', { name: 'YYYY' }).fill('1998');
    await page.getByRole('textbox', { name: 'Postcode' }).fill('222');
    await page.getByRole('textbox', { name: 'Postcode' }).blur();

    await expect(page.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  test('3.4 mobile step — invalid (too short) phone number', async ({ page }) => {
    await page.getByRole('button', { name: 'Join Now' }).click();
    await fillAccountStep(page, {
      firstName: 'cypress test',
      surname: 'Testing',
      email: uniqueEmail('cypreserr'),
      password: 'Password1!',
    });
    await page.getByRole('button', { name: 'Next' }).click();
    await selectGender(page, 'Male');
    await page.getByRole('textbox', { name: 'DD' }).fill('11');
    await page.getByRole('textbox', { name: 'MM' }).fill('11');
    await page.getByRole('textbox', { name: 'YYYY' }).fill('1998');
    await page.getByRole('textbox', { name: 'Postcode' }).fill('2222');
    await page.getByRole('textbox', { name: 'Postcode' }).blur();
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Mobile Verification' })).toBeVisible();
    await fillPhone(page, '04517818');
    await expect(page.getByRole('button', { name: 'Send the code' })).toBeDisabled();
  });

  test('3.5 verify mobile — wrong verification code', async ({ page }) => {
    await page.getByRole('button', { name: 'Join Now' }).click();
    await fillAccountStep(page, {
      firstName: 'cypress test',
      surname: 'Testing',
      email: uniqueEmail('cypreserr'),
      password: 'Password1!',
    });
    await page.getByRole('button', { name: 'Next' }).click();
    await selectGender(page, 'Male');
    await page.getByRole('textbox', { name: 'DD' }).fill('11');
    await page.getByRole('textbox', { name: 'MM' }).fill('11');
    await page.getByRole('textbox', { name: 'YYYY' }).fill('1998');
    await page.getByRole('textbox', { name: 'Postcode' }).fill('2222');
    await page.getByRole('textbox', { name: 'Postcode' }).blur();
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Mobile Verification' })).toBeVisible();
    await fillPhone(page, '0451' + Math.floor(100000 + Math.random() * 899999));
    await page.getByRole('button', { name: 'Send the code' }).click();

    await expect(page.getByRole('heading', { name: 'Enter code sent to your phone.' })).toBeVisible();
    await fillVerificationCode(page, '314122');
    await page.getByRole('button', { name: 'Verify' }).click();
    await expect(page.getByText(/wrong verification/i)).toBeVisible();
  });

  test('3.6 verify mobile — phone number without leading zero', async ({ page }) => {
    await page.getByRole('button', { name: 'Join Now' }).click();
    await fillAccountStep(page, {
      firstName: 'cypress test',
      surname: 'Testing',
      email: uniqueEmail('cypreserr'),
      password: 'Password1!',
    });
    await page.getByRole('button', { name: 'Next' }).click();
    await selectGender(page, 'Male');
    await page.getByRole('textbox', { name: 'DD' }).fill('11');
    await page.getByRole('textbox', { name: 'MM' }).fill('11');
    await page.getByRole('textbox', { name: 'YYYY' }).fill('1998');
    await page.getByRole('textbox', { name: 'Postcode' }).fill('2222');
    await page.getByRole('textbox', { name: 'Postcode' }).blur();
    await page.getByRole('button', { name: 'Next' }).click();

    await expect(page.getByRole('heading', { name: 'Mobile Verification' })).toBeVisible();
    await fillPhone(page, '452781802');
    await page.getByRole('button', { name: 'Send the code' }).click();

    await expect(page.getByRole('heading', { name: 'Enter code sent to your phone.' })).toBeVisible();
    await fillVerificationCode(page, '314159');
  });

  test('3.7 bank linking — "Can\'t find your institution?"', async ({ page }) => {
    test.fixme(
      true,
      'Requires completing signup through mobile verification to reach bank linking, which is blocked — ' +
        'see 02-register.spec.ts for the mock-code/whitelisted-number constraint.'
    );

    await page.getByRole('button', { name: 'Join Now' }).click();
    await fillAccountStep(page, {
      firstName: 'cypress test',
      surname: 'Testing',
      email: uniqueEmail('cypreserr'),
      password: 'Password1!',
    });
    await page.getByRole('button', { name: 'Next' }).click();
    await selectGender(page, 'Male');
    await page.getByRole('textbox', { name: 'DD' }).fill('11');
    await page.getByRole('textbox', { name: 'MM' }).fill('11');
    await page.getByRole('textbox', { name: 'YYYY' }).fill('1998');
    await page.getByRole('textbox', { name: 'Postcode' }).fill('2222');
    await page.getByRole('textbox', { name: 'Postcode' }).blur();
    await page.getByRole('button', { name: 'Next' }).click();
    await fillPhone(page, '0451' + Math.floor(100000 + Math.random() * 899999));
    await page.getByRole('button', { name: 'Send the code' }).click();
    await fillVerificationCode(page, '314159');
    await page.getByRole('button', { name: 'Verify' }).click();

    await expect(page.getByText('Welcome!')).toBeVisible();
    await page.getByRole('button', { name: /continue/i }).click();

    await expect(page.getByText('Select your bank institution')).toBeVisible();
    await page.getByText(/can't find your bank/i).click();
    await expect(page.getByText("Can't find your institution?")).toBeVisible();
    await page.getByRole('textbox', { name: /institution/i }).fill('Bank bank');
    await page.getByRole('button', { name: /submit/i }).click();
    await expect(page.getByText(/submitted|thank you/i)).toBeVisible();
    await page.getByRole('button', { name: /close/i }).click();
  });
});
