import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { TestData } from '../data/TestData';

test.describe('Authentication', () => {
  test('should register a new user successfully', async ({ page }) => {
    // Initialize page object
    const authPage = new AuthPage(page);

    // Go to the home page
    await authPage.navigateTo(TestData.BASE_URL);

    // Navigate to Signup page
    await authPage.navigateToSignupLogin();
    await authPage.verifySignupFormVisible();

    // Generate unique email and fill signup form
    const email = await authPage.generateUniqueEmail();
    await authPage.fillSignupForm(TestData.TEST_USER_NAME, email);
    await authPage.submitSignup();

    // Verify account information form is visible
    await authPage.verifyAccountInfoFormVisible();

    // Fill out account information
    await authPage.fillAccountInformation({
      password: TestData.TEST_USER_PASSWORD,
      firstName: TestData.TEST_USER_FIRST_NAME,
      lastName: TestData.TEST_USER_LAST_NAME,
      company: TestData.TEST_USER_COMPANY,
      address1: TestData.TEST_USER_ADDRESS1,
      address2: TestData.TEST_USER_ADDRESS2,
      state: TestData.TEST_USER_STATE,
      city: TestData.TEST_USER_CITY,
      zipcode: TestData.TEST_USER_ZIPCODE,
      mobileNumber: TestData.TEST_USER_MOBILE,
    });

    // Create account
    await authPage.createAccount();
    await authPage.verifyAccountCreated();

    // Continue to log in to the new account
    await authPage.continueAfterAccountCreation();
    await authPage.verifyUserLoggedIn(TestData.TEST_USER_NAME);

    // Cleanup: Delete the account to reset state
    await authPage.deleteAccount();
    await authPage.verifyAccountDeleted();
  });

  test('should login with valid credentials', async ({ page, request }) => {
    const authPage = new AuthPage(page);

    // Prepare an existing user account (via API) for the login test
    const timestamp = Date.now();
    const loginEmail = `existing_user_${timestamp}@example.com`;
    const loginPassword = TestData.TEST_USER_PASSWORD;
    const name = TestData.EXISTING_USER_NAME;

    // Create user via API to ensure the account exists for login
    const response = await request.post(TestData.CREATE_ACCOUNT_API, {
      form: {
        name: name,
        email: loginEmail,
        password: loginPassword,
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '2000',
        firstname: 'Existing',
        lastname: 'User',
        company: TestData.TEST_USER_COMPANY,
        address1: '100 Main St',
        address2: '',
        country: 'Canada',
        zipcode: '00000',
        state: TestData.TEST_USER_STATE,
        city: TestData.TEST_USER_CITY,
        mobile_number: '0000000000',
      },
    });
    expect(response.ok()).toBeTruthy();

    // Go to Login page
    await authPage.navigateTo(TestData.BASE_URL);
    await authPage.navigateToSignupLogin();
    await authPage.verifyLoginFormVisible();

    // Enter correct email and password
    await authPage.fillLoginForm(loginEmail, loginPassword);
    await authPage.submitLogin();

    // Verify user is logged in
    await authPage.verifyLoggedInAs(name);

    // Log out of the account
    await authPage.logout();
    await authPage.verifyLoggedOut();
  });

  test('should handle login with invalid credentials', async ({ page }) => {
    const authPage = new AuthPage(page);

    await authPage.navigateTo(TestData.BASE_URL);
    await authPage.navigateToSignupLogin();
    await authPage.verifyLoginFormVisible();

    // Try to login with invalid credentials
    await authPage.fillLoginForm('invalid@email.com', 'wrongpassword');
    await authPage.submitLogin();

    // Verify error message is displayed
    await authPage.verifyErrorMessage(TestData.INCORRECT_CREENTIALS);
  });
});
