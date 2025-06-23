import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { AuthPage } from '../pages/AuthPage';
import { TestData } from '../data/TestData';
import { SharedElementsPage } from '../pages/SharedElementsPage';

test.describe('Cart Persistence after Login', () => {
  test('should retain cart items after user logs in', async ({
    page,
    request,
  }) => {
    // Initialize page objects
    const cartPage = new CartPage(page);
    const authPage = new AuthPage(page);
    const sharedElementsPage = new SharedElementsPage(page);

    // Create a user account via API (so we have credentials to log in)
    const email = `user_${Date.now()}@example.com`;
    const password = TestData.TEST_USER_PASSWORD;

    const res = await request.post(TestData.CREATE_ACCOUNT_API, {
      form: {
        name: 'TestUser',
        email,
        password,
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '2000',
        firstname: 'Cart',
        lastname: 'User',
        company: TestData.TEST_USER_COMPANY,
        address1: '1 Cart St',
        address2: '',
        country: 'Canada',
        zipcode: '11111',
        state: TestData.TEST_USER_STATE,
        city: TestData.TEST_USER_CITY,
        mobile_number: '1111111111',
      },
    });
    expect(res.ok()).toBeTruthy();

    // As a guest (not logged in), add a product to the cart
    await cartPage.navigateTo(TestData.PRODUCTS_URL);
    await cartPage.addFirstProductToCart();
    await cartPage.viewCart();

    // Verify the product is in the cart (guest cart)
    await cartPage.verifyCartHasItems(1);

    // Now log in with the created user
    await authPage.navigateToSignupLogin();
    await authPage.verifyLoginFormVisible();
    await authPage.fillLoginForm(email, password);
    await authPage.submitLogin();

    // After login, go to Cart page again
    await sharedElementsPage.openCart();

    // Verify the previously added product is still in the cart after login
    await cartPage.verifyCartHasItems(1);
  });

  test('should handle cart persistence with multiple items', async ({
    page,
    request,
  }) => {
    const cartPage = new CartPage(page);
    const authPage = new AuthPage(page);
    const sharedElementsPage = new SharedElementsPage(page);

    // Create user account
    const email = `persistent_${Date.now()}@example.com`;
    const password = TestData.TEST_USER_PASSWORD;

    await request.post(TestData.CREATE_ACCOUNT_API, {
      form: {
        name: 'PersistentUser',
        email,
        password,
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '2000',
        firstname: 'Persistent',
        lastname: 'User',
        company: TestData.TEST_USER_COMPANY,
        address1: '1 Persistent St',
        address2: '',
        country: 'Canada',
        zipcode: '11111',
        state: TestData.TEST_USER_STATE,
        city: TestData.TEST_USER_CITY,
        mobile_number: '1111111111',
      },
    });

    // Add multiple items as guest
    await cartPage.navigateTo(TestData.PRODUCTS_URL);
    await cartPage.addProductToCartByIndex(0);
    await sharedElementsPage.waitForAddToCartConfirmation();
    await sharedElementsPage.continueShopping();

    await cartPage.addProductToCartByIndex(1);
    await cartPage.waitForViewCartButton();
    await cartPage.viewCart();

    // Verify 2 items in guest cart
    await cartPage.verifyCartItemCount(2);

    // Login
    await authPage.navigateToSignupLogin();
    await authPage.fillLoginForm(email, password);
    await authPage.submitLogin();

    // Verify items persist after login
    await sharedElementsPage.openCart();
    await cartPage.verifyCartItemCount(2);
  });
});
