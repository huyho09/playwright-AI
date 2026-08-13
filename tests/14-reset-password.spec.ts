import { test, expect } from '@playwright/test';
import { deleteAllMessages, waitForLatestMessage, findResetLink, mailosaurTestEmail } from './support/mailosaur';

const EMAIL_NEVER_ARRIVES =
  'Requesting a reset for the Mailosaur test address succeeds (neutral "if this is a registered ' +
  'account..." message shown, confirmed live), but no email ever arrives in the Mailosaur inbox — ' +
  'polled for 60s, and a direct Mailosaur API check confirmed the inbox is empty and the API ' +
  'credentials/integration work correctly. This strongly suggests the Mailosaur test address is not ' +
  'actually a registered Surveyz account on this environment. Needs a genuinely registered ' +
  'Mailosaur-linked test account to complete this flow.';

// 14.1 and 14.2 share the reset link captured from the Mailosaur inbox, so they run as one
// dependent sequence rather than isolated tests.
test.describe.serial('UAT SurveyZ : Reset Password (email flow)', () => {
  let resetLink: string;

  test('14.1 request a password reset email', async ({ page }) => {
    test.setTimeout(90000); // waiting for a real email to arrive can take longer than the default 30s

    // AC says to click "Forgot password" on the login screen, but that link is confirmed dead
    // (see 01-login.spec.ts) — navigating directly to /reset-password instead, which is the real
    // target route. The reset target is meant to be a dedicated Mailosaur-linked test inbox, not a
    // shared named account, so this was safe to attempt live end-to-end.
    const testEmail = mailosaurTestEmail();
    await deleteAllMessages();

    await page.goto('/reset-password');
    await expect(page.getByRole('heading', { name: 'Reset password' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Email' }).fill(testEmail);
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByText(/error/i)).not.toBeVisible();

    test.fixme(true, EMAIL_NEVER_ARRIVES);

    const message = await waitForLatestMessage(testEmail);
    resetLink = findResetLink(message);
    expect(resetLink).toMatch(/^https?:\/\//);
  });

  test('14.2 reset the password from the emailed link', async ({ page }) => {
    test.fixme(true, 'Depends on capturing a reset link from 14.1 — see that test for why the email never arrives.');
    test.setTimeout(60000);
    test.skip(!resetLink, '14.1 must capture a reset link first.');

    const newPassword = `Password${Date.now()}!`;
    await page.goto(resetLink);
    await expect(page.getByText(/enter new password/i)).toBeVisible();

    await page.getByRole('textbox', { name: /new password/i }).fill(newPassword);
    await page.getByRole('textbox', { name: /confirm password/i }).fill(newPassword);

    const resetButton = page.getByRole('button', { name: /reset/i });
    await resetButton.click();
    if (!(await page.getByText(/your password has been reset/i).isVisible({ timeout: 3000 }).catch(() => false))) {
      await resetButton.click();
    }
    await expect(page.getByText(/your password has been reset/i)).toBeVisible();
  });
});
