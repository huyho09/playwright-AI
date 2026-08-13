# File: tests/01-login.spec.ts
# UAT SurveyZ : Login

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- "Log in with <email>" below means: on the landing page click the "Log In" button, wait for the "Log In" screen, type the email and `TEST_PASSWORD`, then click the login button.

# 1. Login

## 1.1 Verify the welcome slides
- On the landing page, confirm the first slide headline "Link, Learn & Earn" is visible.
- Advance to the second slide and confirm "Link & Learn" is visible.
- Advance to the third slide and confirm "Earn extra money" is visible.
- Advance to the fourth slide and confirm "Give Back" is visible.

## 1.2 Login session (log in, log out, log in again)
- On the landing page, click the "Log In" button and confirm the "Log In" screen is shown.
- Type the email `mahesh@fonto.com.au` and `TEST_PASSWORD`, then click the login button.
- Confirm we are logged in (the hamburger/menu button is visible).
- Open the hamburger menu and click "Log out".
- Confirm the "Log In" screen is shown again.
- Log in again with `mahesh@fonto.com.au` and `TEST_PASSWORD`.
- Confirm we are logged in (the hamburger/menu button is visible).

## 1.3 Error verification — invalid email
- Click the "Log In" button to open the login screen.
- Type `mm@mm` into the email field.
- Move focus to the password field.
- Confirm the error message "Email is not a valid email address" is visible.

## 1.4 Error verification — missing password
- Click the "Log In" button to open the login screen.
- Type a valid-format email `mts@mm.com` into the email field.
- Move focus away without entering a password.
- Confirm the error message "Password is required" is visible.

## 1.5 Forgot password — reaches the reset screen
- Click the "Log In" button to open the login screen.
- Type the email `mahesh@fonto.com.au`.
- Click "Forgot password".
- Confirm the "Reset password" screen is shown.

## 1.6 Forgot password flow — submit a reset request
- Click the "Log In" button to open the login screen.
- Type the email `mahesh@fonto.com.au`.
- Click "Forgot password" and confirm the "Reset password" screen is shown.
- Type `mahesh@fonto.com.au` into the reset email field.
- Click the reset/submit button.
- Confirm the reset request is submitted (no error shown).
