const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

// Launch a Playwright browser and create a fresh page before each scenario
Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

// Close the browser after each scenario
After(async function () {
  await this.browser.close();
});
