import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  // Locators
  private readonly productDetailsSection = '.product-details';
  private readonly productInformationHeading = '.product-information h2';
  private readonly productDetailsButton = '.product-image-wrapper .choose';
  private readonly productDetailsUrlPattern = /product_details\/\d+/;

  constructor(page: Page) {
    super(page);
  }

  async verifyProductDetailsPageLoaded() {
    await this.waitForElement(this.productDetailsSection);
  }

  async openFirstProductDetails() {
    await this.page.locator(this.productDetailsButton).first().click();
  }

  async verifyProductName(expectedName: string) {
    await this.page.waitForSelector(this.productInformationHeading);
    await expect(this.page.locator(this.productInformationHeading)).toHaveText(
      expectedName
    );
  }

  async verifyUrlPattern() {
    await expect(this.page).toHaveURL(this.productDetailsUrlPattern);
  }

  async isProductDetailsVisible(): Promise<boolean> {
    return await this.isElementVisible(this.productDetailsSection);
  }

  async getProductName(): Promise<string | null> {
    return await this.getElementText(this.productInformationHeading);
  }

  async waitForProductDetailsToLoad() {
    await this.waitForElement(this.productDetailsSection);
  }
}
