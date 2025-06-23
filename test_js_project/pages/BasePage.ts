import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = '/') {
    await this.page.goto(path);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForElement(locator: string) {
    await this.page.waitForSelector(locator);
  }

  async isElementVisible(locator: string): Promise<boolean> {
    return await this.page.locator(locator).isVisible();
  }

  async getElementText(locator: string): Promise<string | null> {
    return await this.page.locator(locator).textContent();
  }

  async clickElement(locator: string) {
    await this.page.locator(locator).click();
  }

  async hoverElement(locator: string) {
    await this.page.locator(locator).hover();
  }
}
