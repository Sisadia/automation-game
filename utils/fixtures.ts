// utils/fixtures.ts
import { test as base, expect } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { RandomPage } from '../pages/RandomPage';

// 1. Activate Stealth Plugin
chromium.use(stealth());

type MyFixtures = {
  homePage: HomePage;
  searchPage: SearchPage;
  randomPage: RandomPage;
};

export const test = base.extend<MyFixtures>({
  // Override the default 'page' fixture
  page: async ({}, use) => {
    
    // 2. Launch Browser with CRITICAL Anti-Bot Args
    // (We must repeat these here because this manual launch ignores playwright.config.ts)
    const browser = await chromium.launch({ 
      headless: false, 
      channel: 'chrome', 
      args: [
        '--disable-blink-features=AutomationControlled', // 🔴 Critical: Hides "navigator.webdriver"
        '--start-maximized',
        '--no-sandbox', 
        '--disable-infobars',
      ],
      ignoreDefaultArgs: ['--enable-automation'], // 🔴 Critical: Removes "controlled by automation" bar
    });

    // 3. Create Context (Fixing the Error)
    const context = await browser.newContext({
      // 🔴 FIX: When viewport is null (full size), deviceScaleFactor must be undefined
      viewport: null, 
      deviceScaleFactor: undefined, 
      
      // 🔴 CRITICAL: Use the Real User Agent (Windows 10 / Chrome)
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      
      // Optional: Set locale for UK site
      locale: 'en-GB',
      timezoneId: 'Europe/London',
    });

    const page = await context.newPage();

    await use(page);

    // Cleanup
    await browser.close();
  },

  // Initialize Page Objects
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  randomPage: async ({ page }, use) => {
    await use(new RandomPage(page));
  },
});

export { expect };