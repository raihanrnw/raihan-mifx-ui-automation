// defined test data for login tests for reusability and maintainability
export const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
  }
};
// defined invalid credentials for negative test cases
export const INVALID_CREDENTIALS = {
  WRONG_PASSWORD: {
    username: 'standard_user',
    password: 'wrong_pwd',
  },
  WRONG_USERNAME: {
    username: 'invalid_usr',
    password: 'secret_sauce',
  },
  BOTH_WRONG: {
    username: 'invalid_usr',
    password: 'invalid_pwd',
  },
  LONG_INPUT: {
    username: 'x'.repeat(256),
    password: 'x'.repeat(256),
  },
};

// defined expected error messages for login failure scenarios for easier assertions in tests
export const ERROR_MESSAGES = {
  MISSING_USERNAME: 'Epic sadface: Username is required',
  MISSING_PASSWORD: 'Epic sadface: Password is required',
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
};

// defined URL for easy maintenance and reuse across tests
export const URLS = {
  BASE: 'https://www.saucedemo.com/',
  INVENTORY: 'https://www.saucedemo.com/inventory.html',
};