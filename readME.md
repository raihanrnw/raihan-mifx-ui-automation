# 🚀 SauceDemo UI Automation - Playwright Framework - Submission QA Engineer in MIFX

**Name:** Raihan Naiwan  
**Target Application:**  https://www.saucedemo.com/  
**Framework:** Playwright + TypeScript  

## Automate Result
Automate Result Video can be found on this link https://drive.google.com/file/d/1oQVlsxhNGmP5j_hAzKKzHMP3mOtmxWGI/view?usp=drive_link

## Overview
This project is automated UI testing for the QA Engineer position at MIFX.
The framework is built using Playwright with TypeScript, since i have experience using it at Traveloka

## Technology Stack
* **Testing Framework:** Playwright Test & TypeScript & Node.js

## Framework Architecture
This project is designed to test maintainability and reusability since im using testData with seperated from the main test file, allowing testdata to be reused across multiple test scenarios without duplicating code.

## Execution Guide (Running via Terminal)
1. Clone this repository and navigate to the project root directory.
2. Ensure your terminal is utilizing Node.js and run npm install followed by npx playwright install --with-deps
3. Execute the test suite using command npx playwright test --project=chromium --headed

## Test Reporting
1. Once the tests complete, you can run the command npx playwright show-report to see report

## Assessment Portfolio
This repository is part of a 3-part submission for the MIFX QA Engineer role. You can view the other projects here:
* [UI Automation (Playwright) ↗](https://github.com/raihanrnw/raihan-mifx-ui-automation)
* [API Automation (Karate) ↗](https://github.com/raihanrnw/raihan-mifx-api-automation)
* [API Data Extraction Utility (Pyhton) ↗](https://github.com/raihanrnw/raihan-mifx-data-extraction)
  
```Directory
playwright-ui-test-mifx-assigment-raihan-naiwan/
├── playwright.config.ts          # Playwright + Chromium config
├── package.json / tsconfig.json
├── pages/LoginPage.ts            # Page Object Model
├── data/testData.ts              # Centralized test data
└── tests/
    ├── positive.test.ts          # positive case scenarios 
    ├── negative.test.ts          # negative case scenarios
    └── boundary-edge.test.ts     # edge/boundary case scenarios

