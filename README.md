# AC-to-Playwright Testing (MCP-assisted)

Acceptance criteria live in `/prompts` as plain English. An AI agent (VS Code Copilot or Claude Code, via the Playwright MCP server) turns them into real Playwright tests in `/tests`. POs/testers edit `/prompts`, not code.

Based on: https://dev.to/yerac/from-acceptance-criteria-to-playwright-tests-with-mcp-4ka6

## Folder structure

```
contexts/playwright-tester-agent.md          agent behaviour spec (how to generate tests)
.github/instructions/agent-pw.instructions.md  scopes that behaviour to "generate tests" requests only
prompts/                                     acceptance criteria, plain English (edit these)
tests/                                       generated Playwright specs (agent writes these)
playwright.config.ts                         test runner config (loads .env, baseURL, report artefacts)
.mcp.json / .vscode/mcp.json                 Playwright MCP server registration (Claude Code / VS Code)
.env                                         test credentials (never commit — gitignored)
.env.example                                 template for .env (committed)
```

## 1. Setup

**Prerequisites:** Node.js 18+, VS Code with GitHub Copilot (or Claude Code), git.

```bash
npm install              # installs @playwright/test, @types/node, dotenv
npx playwright install   # browsers (chromium is already installed by setup)
```

The Playwright MCP server is registered in `.mcp.json` (Claude Code) and `.vscode/mcp.json` (VS Code) and runs on demand via `npx @playwright/mcp@latest` — no global install needed. In VS Code, confirm it via Command Palette → **MCP: List Servers** → **Playwright** → Start. In Claude Code, approve the project MCP server when prompted, then check `/mcp`.

Create `.env` in the repo root (already gitignored — do not commit it):

```
TEST_EMAIL=huytest2@yopmail.com
TEST_PASSWORD=Password@123
```

`.env.example` holds the same keys as a template. Optionally override the target environment with `BASE_URL` (defaults to `https://uatsurveyz.com.au`).

> If `huytest2` gets blocked, don't panic — the login test (see `prompts/login.md`, scenario 1.4) is written to auto-rotate to `huytest3`, `huytest4`, etc. up to 5 attempts. Update `TEST_EMAIL` in `.env` once you know which account currently works, to keep runs fast.

## 2. Generate a test from an AC

1. Open `prompts/login.md` in the editor.
2. Open the Copilot/Claude chat panel in **agent mode**.
3. With `prompts/login.md` in context, ask: `Make tests for this scenario.`
4. The agent explores `https://uatsurveyz.com.au/login` via Playwright MCP and writes `tests/login.spec.ts`. It also stamps the generated file path at the top of `prompts/login.md`.
5. **Review the generated test before trusting it** — check it asserts what the AC actually says, not just "it ran and passed."

To update a test later, edit the AC in `/prompts` and ask the agent to `Update tests for this scenario` — it edits the existing spec rather than creating a duplicate.

To add a new area of coverage, drop another plain-English `.md` file into `/prompts` following the shape of `prompts/login.md` (Before Each / After Each / numbered scenarios) and repeat the steps above.

## 3. Run tests

```bash
npx playwright test                       # headless, all tests
npx playwright test tests/login.spec.ts   # single file
npx playwright test --ui                  # interactive UI mode (recommended for POs)
npx playwright test --headed              # watch the browser as it runs
```

Equivalent npm scripts: `npm test`, `npm run test:ui`, `npm run test:headed`, `npm run report`.

## 4. Read the report

```bash
npx playwright show-report
```

Opens an HTML report in your browser: pass/fail per test, step-by-step trace, screenshots on failure, and video/trace replay you can scrub through to see exactly where a step failed. Screenshots (`only-on-failure`), video (`retain-on-failure`) and trace (`on-first-retry`) are enabled in `playwright.config.ts`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `TEST_EMAIL` | Email/username of the UAT test account |
| `TEST_PASSWORD` | Password for the UAT test account |
| `BASE_URL` | Optional. Target environment, defaults to `https://uatsurveyz.com.au` |

## Security notes

- `.env` must stay in `.gitignore`. Never put real credentials in `/prompts` files — reference them by env var name only, as done in `prompts/login.md`.
- Rotate/replace the UAT test account credentials periodically; treat this `.env` as sensitive even though it's a UAT environment.
