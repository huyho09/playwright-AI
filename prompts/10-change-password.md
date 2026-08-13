# File: tests/10-change-password.spec.ts
# UAT SurveyZ : Change Password

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- Test account: `mjktest@code.com`.

# 10. Change Password

## 10.1 Navigate to the change-password screen
- Log in with `mjktest@code.com`.
- Open the hamburger menu and confirm "Security" is present.
- Open Settings → Security → Change password.
- Enter current password `Password1!`, new password `Password1!`, confirm password `Password1`.
- (Screenshot the filled form.)

## 10.2 Change password — mismatched confirmation shows error
- Log in with `mjktest@code.com`.
- Open the hamburger menu → Security → Change password.
- Enter current password `Password1!`, new password `Password1!`, confirm password `Password1` (different).
- Move focus out of the fields.
- Confirm the error "Passwords do not match" is shown.
