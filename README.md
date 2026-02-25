# Sainsbury's Automation Framework 🛒

A robust, scalable automated testing framework for [Sainsbury's](https://www.sainsburys.co.uk/) built with **Playwright** and **TypeScript**.

This project implements the **Page Object Model (POM)** design pattern and includes advanced **Stealth Mode** integration to bypass anti-bot protections (Akamai/WAF).

---

## 🚀 Features

* **Stealth Mode:** Uses `puppeteer-extra-plugin-stealth` and custom browser arguments to mimic human behavior and bypass bot detection.
* **Page Object Model (POM):** Modular architecture separating test logic from UI selectors.
* **Custom Fixtures:** Dependency injection system for cleaner test files (no `new Page()` needed).
* **Headed Execution:** Configured to run in a real Google Chrome instance for maximum reliability.
* **CI/CD Ready:** Includes scripts for headless execution (with xvfb) and artifact retention.

---

## 📂 Project Structure

```text
sainsburys-automation/
├── .github/workflows/      # CI/CD Pipelines
├── pages/                  # Page Object Classes (The "Business Logic")
│   ├── HomePage.ts         # Landing page interactions & cookies
│   ├── SearchPage.ts       # Search results verification
│   └── RandomPage.ts       # Navigation flows (Groceries -> Fruit)
├── tests/                  # Test Specifications
│   ├── search.spec.ts      # Product search tests
│   └── random.spec.ts      # Navigation workflow tests
├── utils/
│   └── fixtures.ts         # Custom "Stealth" fixtures & Dependency Injection
├── playwright.config.ts    # Global configuration
├── package.json            # Scripts and dependencies
└── tsconfig.json           # TypeScript configuration

```

---

## 🛠️ Prerequisites

* **Node.js** (v18 or higher)
* **Google Chrome** (Must be installed locally to use the "Headed" bypass mode)
* **VS Code** (Recommended for debugging)

---

## 📦 Installation

1. **Clone the repository:**
```bash
git clone [link]
cd automation-game

```


2. **Install dependencies:**
```bash
npm install

```


3. **Install Playwright browsers:**
```bash
npx playwright install

```



---

## 🏃‍♂️ Running Tests

Due to strict anti-bot protection, tests are configured to run in **Headed Mode** using the real Chrome browser.

### 1. Run Search Test (Milk/Croissants) [currently unavailable due to the websites restriction]

Executes the product search flow.

```bash
npm run test:search

```

### 2. Run Navigation Flow (Groceries -> Fruit & Veg)

Executes the random navigation test.

```bash
npm run test:random

```

### 3. Debugging (UI Mode)

Opens the interactive Playwright UI for time-travel debugging. Best for fixing flaky tests.

```bash
npm run test:ui

```

### 4. Code Generator

Launch the code generator with stealth settings to record new tests.

```bash
npm run codegen

```

---

## 🧩 Code Overview

### Page Object Model

We do not use hardcoded selectors in test files. All selectors live in `pages/`.

**Example (`pages/SearchPage.ts`):**

```typescript
export class SearchPage {
  readonly pageHeading: Locator;

  constructor(page: Page) {
    this.pageHeading = page.getByTestId('pageHeaderLeftAligned__heading');
  }

  async validateHeading(text: string) {
    await expect(this.pageHeading).toContainText(text);
  }
}

```

### Custom Fixtures (`utils/fixtures.ts`)

We extend the base `test` object to include our Page Objects and Stealth settings.

**Example Usage in Test:**

```typescript
import { test } from '../utils/fixtures';

test('My Test', async ({ homePage, searchPage }) => {
  // homePage and searchPage are auto-initialized!
  await homePage.goto();
  await searchPage.validateHeading('Milk');
});

```

---

## ⚠️ Troubleshooting Anti-Bot Blocks

If tests fail with `Access Denied` or `403 Forbidden`:

1. **Check Headed Mode:** Ensure `headless: false` is set in `playwright.config.ts`.
2. **Concurrency:** Do not run tests in parallel (`workers: 1`).
3. **IP Rotation:** If blocked, wait 5-10 minutes or switch networks (e.g., mobile hotspot) to get a fresh IP address.
4. **Clear Cache:** Delete the `test-results/` folder to remove old browser profiles.
