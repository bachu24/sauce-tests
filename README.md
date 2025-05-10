# sauce-tests

This project uses Playwright with TypeSCript for end-to-end testing of Sauce Demo web application. The test are structured using the Page Object Model(POM) pattern which makes the tests more maintainable, reusable, and readable.

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
📋 Test Scenarios
- ✅ Login with valid/invalid credentials
- ✅ End-to-End purchase flow

- **Run all tests in headless mode:**
  ```bash
  npm test
  ```

- **OR Run a specific test file:**
  ```bash
   npx playwright test tests/login.spec.ts  
   ```
    ```bash
   npx playwright test tests/purchase.spec.ts  
   ```
- **View HTML test report:**
  ```bash
  npm playwright show-report
  ```

## Design Decisions:
- POM: For easy updates and reusability of codes.
- Assertions: At each critical step to ensure the application behaves as expected. This makes it easier to diagonise the failures.