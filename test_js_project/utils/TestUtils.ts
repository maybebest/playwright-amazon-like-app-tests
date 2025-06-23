import { Page } from '@playwright/test';

export class TestUtils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for a specified amount of time
   * @param ms - Time to wait in milliseconds
   */
  async wait(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Generate a random string of specified length
   * @param length - Length of the random string
   * @returns Random string
   */
  generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  /**
   * Generate a unique email address
   * @returns Unique email address
   */
  generateUniqueEmail(): string {
    const timestamp = Date.now();
    const randomString = this.generateRandomString(8);
    return `test_${timestamp}_${randomString}@example.com`;
  }

  /**
   * Take a screenshot and save it with a descriptive name
   * @param name - Name for the screenshot file
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `screenshots/${name}_${Date.now()}.png`,
    });
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if an element is visible on the page
   * @param selector - CSS selector for the element
   * @returns Promise<boolean> - True if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, {
        state: 'visible',
        timeout: 5000,
      });
      return true;
    } catch {
      return false;
    }
  }

  static async waitForElementToBeVisible(
    page: Page,
    selector: string,
    timeout: number = 5000
  ) {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }

  static async waitForElementToBeHidden(
    page: Page,
    selector: string,
    timeout: number = 5000
  ) {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
  }

  static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError!;
  }

  static async scrollToElement(page: Page, selector: string) {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }
}
