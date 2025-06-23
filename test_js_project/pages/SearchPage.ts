import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  // Locators
  private readonly searchInput = 'input[id="search_product"]';
  private readonly submitSearchButton = 'button[id="submit_search"]';
  private readonly searchedProductsHeading = 'text=Searched Products';
  private readonly productResults = '.product-image-wrapper .productinfo';
  private readonly allProductsHeading = 'text=All Products';

  constructor(page: Page) {
    super(page);
  }

  async navigateToProductsPage() {
    await this.navigateTo('/products');
    await this.waitForElement(this.allProductsHeading);
  }

  async searchForProduct(searchTerm: string) {
    await this.page.fill(this.searchInput, searchTerm);
    await this.clickElement(this.submitSearchButton);
  }

  async verifySearchResultsPageLoaded() {
    await this.waitForElement(this.searchedProductsHeading);
  }

  async verifySearchResultsVisible() {
    await expect(this.page.locator(this.productResults).first()).toBeVisible();
  }

  async getSearchResultsCount(): Promise<number> {
    return await this.page.locator(this.productResults).count();
  }

  async verifyAllResultsContainKeyword(keyword: string) {
    const results = this.page.locator(this.productResults);
    const count = await results.count();

    for (let i = 0; i < count; i++) {
      const productName = await results.nth(i).locator('p').textContent();
      expect(productName).toContain(keyword);
    }
  }

  async getProductNameAtIndex(index: number): Promise<string | null> {
    return await this.page
      .locator(this.productResults)
      .nth(index)
      .locator('p')
      .textContent();
  }

  async isSearchResultsPageVisible(): Promise<boolean> {
    return await this.isElementVisible(this.searchedProductsHeading);
  }
}
