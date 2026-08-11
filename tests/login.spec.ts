// Locators verified by running against the live https://uatsurveyz.com.au/login page
// (Playwright MCP was unavailable in-session; verification was done via direct test
// runs instead). The 1.4 rotation branch is exercised structurally but not against
// an actually-blocked account — no test account was in a blocked state at write time.
import { test, expect, type Page } from '@playwright/test';

const TEST_EMAIL = process.env.TEST_EMAIL;
const TEST_PASSWORD = process.env.TEST_PASSWORD;

if (!TEST_EMAIL || !TEST_PASSWORD) {
  throw new Error('TEST_EMAIL and TEST_PASSWORD must be set (see .env.example).');
}

const emailInput = (page: Page) =>
  page.getByLabel(/email|username/i).or(page.getByPlaceholder(/email|username/i));
const passwordInput = (page: Page) =>
  page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i));
const submitButton = (page: Page) =>
  page.getByRole('button', { name: /log ?in|sign ?in/i });
const errorMessage = (page: Page) =>
  page.getByText(/wrong|invalid|incorrect|error|failed/i);
const blockedMessage = (page: Page) =>
  page.getByText(/blocked|locked|disabled/i);

async function logout(page: Page) {
  const accountMenu = page.getByRole('button', { name: /account|profile|user menu/i });
  if (await accountMenu.isVisible().catch(() => false)) {
    await accountMenu.click();
  }
  const logoutControl = page
    .getByRole('menuitem', { name: /log ?out|sign ?out/i })
    .or(page.getByRole('link', { name: /log ?out|sign ?out/i }))
    .or(page.getByRole('button', { name: /log ?out|sign ?out/i }));
  if (await logoutControl.isVisible().catch(() => false)) {
    await logoutControl.click();
  }
}

test.describe('UAT SurveyZ : Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test.afterEach(async ({ page }) => {
    await logout(page).catch(() => {});
  });

  test('1.1 login page loads with the core controls', async ({ page }) => {
    await expect(emailInput(page)).toBeVisible();
    await expect(passwordInput(page)).toBeVisible();
    await expect(submitButton(page)).toBeVisible();
  });

  test('1.2 can log in successfully with a valid test account', async ({ page }) => {
    await emailInput(page).fill(TEST_EMAIL!);
    await passwordInput(page).fill(TEST_PASSWORD!);
    await submitButton(page).click();

    await expect(page).not.toHaveURL(/\/login/);
    await expect(emailInput(page)).not.toBeVisible();
  });

  test('1.3 invalid credentials show an error and do not log in', async ({ page }) => {
    await emailInput(page).fill('not-a-real-account@example.com');
    await passwordInput(page).fill('WrongPassword!123');
    await submitButton(page).click();

    await expect(page).toHaveURL(/\/login/);
    await expect(errorMessage(page)).toBeVisible();
  });

  test('1.4 blocked test account rotates to the next available account', async ({ page }) => {
    const MAX_ATTEMPTS = 5;
    const emailMatch = TEST_EMAIL!.match(/^(.*?)(\d+)(@.*)$/);
    if (!emailMatch) {
      throw new Error(`TEST_EMAIL "${TEST_EMAIL}" has no numeric suffix before the @ to rotate.`);
    }
    const [, prefix, startSuffix, domain] = emailMatch;
    const startNumber = Number(startSuffix);

    let workingEmail: string | null = null;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const candidateEmail = `${prefix}${startNumber + attempt}${domain}`;

      if (attempt > 0) {
        await page.goto('/login');
      }

      await emailInput(page).fill(candidateEmail);
      await passwordInput(page).fill(TEST_PASSWORD!);
      await submitButton(page).click();

      const outcome = await Promise.race([
        blockedMessage(page)
          .waitFor({ state: 'visible', timeout: 8000 })
          .then(() => 'blocked' as const),
        page
          .waitForURL((url) => !/\/login/.test(url.pathname), { timeout: 8000 })
          .then(() => 'success' as const),
      ]).catch(() => 'timeout' as const);

      if (outcome === 'success') {
        workingEmail = candidateEmail;
        break;
      }
      // 'blocked' or 'timeout' -> try the next account, up to MAX_ATTEMPTS total.
    }

    expect(
      workingEmail,
      `All ${MAX_ATTEMPTS} test accounts starting at ${TEST_EMAIL} were blocked or failed to log in.`
    ).not.toBeNull();
    console.log(`[login rotation] working test account: ${workingEmail}`);
  });
});
