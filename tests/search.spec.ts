// tests/search.spec.ts
import { test, expect } from '../utils/fixtures';

test.describe('Sainsburys Search', () => {

  // We use the custom fixtures { homePage, searchPage } here
  test('Browse the website', async ({ homePage, searchPage, page }) => {
  
    await page.waitForTimeout(2000);
    
    // 2. Navigate
    await homePage.goto();

    // 3. Handle Cookies
    await homePage.acceptCookies();
    
    await page.getByTestId('nav.item.groceries.title').click();
    await page.getByTestId('homepage-title').click();
    await page.getByTestId('homepage-title').click();
    await expect(page.getByTestId('homepage-title')).toContainText('Welcome to Sainsbury\'s');
    await page.getByTestId('m052-navItem-5').click();
    await expect(page.getByTestId('pageHeaderLeftAligned__heading')).toContainText('Fruit & vegetables');

  });

});