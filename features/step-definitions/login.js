const { Before, After, Given } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

let browser;

Before(async function () {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    this.page = await context.newPage();
});

After(async function () {
    await browser.close();
});

Given('Display the cleartrip application Homepage', async function () {
    await this.page.goto('https://www.cleartrip.com', { waitUntil: 'domcontentloaded' });
});
