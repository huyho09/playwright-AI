# File: tests/03-signup-error-verification.spec.ts
# UAT SurveyZ : Sign Up — Error Verification

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Each run uses a fresh random email, e.g. `cypreserr<random>@hmti.coms`.
- The mobile verification code used in UAT is `314159`.

# 3. Sign Up — Error Verification

## 3.1 Account step — invalid email and missing password errors
- Click "Sign Up" and confirm "Create your account" is shown.
- Type a first name `cypress test`.
- Type an invalid email `cypres` (no domain).
- Move focus to the password field.
- Confirm "Email is not a valid email address" is visible.
- Try to continue without a password.
- Confirm "Password is required" is visible.

## 3.2 Profile step — accepts valid data after account step
- Complete the account step with a first name, a unique email, and password `Password1!`, then continue.
- Confirm "Create your profile" is shown.
- Select a gender.
- Enter DOB day `11`, month `13`, year `1998`.
- Enter postcode `2222`.
- (Screenshot the profile state.)

## 3.3 Profile step — invalid postcode
- Complete the account step and continue to the profile step.
- Select a gender and enter DOB day `11`, month `13`, year `1998`.
- Enter an invalid postcode `222` (only 3 digits).
- Confirm the postcode is rejected / the form cannot proceed.

## 3.4 Mobile step — invalid (too short) phone number
- Complete the account and profile steps (postcode `2222`) and continue.
- Confirm "Mobile Verification" is shown.
- Enter an incomplete phone number `04517818`.
- Confirm the phone number is rejected / the form cannot proceed.

## 3.5 Verify mobile — wrong verification code
- Complete account, profile, and mobile steps (phone `0451781802`) and continue.
- Confirm "Enter code sent to your phone." is shown.
- Enter an incorrect code `314122`.
- Confirm the code is not accepted.

## 3.6 Verify mobile — phone number without leading zero
- Complete account and profile steps and continue to the mobile step.
- Enter a phone number without the leading zero `452781802`.
- Continue and confirm "Enter code sent to your phone." is shown.
- Enter the code `314159`.

## 3.7 Bank linking — "Can't find your institution?"
- Complete the full sign-up through mobile verification (code `314159`) and reach the "Welcome!" banner, then continue.
- Proceed to bank institution selection and confirm "Select your bank institution" is shown.
- Click "Can't find your bank".
- Confirm "Can't find your institution?" is shown.
- Type an institution name `Bank bank` and submit.
- Confirm the request is submitted, then close the flow.
