import { type Page, expect } from '@playwright/test';

export const emailInput = (page: Page) => page.getByRole('textbox', { name: 'Email' });
export const passwordInput = (page: Page) => page.getByRole('textbox', { name: 'Password' });
export const loginButton = (page: Page) => page.getByRole('button', { name: 'Log In' });

const MAX_LOGIN_ATTEMPTS = 5;

/**
 * Logs in from the /login screen and waits for the dashboard to load.
 *
 * Several named QA fixture accounts (mahesh@fonto.com.au, os@gm.co, cyprest1@hmti.com) are
 * currently locked on UAT under TEST_PASSWORD. Per team direction, specs use TEST_EMAIL by
 * default and, on a "locked" response, rotate the numeric suffix (huytest2 -> huytest3 -> ...)
 * up to MAX_LOGIN_ATTEMPTS — a bounded retry, never unbounded.
 */
export async function login(page: Page, email = process.env.TEST_EMAIL!, password = process.env.TEST_PASSWORD!) {
  const match = email.match(/^(.*?)(\d+)(@.*)$/);
  if (!match) {
    await loginOnce(page, email, password);
    return;
  }

  const [, prefix, startSuffix, domain] = match;
  const startNumber = Number(startSuffix);

  for (let attempt = 0; attempt < MAX_LOGIN_ATTEMPTS; attempt++) {
    const candidate = `${prefix}${startNumber + attempt}${domain}`;
    await loginOnce(page, candidate, password);

    const outcome = await Promise.race([
      page.getByText(/locked|too many failed attempts/i).waitFor({ state: 'visible', timeout: 8000 }).then(() => 'locked' as const),
      page.waitForURL(/\/dashboard\/home/, { timeout: 8000 }).then(() => 'success' as const),
    ]).catch(() => 'timeout' as const);

    if (outcome === 'success') return;
    if (outcome === 'locked' && attempt < MAX_LOGIN_ATTEMPTS - 1) {
      await page.goto('/login');
      continue;
    }
    throw new Error(`Could not log in with any of ${MAX_LOGIN_ATTEMPTS} rotated accounts starting at ${email}.`);
  }
}

async function loginOnce(page: Page, email: string, password: string) {
  await page.goto('/login');
  await emailInput(page).fill(email);
  await passwordInput(page).fill(password);
  await loginButton(page).click();
}

/**
 * The hamburger button (top-left icon button in the dashboard header).
 * This Ionic app keeps previous routes' banners mounted underneath the current one, so `.last()`
 * targets the currently-active banner — but within that banner the hamburger is consistently the
 * *first* button (later ones are a bell/avatar etc.), so: last banner, first button within it.
 */
export function menuButton(page: Page) {
  return page.getByRole('banner').last().getByRole('button').first();
}

export async function openMenu(page: Page) {
  await menuButton(page).click();
  // The slide-out menu animates in; clicking an item before it settles can hit the
  // (still-animating) router-outlet underneath it and get flagged as "intercepts pointer events".
  await page.waitForTimeout(400);
}

/**
 * Logs out if currently on an authenticated /dashboard-ish page. A locator matching zero elements
 * still waits out the full actionability timeout before failing, so this checks the hamburger
 * button is actually present (short timeout) before ever attempting to click it — otherwise a
 * fixme'd/never-navigated test (still on about:blank) hangs this afterEach for the full test timeout.
 */
export async function logout(page: Page) {
  const button = menuButton(page);
  if (!(await button.isVisible({ timeout: 2000 }).catch(() => false))) return;

  await button.click();
  await page.waitForTimeout(400);
  const logoutItem = page.getByText('Log out', { exact: true }).last();
  if (await logoutItem.isVisible({ timeout: 3000 }).catch(() => false)) {
    await logoutItem.click();
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible({ timeout: 10000 });
  }
}

/** Opens a top-level hamburger menu entry by its visible label. */
export async function openMenuItem(page: Page, label: string) {
  await openMenu(page);
  await page.getByText(label, { exact: true }).last().click();
}
