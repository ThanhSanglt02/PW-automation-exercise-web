# PRACTICE AUTOMATION TESTING

Automated testing project for `automation exercise` website using Playwright typescript

## Prerequisites

- [Node.js](https://nodejs.org/) v18.x or higher
- [npm](https://www.npmjs.com/) v9.x or higher

## 📦 Installation

### Step 1: Clone the repository

```bash
git clone git@github.com:ThanhSanglt02/PW-automation-exercise-web.git
cd PW_HTTS_DUE
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Install Playwright browsers

```bash
npx playwright install
```

---

## ⚙️ Configuration

Create the `.env` file in the root folder:

```env
BASE_URL=https://your-domain.com
EMAIL=your-email
PASSWORD=your-password
LOG_LEVEL=debug
HEADLESS=false
```

> 📧 Please contact me via **damthithanhsang09@gmail.com** to receive the env file value

---

## 🚀 How to Run Tests

### 1. Available npm scripts

```json
{
    "scripts": {
        "test:all": "dotenvx run -f env/.env.test -f env/.env -- npx playwright test",
        "test:core": "dotenvx run -f .env -- npx playwright test tests/core/coreFlow.spec.ts"
    }
}
```

### 2. Run All Test Cases

```bash
npx playwright test
```

### 3. Run Specific Test Cases

```bash
# Run all tests within the login.spec.ts file
npx playwright test tests/login.spec.ts

# Running Tests by Tag
npx playwright test -g "@login"
```

### 4. Run on Specific Browsers

```bash
# Run on Chromium only
npx playwright test --project=chromium
```

### 5. Run tests in UI mode: <br>

```bash
npx playwright test --ui
```

### 6. Headed Mode and Debugging <br>

    - To watch the browser execution (in Headed mode):

    ```bash
    npx playwright test --headed
    ```

    - To run in Debug mode (using the Playwright Inspector):

    ```bash
    npx playwright test --debug
    ```

## 📊 Reporting

Upon test completion, Playwright generates a rich, interactive HTML repor

1. View HTML Report

```bash
    npx playwright show-report
```

2. Configure Other Reporters <br>
   The default reporter is html. You can configure other reporter types (like list, json, junit) in the playwright.config.ts file.

---

## 📂 Project Structure

| Path                     | Responsibility     | Description                                                                                                                                        |
| :----------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.agents/`               | AI Assistants Data | Stores context data, prompts, and static knowledge for development/testing AI agents (e.g., Codex skills). Contains no secrets.                    |
| `.github/`               | CI/CD              | GitHub Actions pipelines to automatically execute tests, build code, and export reports upon PRs or pushes.                                        |
| `docs/` or `docs/specs/` | Documentation      | Contains project specifications, business logic, test plans, and test case notes for testers and developers.                                       |
| `src/`                   | Source Code        | Root directory for the main source code (page objects, helpers, types, and data); structured for future scalability.                               |
| `src/data/testData.ts`   | Test Data          | Houses test-specific datasets, fixtures, and target input parameters for various test scenarios.                                                   |
| `src/data/constant.ts`   | Constants          | Stores global constants (e.g., system configuration keys, default timeouts, environment names) used by helpers and pages.                          |
| `src/data/payload.ts`    | API Payloads       | Manages reusable sample payload structures for API requests, separating them from general test data.                                               |
| `src/pages/`             | Page Objects       | Implements the Page Object Model (POM). Each file/class maps to a UI page/component containing locators and page-level actions without assertions. |
| `src/types/`             | Types & Interfaces | Defines global TypeScript types and interfaces to ensure type safety and document data structures as the project scales.                           |
| `src/utils/`             | Utilities          | Contains reusable helper functions independent of UI components (e.g., date formatters, retry mechanisms, API clients).                            |
| `tests/`                 | Test Specs         | Contains Playwright automation test scripts and end-to-end test suites that utilize page objects and source data.                                  |
| `playwright.config.ts`   | Configuration      | Defines Playwright framework settings, including browser configurations, global timeouts, and reporting tools.                                     |
| `package.json`           | Dependencies       | Manages project metadata, npm dependencies, third-party libraries, and execution scripts.                                                          |
| `test-results/`          | Test Artifacts     | Auto-generated directory storing execution logs, visual traces, and screenshots from failed test runs.                                             |
| `playwright-report/`     | HTML Report        | Holds the compiled, interactive HTML test execution reports generated after test suites complete.                                                  |

---

## Conventions & Best Practices

- **Data Separation:** Keep test inputs (`testData`), API bodies (`payload`), and system values (`constant`) strictly separated within the data module.
- **POM Discipline:** Page Objects must only manage locators and UI actions. Do not embed test assertions or complex test flows inside page classes.
- **Utility Allocation:** Pure logic, network layers, and I/O operations belong under `src/utils/`. If a helper directly manipulates a UI element, place it inside `src/pages/` instead.
- **Strict Typing:** Maintain strong type definitions within `src/types/` to prevent structural mismatches and handle codebase scaling smoothly.
- **Secret Management:** Never commit credentials or secrets directly to the repository. Use local environment files or CI/CD secret stores.

---

## 🛠️ Troubleshooting

### Common Issues

**1. Browser not installed**

```bash
npx playwright install
```

**2. Test Timeout**

- Increase timeout in playwright.config.ts file

```bash
timeout: 30000
```

**3. Element not found**

- Double check selector on pages folder

---

## 👤 Author

**Sang Dam** - damthithanhsang09@gmail.com

## 📜 License

This project is for personal practice to improve my automation skills and learn about AI
