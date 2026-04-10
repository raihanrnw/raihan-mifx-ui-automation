import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS, INVALID_CREDENTIALS, ERROR_MESSAGES, URLS } from '../data/testData';


console.log("!!! STARTING NEGATIVE SCENARIOS !!!");

test.describe('Negative Test Cases', () => {
  // define page object for login to be used in tests
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  /*
   * TC-01
   * Title: Verify login with empty username and empty password
   */
  test('TC-01: Verify login with empty username and empty password', async () => {
    // click login without entering any credentials
    await loginPage.loginButton.click();
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);
    // asset error msg text contains "Username is required" and using test data from testData.ts for better maintainability
    expect(await loginPage.getErrorMessage()).toContain(ERROR_MESSAGES.MISSING_USERNAME);
  });

  /*
   * TC-02
   * Title: Verify login with valid username and empty password
   */
  test('TC-02: Verify login with valid username and empty password', async () => {
    // using test data from testData.ts for better maintainability
    await loginPage.usernameInput.fill(USERS.STANDARD.username);
    // click login without entering password
    await loginPage.loginButton.click();
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);
    // asset error msg text contains "Password is required" and using test data from testData.ts for better maintainability
    expect(await loginPage.getErrorMessage()).toContain(ERROR_MESSAGES.MISSING_PASSWORD);
  });

  /*
   * TC-03
   * Title: Verify login with empty username and valid password
   */
  test('TC-03: Verify login with empty username and valid password', async () => {
    // using test data from testData.ts for better maintainability
    await loginPage.passwordInput.fill(USERS.STANDARD.password);
    // click login without entering username
    await loginPage.loginButton.click();
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);
    // asset error msg text contains "Username is required" and using test data from testData.ts for better maintainability
    expect(await loginPage.getErrorMessage()).toContain(ERROR_MESSAGES.MISSING_USERNAME);
  });

  /*
   * TC-04
   * Title: Verify login with valid username and wrong password
   */
  test('TC-04: Verify login with valid username and wrong password', async () => {
    // fill username with invalid username and password with valid password using test data from testData.ts for better maintainability
    await loginPage.login(
      INVALID_CREDENTIALS.WRONG_PASSWORD.username,
      INVALID_CREDENTIALS.WRONG_PASSWORD.password
    );
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);
    // asset error msg text contains "Username and password do not match any user in this service" and using test data from testData.ts for better maintainability
    expect(await loginPage.getErrorMessage()).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  /**
   * TC-05
   * Title: Verify login with invalid username and valid password
   */
  test('TC-05: Verify login with invalid username and valid password', async () => {
    // fill username with invalid username and password with valid password using test data from testData.ts for better maintainability
    await loginPage.login(
      INVALID_CREDENTIALS.WRONG_USERNAME.username,
      INVALID_CREDENTIALS.WRONG_USERNAME.password
    );
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);
    // asset error msg text contains "Username and password do not match any user in this service" and using test data from testData.ts for better maintainability
    expect(await loginPage.getErrorMessage()).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  /*
   * TC-06
   * Title: Verify login with invalid username and invalid password
   */
  test('TC-06: Verify login with invalid username and invalid password', async () => {
    // fill username with invalid username and password with valid password using test data from testData.ts for better maintainability
    await loginPage.login(
      INVALID_CREDENTIALS.BOTH_WRONG.username,
      INVALID_CREDENTIALS.BOTH_WRONG.password
    );
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);
    // asset error msg text contains "Username and password do not match any user in this service" and using test data from testData.ts for better maintainability
    expect(await loginPage.getErrorMessage()).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

 
  /**
   * TC-07
   * Title: Verify error banner can be dismissed
   */
  test('TC-07: Verify error banner can be dismissed', async () => {
    // trigger error by attempt login with invalid credentials using test data from testData.ts for better maintainability
    await loginPage.login(
      INVALID_CREDENTIALS.BOTH_WRONG.username,
      INVALID_CREDENTIALS.BOTH_WRONG.password
    );
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);
    // click the error close button
    await loginPage.dismissError();
    // assert error msg is no longer visible
    expect(await loginPage.isErrorVisible()).toBe(false);
  });

  /*
   * TC-08
   * Title: Verify case-sensitive capability on username
   */
  test('TC-08: Verify case-sensitive username is rejected', async () => {
    // attempt login with capalized username and valid password using test data from testData.ts for better maintainability
    await loginPage.login('Standard_User', USERS.STANDARD.password);
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);
    // asset error msg text contains "Username and password do not match any user in this service" and using test data from testData.ts for better maintainability
    expect(await loginPage.getErrorMessage()).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  /**
   * TC-09
   * Title: Verify case-sensitive capability on password
   */
  test('TC-09: Verify case-sensitive capability on password', async () => {
    // attempt login with valid username and capalized password using test data from testData.ts for better maintainability
    await loginPage.login(USERS.STANDARD.username, 'Secret_Sauce');
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);
    // asset error msg text contains "Username and password do not match any user in this service" and using test data from testData.ts for better maintainability
    expect(await loginPage.getErrorMessage()).toContain(ERROR_MESSAGES.INVALID_CREDENTIALS);
  });

  /**
   * TC-10
   * Title: Verify login with whitespace-only username on username field
   */
  test('TC-10: Verify login with whitespace-only username on username field', async ({ page }) => {
    // attempt login with whitespace-only username and valid password using test data from testData.ts for better maintainability
    await loginPage.login('   ', USERS.STANDARD.password);
    // assert url does not change to inventory page
    expect(page.url()).not.toContain('inventory');
    // assert error msg is shown
    expect(await loginPage.isErrorVisible()).toBe(true);
  });

  /**
   * TC-11
   * Title: Verify login with extremely long username & password input 
   */
  test('TC-11: VVerify login with extremely long username & password input ', async ({ page }) => {
    // attempt login with long username and long password using test data from testData.ts for better maintainability
    await loginPage.login(
      INVALID_CREDENTIALS.LONG_INPUT.username,
      INVALID_CREDENTIALS.LONG_INPUT.password
    );

    // page should not crash
    await expect(loginPage.loginButton).toBeVisible();
    // assert url does not change to inventory page
    expect(page.url()).not.toContain('inventory');
    console.log("!!! SUCCESS: VERIFYING ALL NEGATIVE TEST CASES !!!");

  });
});