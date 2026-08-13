# File: tests/14-reset-password.spec.ts
# UAT SurveyZ : Reset Password (email flow)

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- This flow uses a Mailosaur test inbox to read the reset email.
  - `MAILOSAUR_SERVER_ID` and `MAILOSAUR_API_KEY` come from environment variables.
  - The reset email is sent to `test@<MAILOSAUR_SERVER_ID>.mailosaur.net`.
- The new password is randomised, e.g. `Password<random>!`.

# 14. Reset Password

## 14.1 Request a password reset email
- On the landing page, click "Log In".
- Clear the Mailosaur test inbox.
- Type the email `mahesh@fonto.com.au`, then click "Forgot password".
- Confirm the "Reset password" screen is shown.
- Type the Mailosaur test address `test@<MAILOSAUR_SERVER_ID>.mailosaur.net` into the reset email field.
- Click the reset button.
- Confirm a reset email arrives in the Mailosaur inbox and capture the reset link from it.

## 14.2 Reset the password from the emailed link
- Open the reset link captured in 14.1 (follow the redirect to the in-app reset route).
- Confirm "Enter new password" is shown.
- Type a new valid password (e.g. `Password<random>!`) into the new-password and confirm-password fields.
- Click the reset button (click twice if needed to reach the success state).
- Confirm "Your password has been reset" is shown.
