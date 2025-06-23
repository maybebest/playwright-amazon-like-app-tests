import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { AuthPage } from '../pages/AuthPage';
import { CartPage } from '../pages/CartPage';
import { TestData } from '../data/TestData';

test.describe('Checkout Process', () => {
  test('should allow a logged-in user to place an order successfully', async ({
    page,
    request,
  }) => {
    // Initialize page objects
    const checkoutPage = new CheckoutPage(page);
    const authPage = new AuthPage(page);
    const cartPage = new CartPage(page);

    // Create a user via API for the checkout test
    const email = `checkout_${Date.now()}@example.com`;
    const password = TestData.CHECKOUT_USER_PASSWORD;

    const res = await request.post(TestData.CREATE_ACCOUNT_API, {
      form: {
        name: TestData.CHECKOUT_USER_NAME,
        email,
        password,
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '2000',
        firstname: TestData.CHECKOUT_USER_FIRST_NAME,
        lastname: TestData.CHECKOUT_USER_LAST_NAME,
        company: TestData.CHECKOUT_USER_COMPANY,
        address1: TestData.CHECKOUT_USER_ADDRESS1,
        address2: '',
        country: 'Canada',
        zipcode: TestData.CHECKOUT_USER_ZIPCODE,
        state: TestData.TEST_USER_STATE,
        city: TestData.TEST_USER_CITY,
        mobile_number: TestData.CHECKOUT_USER_MOBILE,
      },
    });
    expect(res.ok()).toBeTruthy();

    // Log in with the new user via UI
    await authPage.navigateTo(TestData.BASE_URL);
    await authPage.navigateToSignupLogin();
    await authPage.fillLoginForm(email, password);
    await authPage.submitLogin();

    // Add a product to the cart
    await cartPage.navigateTo(TestData.PRODUCTS_URL);
    await cartPage.addFirstProductToCart();
    await cartPage.viewCart();

    // Complete checkout process
    await checkoutPage.completeCheckoutProcess(TestData.ORDER_MESSAGE, {
      nameOnCard: TestData.PAYMENT_NAME_ON_CARD,
      cardNumber: TestData.PAYMENT_CARD_NUMBER,
      cvc: TestData.PAYMENT_CVC,
      expiryMonth: TestData.PAYMENT_EXPIRY_MONTH,
      expiryYear: TestData.PAYMENT_EXPIRY_YEAR,
    });
  });
});
