'use strict';

const { Before, After, setWorldConstructor, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

/**
 * Custom World class – shared context passed to every step definition.
 * Exposes `this.page` (Playwright Page) and `this.browser` (Browser instance).
 */
class CustomWorld {
  constructor({ attach, parameters }) {
    this.attach = attach;
    this.parameters = parameters;
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);

/**
 * Before hook – launch browser and create a fresh page for each scenario.
 */
Before(async function () {
  const headless = process.env.HEADLESS !== 'false';
  this.browser = await chromium.launch({ headless });
  this.context = await this.browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  this.page = await this.context.newPage();
});

/**
 * After hook – capture a screenshot on failure, then close the browser.
 */
After(async function (scenario) {
  try {
    if (scenario.result?.status === Status.FAILED && this.page) {
      const screenshot = await this.page.screenshot({ fullPage: true });
      await this.attach(screenshot, 'image/png');
    }
  } finally {
    if (this.browser) {
      await this.browser.close();
    }
  }
});
