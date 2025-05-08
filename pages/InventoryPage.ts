import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addItemToCart(itemName: string) {
    await this.page.click(`text=${itemName}`);
    await this.page.click('button:has-text("Add to cart")');
    await this.page.goBack();
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}