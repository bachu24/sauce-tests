import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('End-to-End Purchase Flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const completePage = new CheckoutCompletePage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.goToCart();
  await cartPage.checkout();
  await checkoutPage.fillInfo('John', 'Doe', '12345');
  await checkoutPage.finishCheckout();
  const confirmation = await completePage.getConfirmationMessage();
  expect(confirmation).toContain('THANK YOU FOR YOUR ORDER');
});
