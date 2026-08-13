# File: tests/08-manage-accounts.spec.ts
# UAT SurveyZ : Manage Accounts

# Before Each Test
- Navigate to https://uatsurveyz.com.au/

# After Each Test
- If logged in, log out to reset session state for the next test.

# Notes
- Password for all test accounts comes from the `TEST_PASSWORD` environment variable.
- "Log in with <email>" means: click "Log In", enter the email and `TEST_PASSWORD`, then submit.
- "Open Manage Accounts" means: open the hamburger menu, then open "Manage Accounts", then click "Add account".
- `os@gm.co` is used for most cases; `bio2@test.com` for the add/delete other-asset case.
- Test bank cards in UAT: `bank of statements` (simple), `bank of mfa` (Westpac / CBA MFA flows).

# 8. Manage Accounts

## 8.1 Open Manage Accounts from the hamburger menu
- Log in with `os@gm.co`.
- Open the hamburger menu and open "Manage Accounts", then click "Add account".
- In the account-type sheet, confirm "Bank" and "Super" options are present.
- Select "Bank".

## 8.2 Manage Accounts tab shows Add account
- Log in with `os@gm.co`.
- Open the hamburger menu and confirm "Manage Accounts" is present.
- Open Manage Accounts and confirm the "Add account" action is shown.

## 8.3 Add account — Bank type
- Log in with `os@gm.co` and open Manage Accounts → Add account.
- In the account-type sheet, confirm "Bank" is present and select it.
- Confirm the Bank flow / "Bank" heading is shown.

## 8.4 Add account — Super type
- Log in with `os@gm.co` and open Manage Accounts → Add account.
- Confirm "Bank" and "Super" options are present; select "Super".
- Confirm "Select your super fund" is shown.

## 8.5 Add account — Share trading type
- Log in with `os@gm.co` and open Manage Accounts → Add account.
- Confirm "Share trading" is present; select it.
- Confirm the "Share trading" screen is shown.

## 8.6 Add account — Property type
- Log in with `os@gm.co` and open Manage Accounts → Add account.
- Confirm "Property" is present; select it.
- Confirm the "Property" screen is shown.

## 8.7 Add account — Other assets type
- Log in with `os@gm.co` and open Manage Accounts → Add account.
- Confirm "Add other assets" is present; select it.
- Confirm the "Add other assets" screen is shown.

## 8.8 Add a bank account — happy path
- Log in with `os@gm.co` and open Manage Accounts → Add account.
- Confirm "Add account", open the bank-accounts list, then go back.
- Choose "Add account" → "Bank".
- Search `bank of s` and select "bank of statements".
- Continue, then enter username `12345678` and password `TestMyMoney`.
- Submit the linking form.

## 8.9 Add a bank account — wrong credentials shows error
- Log in with `os@gm.co` and open Manage Accounts → Add account → Bank.
- Search `bank of s` and select "bank of statements".
- Continue, enter username `12345678` and an incorrect password `password`.
- Submit and confirm "Oops, something went wrong" is shown.

## 8.10 Add and delete an "other asset"
- Log in with `bio2@test.com` and open Manage Accounts → Add account.
- Select "Add other assets".
- Enter an asset name `car` and value `2000`, then save.
- Close the flow.
- Re-open Manage Accounts, open the added asset, and delete it.

## 8.11 Add an MFA bank account — Westpac
- Log in with `os@gm.co` and open Manage Accounts → Add account → Bank.
- Search `bank of m` and select "bank of mfa".
- Continue, enter username `westpac` and password `westpac`, then submit.
- On the MFA step, select the first MFA option and continue.

## 8.12 Add an MFA bank account — CBA
- Log in with `os@gm.co` and open Manage Accounts → Add account → Bank.
- Search `bank of m` and select "bank of mfa".
- Continue, enter username `cba` and password `cba`, then submit.
- On the MFA step, enter the code `123456` and continue.

## 8.13 View an already-added account
- Log in with `os@gm.co` and open the hamburger menu → Manage Accounts.
- Open an existing account from the account list.
