import { test, expect } from '@playwright/test';
import { LoginPage, DashboardPage } from '../pages/LoginPage';
import { USERS, URLS } from '../data/testData';


console.log("!!! STARTING POSITIVE SCENARIOS !!!");

test.describe('Valid Login', () => {
  // define page object for login and dashboard to be used in tests
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  /*
   * TC-01
   * Title: Verify login page elements are visible on page load
   */
  test('TC-01: Verify login page elements are visible on page load', async () => {
    // assert that all the essential elements of the login page are visible when the page loads
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  /*
   * TC-02
   * Title: Verify successfully login with valid standard_user creadential
   */

  test('TC-02: Verify successfully login with valid standard_user creadential', async ({ page }) => {
    // call the login method with valid credentials with calling test data from testData.ts for better maintainability
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    // assert that we are redirected to the inventory page and the dashboard is displayed
    await expect(page).toHaveURL(URLS.INVENTORY);
    // assert the dashboard page is loaded
    expect(await dashboardPage.isOnDashboard()).toBe(true);
  });

  /*
   * TC-03
   * Title: Verify dashboard displays product inventory after user login
   */

  test('TC-03: Verify dashboard displays product inventory after user login', async () => {
    // call the login method with valid credentials with calling test data from testData.ts for better maintainability
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    // waits for inventory cointainer to be visible and add timeout to avoid test flakiness due to slow loading
    await dashboardPage.inventoryContainer.waitFor({ state: 'visible', timeout: 5000 });
    // assert products are displayed on dashboard
    const productCount = await dashboardPage.getProductCount();
    // veirfy the product is not null
    expect(productCount).toBeGreaterThan(0);
  });

  /*
   * TC-04
   * Title: Verify no error message when user successful login
   */
  test('TC-04: Verify no error message when user successful login', async () => {
    // call the login method with valid credentials with calling test data from testData.ts for better maintainability
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    // assert there's no error message visible after successful login
    expect(await loginPage.isErrorVisible()).toBe(false);
  });

  /*
   * TC-05
   * Title: Verify username fields accepts text
   */
  test('TC-05: Verify username fields accepts text', async () => {
    // fill the username input with a valid username
    await loginPage.usernameInput.fill(USERS.STANDARD.username);
    // assert username input field contains the entered text
    await expect(loginPage.usernameInput).toHaveValue(USERS.STANDARD.username);
  });

  /*
   * TC-06
   * Title: Verify password field is masked
   */
  test('TC-06: Verify password field is masked', async () => {
    // assert the password input field has correct type attribute to mask input
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  /*
   * TC-07
   * Title: Verify shopping cart is visible after login
   */
  test('TC-07: Verify shopping cart is visible after login', async () => {
    // call the login method with valid credentials with calling test data from testData.ts for better maintainability
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    // assert shopping cart icon is visible
    await expect(dashboardPage.shoppingCartBadge).toBeVisible();
  });

  /*
   * TC-08
   * Title: Verify login button is clickable and submits the form
   */
  test('TC-08: Verify login button is clickable and triggers form submission', async ({ page }) => {
    // fill the username and password fields with valid credentials
    await loginPage.usernameInput.fill(USERS.STANDARD.username);
    await loginPage.passwordInput.fill(USERS.STANDARD.password);
    // click the login button
    await loginPage.loginButton.click();

    // verify URL change after clicking
    await expect(page).not.toHaveURL(URLS.BASE);

    console.log("!!! SUCCESS: VERIFYING ALL POSITIVE TEST CASES !!!");
  });


});