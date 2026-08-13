# File: tests/09-route-guard.spec.ts
# UAT SurveyZ : Routing / Route Guard

# Before Each Test
- (Each test navigates to a specific deep-link URL — see the step.)

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- `shyf@nba.com` is a linked account.

# 9. Routing

## 9.1 Deep link to a protected route redirects to login, then lands correctly
- Navigate directly to https://uatsurveyz.com.au/dashboard/surveys.
- Confirm the "Log In" screen is shown (protected route requires auth).
- Log in with `shyf@nba.com` and `TEST_PASSWORD`.
- Confirm we land on the surveys screen and "You have no available surveys" is shown.

## 9.2 Deep link to a non-existent route falls back to the landing page
- Navigate directly to https://uatsurveyz.com.au/dashboard/earn (a route that does not exist).
- Confirm the landing page "Link, Learn & Earn" is shown.
- Click "Log In" and log in with `shyf@nba.com` and `TEST_PASSWORD`.
- Confirm we land on a valid screen (e.g. "Spending" is shown).
