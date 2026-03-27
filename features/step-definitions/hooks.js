const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

setDefaultTimeout(60 * 1000); // Increase the default step timeout to 60s

let browser;

// Launch browser once before all tests
BeforeAll({ timeout: 60000 }, async function () {
  browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized'],
  });
});

// Create a new context and page before each scenario
Before({ timeout: 60000 }, async function () {
  if (!browser) {
    browser = await chromium.launch({
      headless: false,
      args: ['--start-maximized'],
    });
  }
  try {
    const context = await browser.newContext({ viewport: null });
    this.page = await context.newPage();
    this.context = context;
    this.page.setDefaultTimeout(50000);
    this.page.setDefaultNavigationTimeout(50000);
  } catch (error) {
    console.error('Error in Before hook:', error);
    throw error;
  }
});

// Close page and context after each scenario
After({ timeout: 10000 }, async function () {
  try {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
  } catch (error) {
    console.error('Error closing page/context:', error);
  }
});

// Close browser after all tests
AfterAll({ timeout: 20000 }, async function () {
  try {
    if (browser) {
      await browser.close();
    }
  } catch (error) {
    console.error('Error closing browser:', error);
  }
});
