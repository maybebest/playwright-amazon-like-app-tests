# TypeScript Playwright Project with Page Object Model

A TypeScript project configured for Playwright testing using the Page Object Model pattern for better maintainability and reusability.

## Project Structure

```
test_js_project/
├── src/
│   └── index.ts                    # Main TypeScript source file
├── pages/
│   ├── BasePage.ts                 # Base page with common functionality
│   ├── HomePage.ts                 # Home page object
│   └── etc        
├── data/
│   └── TestData.ts                 # Centralized test data
├── utils/
│   └── TestUtils.ts                # Common test utilities
├── tests/
│   └── product.spec.ts             # Product tests using Page Object Model
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── playwright.config.ts            # Playwright configuration
└── README.md                       # This file
```

## Page Object Model Architecture

### BasePage

- Common functionality shared across all page objects
- Navigation, element interaction, and utility methods
- Abstract base class for all page objects

### Page Objects

- **HomePage**: Handles home page interactions and product listing
- **ProductDetailPage**: Manages product detail page functionality
- Each page object encapsulates its locators and methods

### Test Data

- **TestData**: Centralized test data, URLs, messages, and constants
- Easy to maintain and update test data in one place

### Utilities

- **TestUtils**: Common helper functions for tests
- Screenshot capture, retry logic, element waiting, etc.

## Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npm run install:browsers
   ```

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run the compiled JavaScript
- `npm run dev` - Run TypeScript directly with ts-node
- `npm test` - Run Playwright tests
- `npm run test:headed` - Run tests with browser UI visible
- `npm run test:ui` - Run tests with Playwright UI mode
- `npm run install:browsers` - Install Playwright browsers

## Running the Application

1. **Development mode:**

   ```bash
   npm run dev
   ```

2. **Production mode:**
   ```bash
   npm run build
   npm start
   ```

## Running Tests

1. **Run all tests:**

   ```bash
   npm test
   ```

2. **Run tests with visible browser:**

   ```bash
   npm run test:headed
   ```

3. **Run tests with UI mode:**
   ```bash
   npm run test:ui
   ```

## Page Object Model Benefits

- **Maintainability**: Locators are centralized in page objects
- **Reusability**: Page methods can be reused across multiple tests
- **Readability**: Tests are more readable and business-focused
- **Scalability**: Easy to add new pages and functionality
- **Separation of Concerns**: UI logic separated from test logic

## Example Usage

```typescript
// Initialize page objects
const homePage = new HomePage(page);
const productDetailPage = new ProductDetailPage(page);

// Navigate and interact
await homePage.navigateToProducts();
const productName = await homePage.getFirstProductName();
await homePage.clickViewProductForFirstItem();

// Verify results
await productDetailPage.verifyProductName(productName);
```

## Features

- **TypeScript Support**: Full TypeScript configuration with strict mode
- **Page Object Model**: Well-structured, maintainable test framework
- **Playwright Testing**: Configured for cross-browser testing
- **Source Maps**: Enabled for better debugging
- **Multiple Browsers**: Tests run on Chromium, Firefox, and WebKit
- **Centralized Data**: Test data and constants in one place
- **Utility Functions**: Common helper functions for tests

## Configuration

- **TypeScript**: Configured for ES2020 with strict mode
- **Playwright**: Set up for parallel testing with HTML reporter
- **Browsers**: Chromium, Firefox, and WebKit support
- **Base URL**: Configured for localhost:3000 (modify as needed)

## Next Steps

1. Install dependencies with `npm install`
2. Install browsers with `npm run install:browsers`
3. Run the example tests with `npm test`
4. Start developing your own page objects and tests!
