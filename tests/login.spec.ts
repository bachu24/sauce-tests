import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify URL change
    await expect(page).toHaveURL(/inventory/);
    
    // Verify inventory page is loaded
    await expect(page.locator('.inventory_list')).toBeVisible();
    
    // Verify header shows logged in state
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
  });

  test('should show error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('invalid_user', 'wrong_password');
    
    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
    
    // Verify still on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    
    // Verify login form is still visible
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('should show error message with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    // Verify error message
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('locked out');
  });
});