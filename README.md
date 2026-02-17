
# Playwright UI Tests (TypeScript)

This project is a Playwright + TypeScript test automation project demonstrating:
- basic UI test scenarios
- advanced UI interactions
- data-driven testing
- reusable test patterns

Target website: https://the-internet.herokuapp.com

## Prerequisites
- Node.js
- npm

## Install dependencies
npm install

## Run tests
npx playwright test

## Browser
Chromium only (configured in playwright.config.ts)

## Configuration highlights
- baseURL is set to https://the-internet.herokuapp.com
- Screenshots on failure: enabled
- Videos on failure: enabled

## Test structure
Tests are located in the tests/ folder:

- internet.spec.ts – basic UI tests  
  - Page title check  
  - Navigation to Login page  
  - Successful login  

- advanced-ui.spec.ts – advanced UI interactions  
  - Checkboxes  
  - Dropdowns  
  - Modals  
  - File upload  
  - File download  

- data-driven.spec.ts – data-driven tests  
  - Login scenario with multiple credential sets  

Reusable helpers are located in:
- tests/helpers.ts

Test fixtures:
- tests/fixtures/hello.txt
