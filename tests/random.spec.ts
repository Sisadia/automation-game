// tests/random.spec.ts
import { test } from '../utils/fixtures';

test('Sainsburys Random Navigation', async ({ homePage,randomPage, page }) => {
  await page.waitForTimeout(2000);
  
 
  await homePage.goto();
  await homePage.acceptCookies();
  
  await randomPage.clickGroceries();
  await randomPage.verifyWelcomeMessage();
  await randomPage.navigateToFruitAndVeg();
});