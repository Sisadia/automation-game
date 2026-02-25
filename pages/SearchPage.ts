// pages/SearchPage.ts
import { type Page, type Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly productGrid: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeading = page.locator('h1');
    // Sainsbury's specific selectors (update if site changes)
    this.productGrid = page.locator('ul.ln-o-grid-list, ul[data-test-id="main-product-grid"]'); 
    this.productCards = this.productGrid.locator('li');
  }

  async validateSearchHeading(expectedText: string) {
    // Wait for heading to be visible first
    await expect(this.pageHeading).toBeVisible({ timeout: 10000 });
    await expect(this.pageHeading).toContainText(expectedText, { ignoreCase: true });
  }

  async validateResultsExist() {
    // Ensure the grid loads
    await expect(this.productGrid).toBeVisible({ timeout: 10000 });
    
    // Ensure at least 1 product is found
    const count = await this.productCards.count();
    // If count is 0, we might need to wait a bit longer for hydration
    if (count === 0) {
        await this.page.waitForTimeout(2000);
    }
    expect(await this.productCards.count()).toBeGreaterThan(0);
  }
}