'use strict';

const CommonPage = require('./CommonPage');
const { getFutureDate } = require('../utils');

class FlightSearchPage extends CommonPage {
  constructor(page) {
    super(page);

    // Selectors
    this.flightsNavLink = 'a[href*="flights"], a:has-text("Flights")';
    this.oneWayOption = 'input[value="ONE_WAY"], label:has-text("One Way"), [data-testid="one-way"]';
    this.roundTripOption = 'input[value="ROUND_TRIP"], label:has-text("Round Trip"), [data-testid="round-trip"]';
    this.originInput = '#fromCity, [data-testid="origin"], input[placeholder*="From"], input[placeholder*="from"]';
    this.destinationInput = '#toCity, [data-testid="destination"], input[placeholder*="To"], input[placeholder*="to"]';
    this.departureDateInput = '[data-testid="departure-date"], #departDate, input[placeholder*="Depart"]';
    this.returnDateInput = '[data-testid="return-date"], #returnDate, input[placeholder*="Return"]';
    this.cabinClassSelector = '[data-testid="cabin-class"], #cabinClass, select[name*="cabin"]';
    this.passengersSelector = '[data-testid="passengers"], .passengers-selector, button:has-text("Traveller")';
    this.searchButton = 'button[type="submit"], button:has-text("Search"), [data-testid="search-flights"]';
    this.resultsContainer = '.flight-results, [data-testid="flight-results"], .search-results';
    this.flightCards = '.flight-card, [data-testid="flight-card"], .flight-listing, .result-item';
    this.autocompleteList = '.autocomplete-list li, .suggestions li, [data-testid="suggestion-item"]';
    this.addAdultButton = 'button[aria-label="Add adult"], button:has-text("+"):near(:text("Adult"))';
    this.addChildButton = 'button[aria-label="Add child"], button:has-text("+"):near(:text("Child"))';
  }

  /**
   * Navigates to the Cleartrip flights page.
   */
  async navigateToFlights() {
    this.logger.step('Navigating to Cleartrip flights page');
    await this.navigate(`${this.config.baseUrl}/flights`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Selects one-way trip option.
   */
  async selectOneWay() {
    this.logger.step('Selecting one-way option');
    try {
      await this.page.click(this.oneWayOption);
    } catch {
      this.logger.warn('One-way option not available or already selected');
    }
  }

  /**
   * Selects round-trip option.
   */
  async selectRoundTrip() {
    this.logger.step('Selecting round-trip option');
    try {
      await this.page.click(this.roundTripOption);
    } catch {
      this.logger.warn('Round-trip option not available');
    }
  }

  /**
   * Enters the origin city.
   * @param {string} city
   */
  async enterOriginCity(city) {
    this.logger.step(`Entering origin city: ${city}`);
    await this.page.click(this.originInput);
    await this.page.fill(this.originInput, city);
    try {
      await this.page.waitForSelector(this.autocompleteList, { timeout: 5000 });
      await this.page.click(`${this.autocompleteList}:first-child`);
    } catch {
      this.logger.warn('No autocomplete suggestions for origin');
    }
  }

  /**
   * Enters the destination city.
   * @param {string} city
   */
  async enterDestinationCity(city) {
    this.logger.step(`Entering destination city: ${city}`);
    await this.page.click(this.destinationInput);
    await this.page.fill(this.destinationInput, city);
    try {
      await this.page.waitForSelector(this.autocompleteList, { timeout: 5000 });
      await this.page.click(`${this.autocompleteList}:first-child`);
    } catch {
      this.logger.warn('No autocomplete suggestions for destination');
    }
  }

  /**
   * Selects the departure date.
   * @param {number} [offsetDays=7]
   */
  async selectDepartureDate(offsetDays = 7) {
    this.logger.step('Selecting departure date');
    try {
      await this.page.click(this.departureDateInput);
      const date = getFutureDate(offsetDays);
      const day = date.getDate();
      const daySelector = `.calendar td:has-text("${day}"):not(.disabled), [data-date="${date.toISOString().split('T')[0]}"]`;
      await this.page.waitForSelector(daySelector, { timeout: 5000 });
      await this.page.click(daySelector);
    } catch {
      this.logger.warn('Could not select departure date');
    }
  }

  /**
   * Selects the return date.
   * @param {number} [offsetDays=14]
   */
  async selectReturnDate(offsetDays = 14) {
    this.logger.step('Selecting return date');
    try {
      await this.page.click(this.returnDateInput);
      const date = getFutureDate(offsetDays);
      const day = date.getDate();
      const daySelector = `.calendar td:has-text("${day}"):not(.disabled), [data-date="${date.toISOString().split('T')[0]}"]`;
      await this.page.waitForSelector(daySelector, { timeout: 5000 });
      await this.page.click(daySelector);
    } catch {
      this.logger.warn('Could not select return date');
    }
  }

  /**
   * Selects a cabin class.
   * @param {string} cabinClass
   */
  async selectCabinClass(cabinClass) {
    this.logger.step(`Selecting cabin class: ${cabinClass}`);
    try {
      await this.page.click(this.cabinClassSelector);
      await this.page.click(`option:has-text("${cabinClass}"), li:has-text("${cabinClass}")`);
    } catch {
      this.logger.warn(`Cabin class ${cabinClass} not available`);
    }
  }

  /**
   * Specifies the number of adult passengers.
   * @param {number} count
   */
  async specifyAdultPassengers(count) {
    this.logger.step(`Specifying ${count} adult passengers`);
    try {
      await this.page.click(this.passengersSelector);
      for (let i = 1; i < count; i++) {
        await this.page.click(this.addAdultButton);
      }
    } catch {
      this.logger.warn('Could not specify adult passengers');
    }
  }

  /**
   * Specifies the number of child passengers.
   * @param {number} count
   */
  async specifyChildPassengers(count) {
    this.logger.step(`Specifying ${count} child passengers`);
    try {
      for (let i = 0; i < count; i++) {
        await this.page.click(this.addChildButton);
      }
    } catch {
      this.logger.warn('Could not specify child passengers');
    }
  }

  /**
   * Clicks the search button.
   */
  async clickSearch() {
    this.logger.step('Clicking flight Search button');
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
   * Returns all flight card elements.
   * @returns {Promise<import('playwright').ElementHandle[]>}
   */
  async getFlightCards() {
    try {
      await this.page.waitForSelector(this.flightCards, { timeout: 10000 });
      return await this.page.$$(this.flightCards);
    } catch {
      return [];
    }
  }

  /**
   * Returns true if flight cards are visible.
   * @returns {Promise<boolean>}
   */
  async areFlightsDisplayed() {
    const cards = await this.getFlightCards();
    return cards.length > 0;
  }
}

module.exports = FlightSearchPage;
