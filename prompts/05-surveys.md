# File: tests/05-surveys.spec.ts
# UAT SurveyZ : Surveys

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- "Log in with <email>" means: click "Log In", enter the email and `TEST_PASSWORD`, then submit.
- Account states matter for these assertions:
  - `cyprest1@hmti.com` — linked, has available surveys.
  - `cyprest3@hmti.com` — unlinked, has a survey available (shows the link-account CTA).
  - `heyjude@bt.com` — has completed surveys / no new surveys.
  - `shyf@nba.com` — fixed balance of `$1.50` (do not change).

# 5. Surveys

## 5.1 Surveys — account with existing surveys
- Log in with `cyprest1@hmti.com`.
- Open the "Surveys" tab.
- Confirm the "no surveys" empty state does NOT exist.
- Confirm the inner link-account CTA does NOT exist.

## 5.2 History tab — no completed surveys
- Log in with `cyprest1@hmti.com`.
- Open the "Surveys" tab, then the "History" tab.
- Confirm the "no completed surveys" message is shown.

## 5.3 No new surveys available
- Log in with `heyjude@bt.com`.
- Open the "Surveys" tab.
- Confirm the "no surveys" empty state is shown.

## 5.4 History tab — has completed surveys
- Log in with `heyjude@bt.com`.
- Open the "Surveys" tab, then the "History" tab.
- Confirm the "no completed surveys" message does NOT exist (i.e. completed surveys are listed).

## 5.5 Linked account with survey available
- Log in with `cyprest1@hmti.com`.
- Open the "Surveys" tab.
- Confirm the "no surveys" empty state does NOT exist and the link-account CTA does NOT exist.

## 5.6 Balance card opens from surveys
- Log in with `cyprest1@hmti.com`.
- Open the "Surveys" tab and click the balance card.
- Confirm the balance card opens.

## 5.7 Open and navigate a survey
- Log in with `cyprest1@hmti.com`.
- Open the "Surveys" tab and confirm surveys are available.
- Open a survey card.
- Advance to the next question, confirm the back and next controls are present, then advance again.

## 5.8 Balance value check ($1.50 account)
- Log in with `shyf@nba.com`.
- Open the "Surveys" tab.
- Confirm the balance value shows `1.50`.

## 5.9 Unlinked account with survey available — shows link CTA
- Log in with `cyprest3@hmti.com`.
- Open the "Surveys" tab.
- Confirm the "no surveys" empty state does NOT exist and the link-account CTA IS shown.

## 5.10 Unlinked account — linking explainer slides
- Log in with `heyjude@bt.com`.
- Open the "Surveys" tab and open the "Learn more" linking explainer.
- Confirm the slides show "Encrypted & Secure", then "Private", then "Safe", then "Boost your income" as you advance through them.
