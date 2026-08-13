import { type Page } from '@playwright/test';

export function uniqueEmail(prefix: string, domain = '@hmti.com') {
  return `${prefix}${Date.now()}${Math.floor(Math.random() * 1000)}${domain}`;
}

/** UAT phone numbers must be unique per signup — the AC's fixed test number is already registered. */
export function uniquePhone() {
  const suffix = Math.floor(100000 + Math.random() * 899999);
  return `045${suffix}`;
}

/**
 * This Ionic app keeps the previous route's DOM mounted (for transition animations), so after
 * navigating from /login into the sign-up wizard there can be two same-named fields (e.g. "Email",
 * "Password") — one hidden behind the current step. `.last()` targets the currently-active one,
 * consistent with how this router stacks new pages on top.
 */
const field = (page: Page, name: string) => page.getByRole('textbox', { name }).last();

export async function fillAccountStep(
  page: Page,
  { firstName, surname, email, password }: { firstName: string; surname: string; email: string; password: string }
) {
  await field(page, 'First name').fill(firstName);
  await field(page, 'Surname').fill(surname);
  await field(page, 'Email').fill(email);
  await field(page, 'Password').fill(password);
  await field(page, 'Password').blur();
}

export async function selectGender(page: Page, gender: 'Male' | 'Female' = 'Male') {
  await page.getByText('Gender', { exact: true }).click();
  await page.getByRole('radio', { name: gender, exact: true }).click();
}

export async function fillProfileStep(
  page: Page,
  { day, month, year, postcode }: { day: string; month: string; year: string; postcode: string }
) {
  await field(page, 'DD').fill(day);
  await field(page, 'MM').fill(month);
  await field(page, 'YYYY').fill(year);
  await field(page, 'Postcode').fill(postcode);
  await field(page, 'Postcode').blur();
}

/** Fills the phone field with real per-keystroke events — .fill() alone doesn't trigger this app's validation. */
export async function fillPhone(page: Page, phone: string) {
  const target = field(page, 'Phone number');
  await target.fill('');
  await target.pressSequentially(phone);
}

export async function fillVerificationCode(page: Page, code: string) {
  const target = field(page, 'Verification Code');
  await target.fill('');
  await target.pressSequentially(code);
}
