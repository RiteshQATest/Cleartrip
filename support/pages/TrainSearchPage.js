'use strict';

const CommonPage = require('./CommonPage');
const { getFutureDate } = require('../utils');

class TrainSearchPage extends CommonPage {
  constructor(page) {
    super(page);

    // Selectors
    this.trainsNavLink = 'a[href*="trains"], a:has-text("Trains")';
    this.oneWayOption = 'label:has-text("One Way"), [data-testid="one-way-train"]';
    this.roundTripOption = 'label:has-text("Round Trip"), [data-testid="round-trip-train"]';
    this.originInput = '#fromStation, [data-testid="train-origin"], input[placeholder*="From station"], input[placeholder*="from station"]';
    this.destinationInput = '#toStation, [data-testid="train-destination"], input[placeholder*="To station"], input[placeholder*="to station"]';
    this.departureDateInput = '[data-testid="train-departure"], #trainDate, input[placeholder*="Journey date"]';
    this.returnDateInput = '[data-testid="train-return"], input[placeholder*="Return date"]';
    this.passengersSelector = '[data-testid="train-passengers"], .train-passengers';
    this.classSelector = '[data-testid="train-class"], select[name*="class"], .class-selector';
    this.searchButton = 'button[type="submit"], button:has-text("Search Trains"), button:has-text("Search"), [data-testid="search-trains"]';
    this.resultsContainer = '.train-results, [data-testid="train-results"], .search-results';
    this.trainCards = '.train-card, [data-testid="train-card"], .train-listing, .result-item';
    this.autocompleteList = '.autocomplete-list li, .suggestions li, [data-testid="suggestion-item"]';
    this.addPassengerButton = 'button[aria-label="Add passenger"], button:has-text("+"):near(:text("Passenger"))';
  }

  /**
   * Navigates to the Cleartrip trains page.
   */
  async navigateToTrains() {
    this.logger.step('Navigating to Cleartrip trains page');
    await this.navigate(`${this.config.baseUrl}/trains`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Selects round-trip option.
   */
  async selectRoundTrip() {
    this.logger.step('Selecting round-trip train option');
    try {
      await this.page.click(this.roundTripOption);
    } catch {
      this.logger.warn('Round-trip option not available');
    }
  }

  /**
   * Enters the origin station/city.
   * @param {string} city
   */
  async enterOriginCity(city) {
    this.logger.step(`Entering train origin: ${city}`);
    await this.page.click(this.originInput);
    await this.page.fill(this.originInput, city);
    try {
      await this.page.waitForSelector(this.autocompleteList, { timeout: 5000 });
      await this.page.click(`${this.autocompleteList}:first-child`);
    } catch {
      this.logger.warn('No autocomplete suggestions for train origin');
    }
  }

  /**
   * Enters the destination station/city.
   * @param {string} city
   */
  async enterDestinationCity(city) {
    this.logger.step(`Entering train destination: ${city}`);
    await this.page.click(this.destinationInput);
    await this.page.fill(this.destinationInput, city);
    try {
      await this.page.waitForSelector(this.autocompleteList, { timeout: 5000 });
      await this.page.click(`${this.autocompleteList}:first-child`);
    } catch {
      this.logger.warn('No autocomplete suggestions for train destination');
    }
  }

  /**
   * Selects the departure date.
   * @param {number} [offsetDays=7]
   */
  async selectDepartureDate(offsetDays = 7) {
    this.logger.step('Selecting train departure date');
    try {
      await this.page.click(this.departureDateInput);
      const date = getFutureDate(offsetDays);
      const day = date.getDate();
      const daySelector = `.calendar td:has-text("${day}"):not(.disabled), [data-date="${date.toISOString().split('T')[0]}"]`;
      await this.page.waitForSelector(daySelector, { timeout: 5000 });
      await this.page.click(daySelector);
    } catch {
      this.logger.warn('Could not select train departure date');
    }
  }

  /**
   * Selects the return date.
   * @param {number} [offsetDays=14]
   */
  async selectReturnDate(offsetDays = 14) {
    this.logger.step('Selecting train return date');
    try {
      await this.page.click(this.returnDateInput);
      const date = getFutureDate(offsetDays);
      const day = date.getDate();
      const daySelector = `.calendar td:has-text("${day}"):not(.disabled), [data-date="${date.toISOString().split('T')[0]}"]`;
      await this.page.waitForSelector(daySelector, { timeout: 5000 });
      await this.page.click(daySelector);
    } catch {
      this.logger.warn('Could not select train return date');
    }
  }

  /**
   * Specifies the number of passengers.
   * @param {number} count
   */
  async specifyPassengers(count) {
    this.logger.step(`Specifying ${count} train passengers`);
    try {
      await this.page.click(this.passengersSelector);
      for (let i = 1; i < count; i++) {
        await this.page.click(this.addPassengerButton);
      }
    } catch {
      this.logger.warn('Could not specify train passengers');
    }
  }

  /**
   * Selects a train class.
   * @param {string} trainClass
   */
  async selectTrainClass(trainClass) {
    this.logger.step(`Selecting train class: ${trainClass}`);
    try {
      await this.page.click(this.classSelector);
      await this.page.click(`option:has-text("${trainClass}"), li:has-text("${trainClass}")`);
    } catch {
      this.logger.warn(`Train class ${trainClass} not available`);
    }
  }

  /**
   * Clicks the search button.
   */
  async clickSearch() {
    this.logger.step('Clicking train Search button');
    await this.page.click(this.searchButton);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Returns true when the results container is visible.
   * @returns {Promise<boolean>}
   */
  async isResultsPageLoaded() {
    try {
      await this.page.waitForSelector(this.resultsContainer, { timeout: 30000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Returns all train card elements.
   * @returns {Promise<import('playwright').ElementHandle[]>}
   */
  async getTrainCards() {
    try {
      await this.page.waitForSelector(this.trainCards, { timeout: 10000 });
      return await this.page.$$(this.trainCards);
    } catch {
      return [];
    }
  }

  /**
   * Returns true if train cards are visible.
   * @returns {Promise<boolean>}
   */
  async areTrainsDisplayed() {
    const cards = await this.getTrainCards();
    return cards.length > 0;
  }
}

module.exports = TrainSearchPage;
