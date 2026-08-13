# File: tests/04-dashboard.spec.ts
# UAT SurveyZ : Dashboard

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- "Log in with <email>" means: click "Log In", enter the email and `TEST_PASSWORD`, then submit.
- These accounts are linked accounts with financial data:
  - `os@gm.co` — general linked account used for most dashboard widgets.
  - `mahesh@fonto.com.au` — used for recent bills / subscriptions checks.

# 4. Dashboard

## 4.1 Promotions — scroll to and check contents
- Log in with `os@gm.co`.
- Scroll the "Promotions" section into view.
- Confirm the promotions content is visible and contains a "Learn more" link.

## 4.2 Recent bills widget
- Log in with `mahesh@fonto.com.au`.
- Confirm the "Recent Bills" widget is visible.
- Scroll the "Recent Bills" section into view.

## 4.3 Subscriptions — no subscriptions state
- Log in with `mahesh@fonto.com.au`.
- Confirm the "Subscriptions" widget is visible.
- Open / scroll the "Subscriptions" section.
- Confirm "No subscriptions identified" is shown.

## 4.4 Cash Flow — period dropdown
- Log in with `os@gm.co`.
- Confirm the "Cash Flow" widget is visible and scroll it into view.
- Open the cash-flow period filter and select each period option in turn (This Month, Last Month, etc.).
- Confirm the cash-flow figures update for each selection.

## 4.5 Income details tab
- Log in with `os@gm.co`.
- Scroll the "Cash Flow" widget into view.
- Open the cash-flow filter and select a period.
- Click the income value to open the income details tab.

## 4.6 Spending details tab
- Log in with `os@gm.co`.
- Scroll the "Cash Flow" widget into view and select a period from the filter.
- Click the spending value to open the spending details tab.
- Confirm the "Categories" and "Merchants" tabs are visible.

## 4.7 Net worth — open from dashboard
- Log in with `os@gm.co`.
- Scroll the "Net worth" section into view and open it.
- Confirm "Total Net Worth" is shown, with "Assets" and "Liabilities" tabs.

## 4.8 Net worth — navigate back to dashboard
- Log in with `os@gm.co`.
- Open the "Net worth" screen and confirm "Total Net Worth" is shown.
- Navigate back to the dashboard/home.
- Confirm the dashboard content is shown again.

## 4.9 Dashboard doughnut chart — change categories
- Log in with `os@gm.co`.
- Confirm the dashboard is loaded.
- Open the doughnut chart's centre selector and choose different categories in turn.
- Confirm the chart updates for each selection, then cancel the selector.
