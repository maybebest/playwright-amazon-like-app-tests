import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
export class CartPage extends BasePage {
  // Locators
  private readonly addToCartButton = '.product-details .cart';
  private readonly viewCartButton = 'text=View Cart';
  private readonly cartItems = '[id^="product-"]';
  private readonly cartPrice = '.cart_price';
  private readonly cartQuantity = '.cart_quantity';
  private readonly cartTotal = '.cart_total';
  private readonly deleteCartItem = 'a.cart_quantity_delete';
  private readonly quantityInput = 'input[id="quantity"]';

  constructor(page: Page) {
    super(page);
  }

  async addFirstProductToCart() {
    const firstProduct = this.page
      .locator('.product-image-wrapper .productinfo')
      .first();
    await firstProduct.getByText('Add to cart').click();
  }

  async addSecondProductToCart() {
    const secondProduct = this.page
      .locator('.product-image-wrapper .productinfo')
      .nth(1);
    await secondProduct.getByText('Add to cart').click();
  }

  async addProductToCartByIndex(index: number) {
    const product = this.page
      .locator('.product-image-wrapper .productinfo')
      .nth(index);
    await product.getByText('Add to cart').click();
  }

  async setProductQuantity(quantity: string) {
    await this.page.fill(this.quantityInput, quantity);
  }

  async addProductWithQuantity(quantity: string) {
    await this.setProductQuantity(quantity);
    await this.page.waitForSelector(this.addToCartButton);
    await this.page.click(this.addToCartButton);
  }

  async viewCart() {
    await this.clickElement(this.viewCartButton);
  }

  async verifyCartItemCount(expectedCount: number) {
    await expect(this.page.locator(this.cartItems)).toHaveCount(expectedCount);
  }

  async verifyCartItemElements() {
    const cartItems = this.page.locator(this.cartItems);
    const count = await cartItems.count();

    for (let i = 0; i < count; i++) {
      await expect(cartItems.nth(i).locator(this.cartPrice)).toBeVisible();
      await expect(cartItems.nth(i).locator(this.cartQuantity)).toBeVisible();
      await expect(cartItems.nth(i).locator(this.cartTotal)).toBeVisible();
    }
  }

  async verifyCartQuantity(expectedQuantity: string) {
    await expect(this.page.locator('td.cart_quantity')).toContainText(
      expectedQuantity
    );
  }

  async removeProductFromCart() {
    await this.clickElement(this.deleteCartItem);
  }

  async verifyCartIsEmpty() {
    await expect(this.page.getByText('Cart is empty')).toBeVisible();
  }

  async verifyCartHasItems(expectedCount: number) {
    await expect(this.page.locator(this.cartItems)).toHaveCount(expectedCount);
  }

  async getCartItemsCount(): Promise<number> {
    return await this.page.locator(this.cartItems).count();
  }

  async waitForViewCartButton() {
    await this.waitForElement(this.viewCartButton);
  }
}
