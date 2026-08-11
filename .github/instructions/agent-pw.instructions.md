---
applyTo: '**'
---
If you are being asked to generate tests for a piece of code, and acting in agent mode, follow these instructions:
- Read the instructions in the `contexts/playwright-tester-agent.md` file carefully.
- Follow the step-by-step process outlined in that file to gather context and generate reliable Playwright tests.

On completion, if you used a `.md` file under the `/prompts` folder to generate the tests, update that prompt file to comment the corresponding test file path at the top, e.g. `# File: tests/login.spec.ts`. This helps track which prompts generated which tests, for later updates. NO OTHER changes may be made to the prompt file.

When generating tests the following rules must be followed:
- Never hardcode secrets (emails, passwords, tokens). Read them from `process.env`, loaded via `dotenv`, matching the variable names documented in `README.md`.
- When creating new data, always use unique values to avoid conflicts with existing data.
- All tests that create data must also clean up that data at the end of the test, to avoid polluting the test environment.
- Never delete data that was not created within the test itself.
- If a scenario describes a retry/fallback loop (e.g. rotating to a different test account), implement it as a bounded loop with a clear max-attempts limit - never an unbounded retry.
