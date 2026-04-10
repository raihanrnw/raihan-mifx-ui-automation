import { test, expect } from '@playwright/test';
import { LoginPage, DashboardPage } from '../pages/LoginPage';
import { USERS, URLS } from '../data/testData';

console.log("!!! STARTING BOUNDARY & EDGE CASE TESTS !!!");


test.describe('Boundary & Edge Case Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  /*
   * TC-01
   * Title: Verify hit direct URL to inventory page without login
   */
  test('TC-01:Verify hit direct URL to inventory page without login', async ({ page }) => {
    // attempt to navigate directly to inventory page without logging in
    await page.goto(URLS.INVENTORY);
    // assert we still in login page and not redirected to inventory page
    await expect(page).toHaveURL(URLS.BASE);
    // assert login button is visible to confirm we are on login page
    await expect(loginPage.loginButton).toBeVisible();
  });

  /*
   * TC-02
   * Title: Verify Back button after logout invalidates session
   */
  test('TC-02: Verify Back button after logout invalidates session', async ({ page }) => {
    // login with valid credentials using test data from testData.ts for better maintainability
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    // assert we are on inventory page
    await expect(page).toHaveURL(URLS.INVENTORY);

    // logout 
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();

    // assert we are back on login page
    await expect(page).toHaveURL(URLS.BASE);

    // press browser back button
    await page.goBack();

    // assert we are still on login page and error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true); 
  });

  /**
   * TC-03
   * Title: Verify login with username containing leading/trailing spaces
   */
  test('TC-03: Verify login with username containing leading/trailing spaces', async ({ page }) => {
    // attempt login with valid username with leading/trailing spaces and valid password using test data from testData.ts for better maintainability
    await loginPage.login(' standard_user ', USERS.STANDARD.password);
    // assert url does not change to inventory page
    expect(page.url()).not.toContain('inventory');
  });

  /**
   * TC-04
   * Title: Verify login works correctly after failed attempt (re-entry)
   */
  test('TC-04: Verify login works correctly after failed attempt (re-entry)', async ({ page }) => {
    // first attempt login with wrong credentials first
    await loginPage.login('wrong_user', 'wrong_pass');
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);

    // second attempt login with correct credentials using test data from testData.ts for better maintainability
    await loginPage.clearUsername();
    await loginPage.clearPassword();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);

    // assert we are redirected to inventory page and the dashboard is displayed
    await expect(page).toHaveURL(URLS.INVENTORY);

        console.log("!!! SUCCESS: VERIFYING ALL BOUNDARY & EDGE CASES !!!");

  });

});