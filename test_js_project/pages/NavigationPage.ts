import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NavigationPage extends BasePage {
  // Locators
  private readonly categoryText = 'text=Category';
  private readonly categoryMenu = '#accordian';
  private readonly womenCategory = '#Women';
  private readonly menCategory = '#Men';
  private readonly womenDressCategory = 'text=Dress';
  private readonly menTshirtsCategory = 'text=Tshirts';
  private readonly womenDressProductsHeading = 'text=Women - Dress Products';
  private readonly menTshirtsProductsHeading = 'text=Men - Tshirts Products';

  constructor(page: Page) {
    super(page);
  }

  async verifyCategorySidebarVisible() {
    await expect(this.page.getByText('Category')).toBeVisible();
  }

  async clickWomenCategory() {
    await this.page
      .locator(this.categoryMenu)
      .getByText('Women', { exact: true })
      .click();
  }

  async clickMenCategory() {
    await this.page
      .locator(this.categoryMenu)
      .getByText('Men', { exact: true })
      .click();
  }

  async clickWomenDressSubcategory() {
    await this.page.locator(this.womenCategory).getByText('Dress').click();
  }

  async clickMenTshirtsSubcategory() {
    await this.page.locator(this.menCategory).getByText('Tshirts').click();
  }

  async verifyWomenDressProductsPage() {
    await expect(this.page.getByText('Women - Dress Products')).toBeVisible();
  }

  async verifyMenTshirtsProductsPage() {
    await expect(this.page.getByText('Men - Tshirts Products')).toBeVisible();
  }

  async navigateToWomenDressCategory() {
    await this.clickWomenCategory();
    await this.clickWomenDressSubcategory();
    await this.verifyWomenDressProductsPage();
  }

  async navigateToMenTshirtsCategory() {
    await this.clickMenCategory();
    await this.clickMenTshirtsSubcategory();
    await this.verifyMenTshirtsProductsPage();
  }

  async verifyCategoryPageLoaded(expectedHeading: string) {
    await expect(this.page.getByText(expectedHeading)).toBeVisible();
  }
}
