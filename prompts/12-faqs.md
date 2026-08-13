# File: tests/12-faqs.spec.ts
# UAT SurveyZ : FAQs / Help

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- Test account: `mjktest@code.com`.
- FAQ / help links open an external help site in a new tab.

# 12. FAQs / Help

## 12.1 Open FAQs from the Support menu
- Log in with `mjktest@code.com`.
- Open the hamburger menu and open the "Support" section.
- Click the first FAQ link.
- Confirm the FAQ/help link opens.

## 12.2 Open the help link from the Spending screen
- Log in with `mjktest@code.com`.
- Open the "Spending" screen.
- Click the help (?) icon.
- Confirm the help link opens.

## 12.3 Open the help link from the Wallet screen
- Log in with `mjktest@code.com`.
- Open the "Wallet" screen.
- Click the help (?) icon.
- Confirm the help link opens.

## 12.4 Open the help link from the Surveys screen
- Log in with `mjktest@code.com`.
- Open the "Surveys" screen.
- Click the help (?) icon.
- Confirm the help link opens.
