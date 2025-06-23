import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { TestData } from '../data/TestData';

test.describe('Product Details', () => {
  test('should display product detail information correctly', async ({
    page,
  }) => {
    // Initialize page objects
    const homePage = new HomePage(page);
    const productDetailPage = new ProductDetailPage(page);

    // Navigate to home page
    await homePage.navigateTo(TestData.BASE_URL);

    // Navigate to products page
    await homePage.navigateToProducts();
    await homePage.verifyAllProductsPageLoaded();

    // Get product name before navigation
    const productName = await homePage.getFirstProductName();
    if (!productName) {
      throw new Error(TestData.PRODUCT_NAME_NOT_FOUND);
    }

    // Click on view product for first item
    await homePage.clickViewProductForFirstItem();

    // Verify navigation to product detail page
    await productDetailPage.verifyUrlPattern();

    // Verify product details are loaded
    await productDetailPage.verifyProductDetailsPageLoaded();

    // Verify product name matches
    await productDetailPage.verifyProductName(productName);
  });

  test('should verify product details page elements', async ({ page }) => {
    const productDetailPage = new ProductDetailPage(page);

    // Navigate to a product detail page (assuming we're already on products page)
    await page.goto('/products');
    await productDetailPage.openFirstProductDetails();

    // Verify all product detail elements are present
    await expect(productDetailPage.isProductDetailsVisible()).resolves.toBe(
      true
    );

    const productName = await productDetailPage.getProductName();
    expect(productName).not.toBeNull();
    expect(productName).not.toBe('');
  });
});
