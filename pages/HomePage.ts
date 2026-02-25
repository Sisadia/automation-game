import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly acceptCookiesBtn: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesBtn = page.locator('#onetrust-accept-btn-handler');
    this.searchInput = page.locator('input[id*="term"], input[name="searchTerm"]'); 
  }

  async goto() {
    // Navigates to the baseURL defined in config
    await this.page.goto('/'); 
    
    // Validation: Ensure the title is correct
    await expect(this.page).toHaveTitle(/Sainsbury's/);
  }

  async acceptCookies() {
    try {
      // Wait briefly for the cookie banner (it might not always appear)
      await this.acceptCookiesBtn.waitFor({ state: 'visible', timeout: 5000 });
      await this.acceptCookiesBtn.click();
    } catch (e) {
      console.log('Cookie banner not found or already accepted.');
    }
  }

  // pages/HomePage.ts

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    
    // FIX: Click the button instead of pressing Enter
    // We try to find the submit button associated with the search form
    const searchButton = this.page.locator('button[type="submit"][data-testid="search-submit"], button[aria-label="Search Sainsbury\'s"]');
    
    // Fallback: If specific button isn't found, try pressing Enter, otherwise click
    if (await searchButton.isVisible()) {
        await searchButton.click();
    } else {
        await this.searchInput.press('Enter');
    }
  }
}


