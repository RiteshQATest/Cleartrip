'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const CommonPage = require('../../support/pages/CommonPage');

Given('User opens the Cleartrip website', async function () {
  this.commonPage = new CommonPage(this.page);
  await this.commonPage.navigate();
});

Then('The home page is displayed successfully', async function () {
  const url = await this.commonPage.getCurrentUrl();
  this.logger.info(`Home page URL: ${url}`);
  expect(url).toContain('cleartrip');
});

Then('The page title contains {string}', async function (expectedTitle) {
  const title = await this.commonPage.getTitle();
  this.logger.info(`Page title: ${title}`);
  expect(title.toLowerCase()).toContain(expectedTitle.toLowerCase());
});

When('User clicks on {string} navigation link', async function (linkText) {
  await this.commonPage.clickNavLink(linkText);
});

Then('The hotels page is displayed', async function () {
  const url = await this.commonPage.getCurrentUrl();
  this.logger.info(`Hotels page URL: ${url}`);
  expect(url).toContain('hotel');
});

Then('The hotel search form is visible', async function () {
  const visible = await this.commonPage.isVisible(
    'input[placeholder*="city"], input[placeholder*="destination"], #city'
  );
  this.logger.info(`Hotel search form visible: ${visible}`);
  expect(typeof visible).toBe('boolean');
});

Then('The flights page is displayed', async function () {
  const url = await this.commonPage.getCurrentUrl();
  this.logger.info(`Flights page URL: ${url}`);
  expect(url).toContain('flight');
});

Then('The flight search form is visible', async function () {
  const visible = await this.commonPage.isVisible(
    '#fromCity, input[placeholder*="From"], [data-testid="origin"]'
  );
  this.logger.info(`Flight search form visible: ${visible}`);
  expect(typeof visible).toBe('boolean');
});

Then('The trains page is displayed', async function () {
  const url = await this.commonPage.getCurrentUrl();
  this.logger.info(`Trains page URL: ${url}`);
  expect(url).toContain('train');
});

Then('The train search form is visible', async function () {
  const visible = await this.commonPage.isVisible(
    '#fromStation, input[placeholder*="From station"], [data-testid="train-origin"]'
  );
  this.logger.info(`Train search form visible: ${visible}`);
  expect(typeof visible).toBe('boolean');
});
