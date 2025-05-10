# sauce-tests

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/bachu24/sauce-tests.git
   cd sauce-tests
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## ▶️ Running the Tests

- **Run all tests in headless mode:**
  ```bash
  npm test
  ```

- **Run tests in headed (UI) mode:**
  ```bash
  npm run test:headed
  ```

- **Run tests in debug mode:**
  ```bash
  npm run test:debug
  ```

- **View the HTML test report:**
  ```bash
  npm run test:report
  ```

## 🛠️ Troubleshooting

- **Order confirmation text mismatch:**  
  If you see an error about `"THANK YOU FOR YOUR ORDER"` vs `"Thank you for your order!"`, update your test to match the actual text (case and punctuation matter).

- **Checkout with empty cart:**  
  The Sauce Demo site allows proceeding to checkout with an empty cart. Your test should expect navigation to `/checkout-step-one.html`.

- **Playwright browsers not installed:**  
  If you see browser errors, make sure you ran `npx playwright install`.

- **More help:**  
  Check the Playwright documentation: https://playwright.dev/docs/intro
