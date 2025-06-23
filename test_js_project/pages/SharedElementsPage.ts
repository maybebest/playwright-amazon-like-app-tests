import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SharedElementsPage extends BasePage {
  // Locators
  private readonly continueShoppingButton = '.modal-content .close-modal';
  private readonly shoppingCartButton = '.shop-menu .fa-shopping-cart';

  constructor(page: Page) {
    super(page);
  }

  async continueShopping() {
    await this.waitForElement(this.continueShoppingButton);
    await this.page.locator(this.continueShoppingButton).click();
  }

  async openCart() {
    await this.page.locator(this.shoppingCartButton).click();
  }

  async waitForAddToCartConfirmation() {
    await this.waitForElement(this.continueShoppingButton);
  }
}
