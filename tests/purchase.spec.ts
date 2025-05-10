import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test.describe('Purchase Flow Tests', () => {
  test('should complete purchase process successfully', async ({ page }) => {
    // Initialize page objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const completePage = new CheckoutCompletePage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    // Step 2: Add items to cart
    const itemName = 'Sauce Labs Backpack';
    await inventoryPage.addItemToCart(itemName);
    
    // Verify item was added to cart
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Step 3: Go to cart and verify item
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('.cart_item')).toContainText(itemName);

    // Step 4: Proceed to checkout
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one/);

    // Step 5: Fill checkout information
    await checkoutPage.fillInfo('John', 'Doe', '12345');
    await expect(page).toHaveURL(/checkout-step-two/);

    // Step 6: Complete checkout
    await checkoutPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete/);

    // Step 7: Verify order confirmation
    const confirmation = await completePage.getConfirmationMessage();
    expect(confirmation).toContain('THANK YOU FOR YOUR ORDER');
    
    // Verify order is complete
    await expect(page.locator('.complete-header')).toBeVisible();
    await expect(page.locator('.complete-text')).toContainText('Your order has been dispatched');
  });

  test('should show error when checkout with empty cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // Go to cart without adding items
    await inventoryPage.goToCart();
    
    // Try to checkout
    await cartPage.checkout();
    
    // Should still be on cart page
    await expect(page).toHaveURL(/cart/);
  });
});
