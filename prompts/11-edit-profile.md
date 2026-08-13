# File: tests/11-edit-profile.spec.ts
# UAT SurveyZ : Edit Profile

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- Test account: `mjktest@code.com`.

# 11. Edit Profile

## 11.1 Edit the profile name
- Log in with `mjktest@code.com`.
- Open the hamburger menu and confirm "Profile" is present.
- Open Settings → Profile → Edit profile.
- Clear the name field and type a new name `MJK Test T`.
- (Leave the edit screen; update is optional.)

## 11.2 Change gender
- Log in with `mjktest@code.com`.
- Open the hamburger menu → Profile → Edit profile.
- Open the gender selector and choose a different option.
- Confirm/save the change.
