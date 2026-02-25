// pages/RandomPage.ts
import { type Page, type Locator, expect } from '@playwright/test';

export class RandomPage {
  readonly page: Page;
  readonly groceriesNav: Locator;
  readonly homepageTitle: Locator;
  readonly fruitVegNav: Locator;
  readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Mapping the selectors from your snippet
    this.groceriesNav = page.getByTestId('nav.item.groceries.title');
    this.homepageTitle = page.getByTestId('homepage-title');
    this.fruitVegNav = page.getByTestId('m052-navItem-5'); // "Fruit & vegetables" menu item
    this.pageHeader = page.getByTestId('pageHeaderLeftAligned__heading');
  }

  /**
   * Navigates to the Groceries section
   */
  async clickGroceries() {
    await this.groceriesNav.click();
  }

  /**
   * Clicks the title (as per your snippet) and verifies the text
   */
  async verifyWelcomeMessage() {
    // Your snippet clicked this twice, ensuring interaction
    await this.homepageTitle.click();
    
    // Verify the text content
    await expect(this.homepageTitle).toContainText("Welcome to Sainsbury's");
  }

  /**
   * Navigates to Fruit & Vegetables and verifies the header
   */
  async navigateToFruitAndVeg() {
    await this.fruitVegNav.click();
    await expect(this.pageHeader).toContainText('Fruit & vegetables');
  }
}