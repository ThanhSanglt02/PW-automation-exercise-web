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

| Path                       | Responsibility     | Description                                                                                                                                        |
| :------------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.agents/`                 | AI Assistants Data | Stores context data, prompts, and static knowledge for development/testing AI agents. Contains no secrets.                                         |
| `.github/`                 | CI/CD              | Contains GitHub Actions workflows for automated checks and test execution.                                                                         |
| `data/`                    | Shared Data        | Root folder for shared constants, payloads, test data, and TypeScript data types used by specs and page objects.                                   |
| `data/constant.ts`         | Constants          | Stores global constants such as page labels, default values, or reusable configuration values.                                                     |
| `data/payload.ts`          | API Payloads       | Keeps reusable API/request payload structures separate from general test data.                                                                      |
| `data/testData.ts`         | Test Data          | Houses test-specific datasets, fixtures, and input values for test scenarios.                                                                      |
| `data/types.ts`            | Types & Interfaces | Defines shared TypeScript types and interfaces for test data and payload structures.                                                               |
| `docs/`                    | Documentation      | Contains project notes, specifications, test plans, or supporting documentation.                                                                   |
| `src/pages/`               | Page Objects       | Implements the Page Object Model (POM). Each page class owns locators and page-level actions without test assertions.                              |
| `src/pages/components/`    | Page Components    | Contains reusable UI component objects shared across pages, such as `Header.ts`.                                                                   |
| `src/utils/`               | Utilities          | Contains reusable helper modules that are independent from page objects.                                                                           |
| `src/utils/functional/`    | Functional Helpers | Contains functional helpers such as faker data generation and setup helpers.                                                                       |
| `tests/`                   | Test Specs         | Contains Playwright end-to-end specs, currently using `*.spec.ts` naming such as `signup.spec.ts`.                                                 |
| `playwright.config.ts`     | Configuration      | Defines Playwright settings, browser projects, global timeouts, environment loading, and reporters.                                                |
| `package.json`             | Dependencies       | Manages project metadata, dependencies, and package scripts.                                                                                       |
| `pnpm-lock.yaml`           | Lockfile           | Locks dependency versions for reproducible installs with pnpm.                                                                                     |
| `test-results/`            | Test Artifacts     | Auto-generated directory storing execution artifacts such as traces, screenshots, and videos from test runs.                                       |
| `playwright-report/`       | HTML Report        | Holds the interactive HTML report generated by Playwright after test execution.                                                                    |

---

## Conventions & Best Practices

- **Data Separation:** Keep test inputs (`testData`), API bodies (`payload`), shared types (`types`), and system values (`constant`) strictly separated within the root `data/` module.
- **POM Discipline:** Page Objects must only manage locators and UI actions. Do not embed test assertions or complex test flows inside page classes.
- **Utility Allocation:** Pure logic, network layers, and I/O operations belong under `src/utils/`. If a helper directly manipulates a UI element, place it inside `src/pages/` instead.
- **Strict Typing:** Maintain shared type definitions within `data/types.ts` to prevent structural mismatches and keep test data contracts clear.
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
