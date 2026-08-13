# File: tests/07-wallet.spec.ts
# UAT SurveyZ : Wallet

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- "Log in with <email>" means: click "Log In", enter the email and `TEST_PASSWORD`, then submit.
- `shyf@nba.com` — simple wallet. `os@gm.co` — wallet with multiple transactions.

# 7. Wallet

## 7.1 Open the Wallet tab
- Log in with `shyf@nba.com`.
- Open the "Wallet" tab.
- Confirm the Wallet screen is shown.

## 7.2 Wallet — open balance history
- Log in with `shyf@nba.com`.
- Open the "Wallet" tab.
- Open the balance-history link.
- Confirm the header shows "Balance history".
- Confirm the "Past transactions" section is shown.

## 7.3 Wallet — balance history with multiple transactions
- Log in with `os@gm.co`.
- Open the "Wallet" tab and open the balance-history link.
- Confirm the header shows "Balance history".
- Confirm the "Past transactions" section is shown (with multiple transactions).

## 7.4 Wallet — open Refer a Friend entry point
- Log in with `os@gm.co`.
- Open the "Wallet" tab.
- Confirm the Refer-a-Friend entry point is available from the wallet.
