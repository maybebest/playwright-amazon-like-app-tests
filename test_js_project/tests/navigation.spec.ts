import { test } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';
import { TestData } from '../data/TestData';

test.describe('Category Navigation', () => {
  test('should display products by category', async ({ page }) => {
    // Initialize page object
    const navigationPage = new NavigationPage(page);

    // Navigate to home page
    await navigationPage.navigateTo(TestData.BASE_URL);

    // Ensure categories sidebar is visible
    await navigationPage.verifyCategorySidebarVisible();

    // Navigate to Women > Dress category
    await navigationPage.navigateToWomenDressCategory();

    // Navigate to Men > Tshirts category
    await navigationPage.navigateToMenTshirtsCategory();
  });

  test('should verify category navigation functionality', async ({ page }) => {
    const navigationPage = new NavigationPage(page);

    await navigationPage.navigateTo(TestData.BASE_URL);
    await navigationPage.verifyCategorySidebarVisible();

    // Test Women category navigation
    await navigationPage.clickWomenCategory();
    await navigationPage.clickWomenDressSubcategory();
    await navigationPage.verifyCategoryPageLoaded(
      TestData.WOMEN_DRESS_PRODUCTS
    );

    // Test Men category navigation
    await navigationPage.clickMenCategory();
    await navigationPage.clickMenTshirtsSubcategory();
    await navigationPage.verifyCategoryPageLoaded(
      TestData.MEN_TSHIRTS_PRODUCTS
    );
  });
});
