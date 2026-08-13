# File: tests/02-register.spec.ts
# UAT SurveyZ : Sign Up (Registration)

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Each run uses a fresh random email so the account does not already exist, e.g. `cyprestesting<random>@hmti.com`.
- The mobile verification code used in UAT is `314159`.

# 2. Sign Up

## 2.1 Sign up — complete flow with bank linking
- On the landing page, click "Sign Up".
- Confirm "Create your account" is shown.
- Type a first name (e.g. `cypress test1`).
- Type a unique email (e.g. `cyprestesting<random>@hmti.com`).
- Type the password `Password1!`.
- Continue to the next step.
- **Profile:** confirm "Create your profile" is shown.
  - Select a gender from the dropdown.
  - Enter date of birth: day `11`, month `11`, year `1998`.
  - Enter postcode `2222`.
  - Continue to the next step.
- **Mobile:** confirm "Mobile Verification" is shown.
  - Enter phone number `0451781802`.
  - Continue to the next step.
- **Verify mobile:** confirm "Enter code sent to your phone." is shown.
  - Enter the code `314159`.
  - Continue to the next step.
- **Welcome:** confirm the "Welcome!" banner is shown, then continue.
- **Link a bank:** search for `bank of statements` and select it.
  - Enter the login username `12345678` and password `TestMyMoney`.
  - Submit the linking form.
  - Confirm the linking completes, then close the flow.

## 2.2 Sign up — complete flow without bank linking
- On the landing page, click "Sign Up".
- Confirm "Create your account" is shown.
- Type a first name (e.g. `cypress test1-nolinking`).
- Type a unique email (e.g. `nolinkcyprestesting<random>@hmti.com`).
- Type the password `Password1!`.
- Continue to the next step.
- **Profile:** confirm "Create your profile" is shown.
  - Select a gender, enter DOB day `10` / month `11` / year `1998`, postcode `2222`.
  - Continue to the next step.
- **Mobile:** enter phone `0451781802` and continue.
- **Verify mobile:** enter code `314159` and continue.
- **Welcome:** confirm the "Welcome!" banner is shown.
- Skip/close bank linking and land on the dashboard.
