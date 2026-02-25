// utils/stealth.ts
import { test as base } from '@playwright/test';
import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';

chromium.use(stealth());

export const test = base.extend({
  page: async ({}, use) => {
    // We launch the browser manually using the stealth wrapper
    const browser = await chromium.launch({ 
        headless: false,
        channel: 'chrome' 
    });
    
    const context = await browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        locale: 'en-GB'
    });
    
    const page = await context.newPage();
    
    // 🔴 Humanize: Add random mouse movement helper
    await page.addInitScript(() => {
        // Overwrite permissions to look real
        const originalQuery = window.navigator.permissions.query;
        window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
            Promise.resolve({ state: Notification.permission } as PermissionStatus) :
            originalQuery(parameters)
        );
    });

    await use(page);
    await browser.close();
  },
});