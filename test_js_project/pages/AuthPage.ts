import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { TestData } from '../data/TestData';

export class AuthPage extends BasePage {
  // Locators
  private readonly signupLoginLink = 'text=Signup / Login';
  private readonly nameInput = '.signup-form [data-qa="signup-name"]';
  private readonly emailInput = '.signup-form [data-qa="signup-email"]';
  private readonly loginEmailInput = '.login-form [data-qa="login-email"]';
  private readonly loginPasswordInput =
    '.login-form [data-qa="login-password"]';
  private readonly signupButton = '[data-qa="signup-button"]';
  private readonly loginButton = '[data-qa="login-button"]';
  private readonly logoutLink = 'text= Logout';
  private readonly deleteAccountLink = 'text=Delete Account';
  private readonly continueButton = 'text=Continue';
  private readonly errorMessage = '.login-form p';

  // Form fields
  private readonly titleMr = 'input[id="id_gender1"]';
  private readonly passwordField = 'input[id="password"]';
  private readonly daysSelect = 'select[id="days"]';
  private readonly monthsSelect = 'select[id="months"]';
  private readonly yearsSelect = 'select[id="years"]';
  private readonly newsletterCheckbox = 'input[id="newsletter"]';
  private readonly optinCheckbox = 'input[id="optin"]';
  private readonly firstName = 'input[id="first_name"]';
  private readonly lastName = 'input[id="last_name"]';
  private readonly company = 'input[id="company"]';
  private readonly address1 = 'input[id="address1"]';
  private readonly address2 = 'input[id="address2"]';
  private readonly country = 'select[id="country"]';
  private readonly state = 'input[id="state"]';
  private readonly city = 'input[id="city"]';
  private readonly zipcode = 'input[id="zipcode"]';
  private readonly mobileNumber = 'input[id="mobile_number"]';
  private readonly createAccountButton = '[data-qa="create-account"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToSignupLogin() {
    await this.clickElement(this.signupLoginLink);
  }

  async verifySignupFormVisible() {
    await expect(
      this.page.getByText(TestData.NEW_USER_SIGNUP_HEADING)
    ).toBeVisible();
  }

  async verifyLoginFormVisible() {
    await expect(
      this.page.getByText(TestData.LOGIN_ACCOUNT_HEADING)
    ).toBeVisible();
  }

  async fillSignupForm(name: string, email: string) {
    await this.page.fill(this.nameInput, name);
    await this.page.fill(this.emailInput, email);
  }

  async submitSignup() {
    await this.clickElement(this.signupButton);
  }

  async verifyAccountInfoFormVisible() {
    await expect(
      this.page.getByText(TestData.ENTER_ACCOUNT_INFORMATION_MESSAGE, {
        exact: false,
      })
    ).toBeVisible();
  }

  async fillAccountInformation(userData: {
    password: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    // Title and password
    await this.page.check(this.titleMr);
    await this.page.fill(this.passwordField, userData.password);

    // Date of birth
    await this.page.selectOption(this.daysSelect, '1');
    await this.page.selectOption(this.monthsSelect, '1');
    await this.page.selectOption(this.yearsSelect, '2000');

    // Checkboxes
    await this.page.check(this.newsletterCheckbox);
    await this.page.check(this.optinCheckbox);

    // Personal details
    await this.page.fill(this.firstName, userData.firstName);
    await this.page.fill(this.lastName, userData.lastName);
    await this.page.fill(this.company, userData.company);
    await this.page.fill(this.address1, userData.address1);
    await this.page.fill(this.address2, userData.address2);
    await this.page.selectOption(this.country, 'Canada');
    await this.page.fill(this.state, userData.state);
    await this.page.fill(this.city, userData.city);
    await this.page.fill(this.zipcode, userData.zipcode);
    await this.page.fill(this.mobileNumber, userData.mobileNumber);
  }

  async createAccount() {
    await this.clickElement(this.createAccountButton);
  }

  async verifyAccountCreated() {
    await expect(
      this.page.getByText(TestData.ACCOUNT_CREATED_MESSAGE, { exact: false })
    ).toBeVisible();
  }

  async continueAfterAccountCreation() {
    await this.clickElement(this.continueButton);
  }

  async verifyUserLoggedIn(username: string) {
    await expect(this.page.getByText(`Logged in as ${username}`)).toBeVisible();
  }

  async deleteAccount() {
    await this.clickElement(this.deleteAccountLink);
  }

  async verifyAccountDeleted() {
    await expect(
      this.page.getByText(TestData.ACCOUNT_DELETED_MESSAGE)
    ).toBeVisible();
  }

  async fillLoginForm(email: string, password: string) {
    await this.page.fill(this.loginEmailInput, email);
    await this.page.fill(this.loginPasswordInput, password);
  }

  async submitLogin() {
    await this.clickElement(this.loginButton);
  }

  async verifyLoggedInAs(username: string) {
    await expect(this.page.getByText('Logged in as')).toContainText(username);
  }

  async logout() {
    await this.clickElement(this.logoutLink);
  }

  async verifyLoggedOut() {
    await expect(
      this.page.getByText(TestData.LOGIN_ACCOUNT_HEADING)
    ).toBeVisible();
  }

  async verifyErrorMessage(text: string) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(text);
  }

  async generateUniqueEmail(): Promise<string> {
    return `testuser_${Date.now()}@example.com`;
  }
}
