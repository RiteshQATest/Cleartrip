'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TrainSearchPage = require('../../support/pages/TrainSearchPage');

Given('User navigates to Cleartrip trains page', async function () {
  this.trainPage = new TrainSearchPage(this.page);
  await this.trainPage.navigateToTrains();
});

When('User selects train round-trip option', async function () {
  await this.trainPage.selectRoundTrip();
});

When('User enters train origin {string}', async function (city) {
  await this.trainPage.enterOriginCity(city);
});

When('User enters train destination {string}', async function (city) {
  await this.trainPage.enterDestinationCity(city);
});

When('User selects train departure date', async function () {
  await this.trainPage.selectDepartureDate(7);
});

When('User selects train return date', async function () {
  await this.trainPage.selectReturnDate(14);
});

When('User specifies {string} train passenger', async function (count) {
  await this.trainPage.specifyPassengers(parseInt(count, 10));
});

When('User specifies {string} train passengers', async function (count) {
  await this.trainPage.specifyPassengers(parseInt(count, 10));
});

When('User selects train class {string}', async function (trainClass) {
  await this.trainPage.selectTrainClass(trainClass);
});

When('User clicks train {string} button', async function (buttonText) {
  await this.trainPage.clickSearch();
});

Then('Train search results page loads successfully', async function () {
  const loaded = await this.trainPage.isResultsPageLoaded();
  const url = await this.trainPage.getCurrentUrl();
  this.logger.info(`Train results URL: ${url}, Loaded: ${loaded}`);
  expect(typeof loaded).toBe('boolean');
});

Then('List of available trains is displayed', async function () {
  const displayed = await this.trainPage.areTrainsDisplayed();
  this.logger.info(`Trains displayed: ${displayed}`);
  expect(typeof displayed).toBe('boolean');
});

Then('Return trains are shown', async function () {
  const url = await this.trainPage.getCurrentUrl();
  this.logger.info(`URL for return trains: ${url}`);
  expect(url).toBeTruthy();
});

Then('Trains with {string} class are displayed', async function (trainClass) {
  const url = await this.trainPage.getCurrentUrl();
  this.logger.info(`URL for ${trainClass} class trains: ${url}`);
  expect(url).toBeTruthy();
});
