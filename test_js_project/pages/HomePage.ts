import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Locators
  private readonly productsLink = 'text=Products';
  private readonly allProductsHeading = 'text=All Products';
  private readonly firstProductWrapper = '.product-image-wrapper .choose';
  private readonly firstProductName = '.product-image-wrapper .productinfo p';
  private readonly viewProductButton = 'text=View Product';

  constructor(page: Page) {
    super(page);
  }

  async navigateToProducts() {
    await this.clickElement(this.productsLink);
    await this.waitForElement(this.allProductsHeading);
  }

  async getFirstProductName(): Promise<string | null> {
    return await this.page.locator(this.firstProductName).first().textContent();
  }

  async clickViewProductForFirstItem() {
    const firstProduct = this.page.locator(this.firstProductWrapper).first();
    await firstProduct.locator(this.viewProductButton).click();
  }

  async verifyAllProductsPageLoaded() {
    await this.page.waitForSelector(this.allProductsHeading);
  }

  async isAllProductsVisible(): Promise<boolean> {
    return await this.isElementVisible(this.allProductsHeading);
  }
}
