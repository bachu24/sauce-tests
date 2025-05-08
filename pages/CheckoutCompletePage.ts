import { Page } from '@playwright/test';

export class CheckoutCompletePage {
  constructor(private page: Page) {}

  async getConfirmationMessage() {
    return await this.page.locator('.complete-header').textContent();
  }
}