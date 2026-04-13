const { Before, After, Given } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

Before(async function () {
    this.browser = await chromium.launch({ headless: true });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
});

After(async function () {
    await this.browser.close();
});

Given('Display the cleartrip application Homepage', async function () {
    await this.page.goto('https://www.cleartrip.com', { waitUntil: 'domcontentloaded' });
});
