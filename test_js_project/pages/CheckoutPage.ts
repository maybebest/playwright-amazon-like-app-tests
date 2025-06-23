import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Locators
  private readonly proceedToCheckoutButton = 'text=Proceed To Checkout';
  private readonly addressDetailsHeading = 'text=Address Details';
  private readonly reviewOrderHeading = 'text=Review Your Order';
  private readonly orderMessageTextarea = 'textarea[name="message"]';
  private readonly placeOrderButton = 'text=Place Order';
  private readonly nameOnCardInput = 'input[name="name_on_card"]';
  private readonly cardNumberInput = 'input[name="card_number"]';
  private readonly cvcInput = 'input[name="cvc"]';
  private readonly expiryMonthInput = 'input[name="expiry_month"]';
  private readonly expiryYearInput = 'input[name="expiry_year"]';
  private readonly payAndConfirmButton = 'text=Pay and Confirm Order';
  private readonly orderPlacedMessage = '[data-qa="order-placed"]';

  constructor(page: Page) {
    super(page);
  }

  async proceedToCheckout() {
    await this.clickElement(this.proceedToCheckoutButton);
  }

  async verifyCheckoutPageLoaded() {
    await expect(this.page.getByText('Address Details')).toBeVisible();
    await expect(this.page.getByText('Review Your Order')).toBeVisible();
  }

  async enterOrderMessage(message: string) {
    await this.page.fill(this.orderMessageTextarea, message);
  }

  async placeOrder() {
    await this.clickElement(this.placeOrderButton);
  }

  async fillPaymentDetails(paymentData: {
    nameOnCard: string;
    cardNumber: string;
    cvc: string;
    expiryMonth: string;
    expiryYear: string;
  }) {
    await this.page.fill(this.nameOnCardInput, paymentData.nameOnCard);
    await this.page.fill(this.cardNumberInput, paymentData.cardNumber);
    await this.page.fill(this.cvcInput, paymentData.cvc);
    await this.page.fill(this.expiryMonthInput, paymentData.expiryMonth);
    await this.page.fill(this.expiryYearInput, paymentData.expiryYear);
  }

  async confirmPayment() {
    await this.clickElement(this.payAndConfirmButton);
  }

  async verifyOrderPlaced() {
    await expect(this.page.locator(this.orderPlacedMessage)).toHaveText(
      'Order Placed!'
    );
  }

  async completeCheckoutProcess(
    orderMessage: string,
    paymentData: {
      nameOnCard: string;
      cardNumber: string;
      cvc: string;
      expiryMonth: string;
      expiryYear: string;
    }
  ) {
    await this.proceedToCheckout();
    await this.verifyCheckoutPageLoaded();
    await this.enterOrderMessage(orderMessage);
    await this.placeOrder();
    await this.fillPaymentDetails(paymentData);
    await this.confirmPayment();
    await this.verifyOrderPlaced();
  }
}
