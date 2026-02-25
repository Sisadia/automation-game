import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 1, // Run sequentially to avoid flagging rate limits
  reporter: 'html',

  use: {
    // Base URL for the website
    baseURL: 'https://www.sainsburys.co.uk',

    // 🔴 CRITICAL: Must be false. Headless is instantly detected.
    headless: false,

    // 🔴 CRITICAL: Set a real browser viewport (1920x1080)
    viewport: { width: 1920, height: 1080 },

    // 🔴 CRITICAL: Use a real User Agent (Windows 10 / Chrome)
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    
    // Capture evidence on failure
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    
    // Ignore HTTPS errors (common cause of blocks)
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome', // 🔴 CRITICAL: Uses your machine's real Google Chrome installation
        launchOptions: {
            // 🔴 CRITICAL: These args hide the "AutomationControlled" flag
            args: [
                '--disable-blink-features=AutomationControlled',
                '--start-maximized',
                '--no-sandbox', 
                '--disable-infobars',
            ],
            // Remove the "Chrome is being controlled by automated test software" banner
            ignoreDefaultArgs: ['--enable-automation'],
        },
      },
    },
  ],
});