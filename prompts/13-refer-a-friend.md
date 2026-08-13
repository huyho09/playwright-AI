# File: tests/13-refer-a-friend.spec.ts
# UAT SurveyZ : Refer a Friend (RAF)

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- `mjktest@code.com` — used to open RAF from the menu.
- `mahesh@fonto.com.au` — has an existing referral (`1` referral, `$30.00` earned).

# 13. Refer a Friend

## 13.1 Open Refer a Friend from the Settings menu
- Log in with `mjktest@code.com`.
- Open the hamburger menu and open the "Refer a friend" entry.
- Confirm the "Refer a friend" screen is shown.

## 13.2 Refer a Friend with an existing referral
- Log in with `mahesh@fonto.com.au`.
- Open the hamburger menu and open "Refer a friend".
- Confirm the referral count shows `1` and the amount earned shows `$30.00`.

## 13.3 Open Refer a Friend from the Wallet screen
- Log in with `mahesh@fonto.com.au`.
- Open the "Wallet" screen and open the Refer-a-Friend entry.
- Confirm the referral count shows `1` and the amount earned shows `$30.00`.
