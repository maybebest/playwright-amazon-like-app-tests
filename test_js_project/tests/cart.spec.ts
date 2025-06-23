import { test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { TestData } from '../data/TestData';
import { SharedElementsPage } from '../pages/SharedElementsPage';

test.describe('Cart Management', () => {
  test('should add products to the cart and display correct items and totals', async ({
    page,
  }) => {
    // Initialize page object
    const cartPage = new CartPage(page);
    const sharedElementsPage = new SharedElementsPage(page);

    // Navigate to products page
    await cartPage.navigateTo(TestData.PRODUCTS_URL);

    // Add first product to cart
    await cartPage.addFirstProductToCart();
    await sharedElementsPage.continueShopping();

    // Add second product to cart
    await cartPage.addSecondProductToCart();
    await cartPage.viewCart();

    // Verify both products are present in the cart
    await cartPage.verifyCartItemCount(TestData.CART_ITEM_COUNT);

    // Verify each cart item has Price, Quantity, and Total columns visible
    await cartPage.verifyCartItemElements();
  });

  test('should update the product quantity in cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    // Go directly to a product detail page to set a quantity before adding
    await cartPage.navigateTo(TestData.PRODUCT_DETAILS_URL);

    // Add the product to cart with quantity 4
    await cartPage.addProductWithQuantity(TestData.CART_QUANTITY);

    // Go to Cart page to verify
    await cartPage.viewCart();

    // Verify the item in cart shows quantity 4
    await cartPage.verifyCartQuantity(TestData.CART_QUANTITY);
  });

  test('should remove a product from the cart', async ({ page }) => {
    const cartPage = new CartPage(page);

    // Pre-condition: have one product in the cart
    await cartPage.navigateTo(TestData.PRODUCTS_URL);
    await cartPage.addFirstProductToCart();
    await cartPage.viewCart();

    // Verify item is in cart
    await cartPage.verifyCartHasItems(1);

    // Remove the product from cart
    await cartPage.removeProductFromCart();

    // Verify the cart is now empty
    await cartPage.verifyCartIsEmpty();
  });
});
