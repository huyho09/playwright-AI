# File: tests/06-withdrawal.spec.ts
# UAT SurveyZ : Withdrawal

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- "Log in with <email>" means: click "Log In", enter the email and `TEST_PASSWORD`, then submit.
- `os@gm.co` has a fixed "standard" balance that must NOT be changed, as several tests rely on it.
- The minimum withdrawal amount is `$20.00`.
- The charity / donation toggle is a Humaniti-brand feature; on Surveyz these charity steps may not apply.
- To reach the balance: after login, open the "Surveys" tab and click the balance card.

# 6. Withdrawal

## 6.1 Balance card opens balance history
- Log in with `mahesh@fonto.com.au`.
- Open "Surveys" and click the balance card, then open the balance value.
- Confirm the first balance-history row is visible and enabled.

## 6.2 Withdrawal button is enabled for an eligible balance
- Log in with `os@gm.co`.
- Open "Surveys", click the balance card, then open the balance value.
- Confirm the first balance-history row is enabled.
- Confirm the "Withdrawal" button is NOT disabled.

## 6.3 Withdrawal flow — valid amount end to end
- Log in with `os@gm.co`.
- Open "Surveys", click the balance card, then click the "Withdrawal" button.
- Enter a withdrawal amount of `20`.
- Continue to the bank details step.
- Enter account holder name `MK Test`, BSB `123456`, account number `45567`.
- Continue and click "Confirm withdrawal".

## 6.4 Error — withdrawal amount below the minimum
- Log in with `os@gm.co`.
- Open "Surveys", click the balance card, then click the "Withdrawal" button.
- Enter a withdrawal amount of `10`.
- Confirm the error "Withdrawal amount cannot be less than $20.00" is shown.

## 6.5 Error — required bank fields on the bank details step
- Log in with `os@gm.co`.
- Open the withdrawal flow and enter a valid amount of `20`, then continue to bank details.
- Leave account holder name empty and try to continue — confirm "Account holder name is required".
- Leave BSB empty and try to continue — confirm "BSB is required".
- Leave account number empty and try to continue — confirm "Account number is required".

## 6.6 Withdrawal + charity (Humaniti only)
- Log in with `os@gm.co`.
- Open the withdrawal flow and enter a withdrawal amount of `20`.
- Turn on the charity/donation toggle and enter a donation amount of `3`.
- Continue to bank details and enter name `MK Test`, BSB `123456`, account number `45567`.
- Continue and click "Confirm withdrawal", then close the confirmation.

## 6.7 Charity-only withdrawal (Humaniti only)
- Log in with `os@gm.co`.
- Open the withdrawal flow and set the withdrawal amount to `0`.
- Turn on the charity/donation toggle and enter a donation amount of `22`.
- Continue and submit the charity-only request.

## 6.8 Error — charity on with withdrawal below the minimum (Humaniti only)
- Log in with `os@gm.co`.
- Open the withdrawal flow and set the withdrawal amount to `0`.
- Turn on the charity toggle and enter a donation amount of `3`.
- Confirm the error "Withdrawal amount cannot be less than $20.00" is shown.

## 6.9 Error — no withdrawal value entered
- Log in with `os@gm.co`.
- Open the withdrawal flow and set the withdrawal amount to `0.00`.
- Confirm the form does not proceed (amount is invalid).

## 6.10 Charity toggle transitions
- Log in with `os@gm.co`.
- Open the withdrawal flow and set the withdrawal amount to `0.00`.
- Turn on the charity toggle and enter a donation amount `21.50`.
- Turn the charity toggle off again, then set the withdrawal amount back to `0.00`.
- Confirm the screen stays consistent through the toggling (no crash / stuck state).
