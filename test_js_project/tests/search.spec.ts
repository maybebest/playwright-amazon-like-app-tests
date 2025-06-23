import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { TestData } from '../data/TestData';

test.describe('Product Search', () => {
  test('should search for a product and display relevant results', async ({
    page,
  }) => {
    // Initialize page object
    const searchPage = new SearchPage(page);

    // Navigate to products page
    await searchPage.navigateToProductsPage();

    // Search for products
    await searchPage.searchForProduct(TestData.SEARCH_KEYWORD);

    // Verify search results page loaded
    await searchPage.verifySearchResultsPageLoaded();

    // Verify search results are visible
    await searchPage.verifySearchResultsVisible();

    // Verify all results contain the search keyword
    // This will fail because of issue in seach functionality - one search result have wrong category
    await searchPage.verifyAllResultsContainKeyword(TestData.SEARCH_KEYWORD);
  });

  test('should verify search functionality with different keywords', async ({
    page,
  }) => {
    const searchPage = new SearchPage(page);

    await searchPage.navigateToProductsPage();

    // Test with different search terms
    const searchTerms = TestData.SEARCH_ITEMS;

    for (const term of searchTerms) {
      await searchPage.searchForProduct(term);
      await searchPage.verifySearchResultsPageLoaded();

      const resultCount = await searchPage.getSearchResultsCount();
      expect(resultCount).toBeGreaterThan(0);
    }
  });

  test('should handle empty search results', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.navigateToProductsPage();

    // Search for a non-existent product
    await searchPage.searchForProduct('NonExistentProduct123');
    await searchPage.verifySearchResultsPageLoaded();

    const resultCount = await searchPage.getSearchResultsCount();
    expect(resultCount).toBe(0);
  });
});
