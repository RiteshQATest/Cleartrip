'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const BusPage = require('../pages/BusPage');
const SearchResultsPage = require('../pages/SearchResultsPage');
const testData = require('../support/testData');

// ---------------------------------------------------------------------------
// Given Steps
// ---------------------------------------------------------------------------

Given('User is on the Bus page', async function () {
  const busPage = new BusPage(this.page);
  await busPage.navigate();
  this.busPage = busPage;
});

// ---------------------------------------------------------------------------
// When Steps
// ---------------------------------------------------------------------------

When('User enters valid source and destination cities', async function () {
  const { source, destination } = testData.busSearch;
  await this.busPage.enterSourceCity(source);
  await this.busPage.enterDestinationCity(destination);

  // Store for later assertion
  this.searchSource = source;
  this.searchDestination = destination;
});

When('User selects a valid travel date', async function () {
  const { travelDate } = testData.busSearch;
  await this.busPage.selectTravelDate(travelDate);
});

When('User clicks on the search button', async function () {
  await this.busPage.clickSearch();
});

// ---------------------------------------------------------------------------
// Then Steps
// ---------------------------------------------------------------------------

Then('the search results should be displayed', async function () {
  const resultsPage = new SearchResultsPage(this.page);
  await resultsPage.waitForResults();
  await resultsPage.assertResultsVisible();
  this.resultsPage = resultsPage;
});

Then('the search results should contain buses matching the entered criteria', async function () {
  await this.resultsPage.assertBusesMatchCriteria(
    this.searchSource,
    this.searchDestination
  );
});
