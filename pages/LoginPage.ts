import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  // define parameters for page and locators for login page elements
  private readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;

  constructor(page: Page) {
    // define locators for login page elements
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('.error-button');
  }

  async navigate() {
    // navigate to the login page
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    // fill in username and password and click login button
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    // get the error message text if visible
    return (await this.errorMessage.textContent()) ?? '';
  }

  async isErrorVisible(): Promise<boolean> {
    // check if error message is visible with bolean return type
    return await this.errorMessage.isVisible();
  }

  async clearUsername() {
    // clear the username input field
    await this.usernameInput.clear();
  }

  async clearPassword() {
    // clear the password input field
    await this.passwordInput.clear();
  }

  async dismissError() {
    // click the close X button on error message to dismiss it
    await this.errorCloseButton.click();
  }
}

export class DashboardPage {
  // define parameters for page and locators for dashboard page elements
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly pageTitle: Locator;
  readonly shoppingCartBadge: Locator;
  readonly productList: Locator;

  constructor(page: Page) {
    // define locators for dashboard page elements
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.pageTitle = page.locator('.title');
    this.shoppingCartBadge = page.locator('.shopping_cart_link');
    this.productList = page.locator('.inventory_item');
  }

  async isOnDashboard(): Promise<boolean> {
    // verify if we are on the dashboard page by checking the URL contains /inventory.html
    return this.page.url().includes('/inventory.html');
  }

  async getPageTitle(): Promise<string> {
    // get the page title text 
    return (await this.pageTitle.textContent()) ?? '';
  }

  async getProductCount(): Promise<number> {
    // get the count of products displayed on the dashboard
    return await this.productList.count();
  }
}