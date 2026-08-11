# File: tests/login.spec.ts
# UAT SurveyZ : Login

# Before Each Test
- Navigate to https://uatsurveyz.com.au/login

# After Each Test
- If logged in, log out to reset session state for the next test.

# 1. Login

## 1.1 Login page loads with the core controls
- Email/username input is visible.
- Password input is visible.
- The login/submit button is visible.

## 1.2 Can log in successfully with a valid test account
- Type the email from the `TEST_EMAIL` environment variable into the email field.
- Type the password from the `TEST_PASSWORD` environment variable into the password field.
- Click the login/submit button.
- Confirm we are redirected away from `/login` (e.g. to a dashboard/home page).
- Confirm the login form is no longer visible.

## 1.3 Invalid credentials show an error and do not log in
- Type an obviously invalid email and password into the fields.
- Click the login/submit button.
- Confirm we remain on `/login`.
- Confirm a validation/error message is visible.

## 1.4 Blocked test account rotates to the next available account
- Attempt login using the steps in 1.2, starting with `TEST_EMAIL` and `TEST_PASSWORD`.
- If the page shows a "blocked" / "locked" / "account disabled" style message instead of redirecting:
  - Increment the numeric suffix on the local part of the email (e.g. `huytest2@yopmail.com` -> `huytest3@yopmail.com`).
  - Retry the login with the new email and the same `TEST_PASSWORD`.
  - Repeat for a maximum of 5 attempts total.
- On success, log which email address ultimately worked (test output/console), so the team knows which test account is currently usable.
- Fail the test only if every attempt in the retry range is blocked.
