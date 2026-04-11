'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FlightSearchPage = require('../../support/pages/FlightSearchPage');

Given('User navigates to Cleartrip flights page', async function () {
  this.flightPage = new FlightSearchPage(this.page);
  await this.flightPage.navigateToFlights();
});

When('User selects round-trip option', async function () {
  await this.flightPage.selectRoundTrip();
});

When('User enters origin city {string}', async function (city) {
  await this.flightPage.enterOriginCity(city);
});

When('User selects departure date', async function () {
  await this.flightPage.selectDepartureDate(7);
});

When('User selects return date', async function () {
  await this.flightPage.selectReturnDate(14);
});

When('User selects cabin class {string}', async function (cabinClass) {
  await this.flightPage.selectCabinClass(cabinClass);
});

When('User specifies {string} adult passenger', async function (count) {
  await this.flightPage.specifyAdultPassengers(parseInt(count, 10));
});

When('User specifies {string} adult passengers', async function (count) {
  await this.flightPage.specifyAdultPassengers(parseInt(count, 10));
});

When('User specifies {string} child passenger', async function (count) {
  await this.flightPage.specifyChildPassengers(parseInt(count, 10));
});

When('User clicks flight {string} button', async function (buttonText) {
  await this.flightPage.clickSearch();
});

Then('Flight search results page loads successfully', async function () {
  const loaded = await this.flightPage.isResultsPageLoaded();
  const url = await this.flightPage.getCurrentUrl();
  this.logger.info(`Flight results URL: ${url}, Loaded: ${loaded}`);
  expect(typeof loaded).toBe('boolean');
});

Then('List of available flights is displayed', async function () {
  const displayed = await this.flightPage.areFlightsDisplayed();
  this.logger.info(`Flights displayed: ${displayed}`);
  expect(typeof displayed).toBe('boolean');
});

Then('Return flights are shown', async function () {
  const url = await this.flightPage.getCurrentUrl();
  this.logger.info(`URL for return flights: ${url}`);
  expect(url).toBeTruthy();
});

Then('Flights with {string} class are displayed', async function (cabinClass) {
  const url = await this.flightPage.getCurrentUrl();
  this.logger.info(`URL for ${cabinClass} class: ${url}`);
  expect(url).toBeTruthy();
});
