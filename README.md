# PRACTICE AUTOMATION TESTING

Automated testing project for `automation exercise` website using Playwright typescript

## Prerequisites

- [Node.js](https://nodejs.org/) v18.x or higher
- [npm](https://www.npmjs.com/) v9.x or higher

## 📦 Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/ThanhSanglt02/PW_HTTS_DUE
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
# Run all tests within the apAddNewKnowleage.spec.ts file
npx playwright test tests/functional/adminPortal/ai/apAddNewKnowleage.spec.ts

# Running Tests by Tag
npx playwright test -g "@chatbot"
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

## 📂 Project Structure

| Path                   | Responsibility   | Description                                                |
| ---------------------- | ---------------- | ---------------------------------------------------------- |
| `.github/workflows/`   | CI/CD            | GitHub Actions configuration for running Playwright tests  |
| `data/`                | Test Data        | Contains test data (JSON, mock data, input values)         |
| `env/.env`             | Environment      | Environment variables (BASE_URL, USERNAME, PASSWORD)       |
| `env/.env.test`        | Test Environment | Environment configuration for test environment             |
| `src/pages/`           | Page Objects     | Contains locators and UI actions following POM pattern     |
| `src/enums/`           | Enums            | Shared enums used across the project                       |
| `src/types/`           | Types            | TypeScript types and interfaces                            |
| `src/utils/`           | Utilities        | Reusable helper functions (formatting, waits, logic)       |
| `tests/`               | Test Specs       | Contains Playwright test cases                             |
| `test-results/`        | Test Results     | Stores test outputs (logs, traces, screenshots on failure) |
| `playwright-report/`   | Report           | HTML report generated after test execution                 |
| `playwright.config.ts` | Configuration    | Playwright configuration (browser, timeout, reporter)      |
| `package.json`         | Dependencies     | Project dependencies and npm scripts                       |
| `README.md`            | Documentation    | Project documentation                                      |

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

## 👤 Author

**Sang Dam** - th.sang1210@gmail.com

## 📜 License

This project is for final exam at university.
