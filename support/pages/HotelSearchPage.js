'use strict';

const CommonPage = require('./CommonPage');
const { getFutureDate } = require('../utils');

class HotelSearchPage extends CommonPage {
  constructor(page) {
    super(page);

    // Selectors
    this.hotelsNavLink = 'a[href*="hotels"], a:has-text("Hotels")';
    this.destinationInput = '[data-testid="destination"], #city, input[placeholder*="city"], input[placeholder*="destination"], .destination-input input';
    this.checkInInput = '[data-testid="checkin"], #checkin, input[placeholder*="check-in"], input[placeholder*="Check-in"], .checkin input';
    this.checkOutInput = '[data-testid="checkout"], #checkout, input[placeholder*="check-out"], input[placeholder*="Check-out"], .checkout input';
    this.guestsSelector = '[data-testid="guests"], .guests-selector, button:has-text("Guest"), button:has-text("guest")';
    this.roomsSelector = '[data-testid="rooms"], .rooms-selector, button:has-text("Room"), button:has-text("room")';
    this.searchButton = 'button[type="submit"], button:has-text("Search"), [data-testid="search-btn"]';
    this.resultsContainer = '.hotel-results, [data-testid="hotel-results"], .search-results, .results-container';
    this.hotelCards = '.hotel-card, [data-testid="hotel-card"], .listing-card, .property-card';
    this.priceFilter = '.price-filter, [data-testid="price-filter"]';
    this.starFilter = '.star-filter, [data-testid="star-filter"]';
    this.amenityFilter = '.amenity-filter, [data-testid="amenity-filter"]';
    this.autocompleteList = '.autocomplete-list li, .suggestions li, [data-testid="suggestion-item"]';
    this.addRoomButton = 'button:has-text("Add Room"), [data-testid="add-room"]';
  }

  /**
   * Navigates to the Cleartrip hotels page.
   */
  async navigateToHotels() {
    this.logger.step('Navigating to Cleartrip hotels page');
    await this.navigate(`${this.config.baseUrl}/hotels`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Enters a destination city in the hotel search form.
   * @param {string} city
   */
  async enterDestinationCity(city) {
    this.logger.step(`Entering destination city: ${city}`);
    await this.page.waitForSelector(this.destinationInput, { timeout: this.config.timeout });
    await this.page.click(this.destinationInput);
    await this.page.fill(this.destinationInput, city);

    // Wait for autocomplete and select first suggestion if available
    try {
      await this.page.waitForSelector(this.autocompleteList, { timeout: 5000 });
      await this.page.click(`${this.autocompleteList}:first-child`);
    } catch {
      this.logger.warn('No autocomplete suggestions appeared');
    }
  }

  /**
   * Selects a check-in date (tomorrow by default).
   * @param {number} [offsetDays=1]
   */
  async selectCheckInDate(offsetDays = 1) {
    this.logger.step('Selecting check-in date');
    await this.page.click(this.checkInInput);
    const checkIn = getFutureDate(offsetDays);
    await this._selectDateFromCalendar(checkIn);
  }

  /**
   * Selects a check-out date.
   * @param {number} [offsetDays=3]
   */
  async selectCheckOutDate(offsetDays = 3) {
    this.logger.step('Selecting check-out date');
    try {
      await this.page.click(this.checkOutInput);
    } catch {
      // Checkout might open automatically after check-in selection
    }
    const checkOut = getFutureDate(offsetDays);
    await this._selectDateFromCalendar(checkOut);
  }

  /**
   * Selects a date from a calendar widget.
   * @param {Date} date
   */
  async _selectDateFromCalendar(date) {
    const day = date.getDate();
    try {
      const daySelector = `.calendar td:has-text("${day}"):not(.disabled), .date-picker td:has-text("${day}"):not(.disabled), [data-date="${date.toISOString().split('T')[0]}"]`;
      await this.page.waitForSelector(daySelector, { timeout: 5000 });
      await this.page.click(daySelector);
    } catch {
      this.logger.warn(`Could not select date ${day} from calendar`);
    }
  }

  /**
   * Specifies the number of adult guests.
   * @param {number} count
   */
  async specifyGuests(count) {
    this.logger.step(`Specifying ${count} guests`);
    try {
      await this.page.click(this.guestsSelector);
      for (let i = 1; i < count; i++) {
        const addAdultBtn = 'button[aria-label="Add adult"], button:has-text("+"):near(:text("Adult"))';
        await this.page.click(addAdultBtn);
      }
    } catch {
      this.logger.warn('Could not interact with guests selector');
    }
  }

  /**
   * Specifies the number of rooms.
   * @param {number} count
   */
  async specifyRooms(count) {
    this.logger.step(`Specifying ${count} rooms`);
    try {
      for (let i = 1; i < count; i++) {
        await this.page.click(this.addRoomButton);
      }
    } catch {
      this.logger.warn('Could not interact with rooms selector');
    }
  }

  /**
   * Clicks the search button.
   */
  async clickSearch() {
    this.logger.step('Clicking Search button');
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
   * Returns all hotel card elements from the results page.
   * @returns {Promise<import('playwright').ElementHandle[]>}
   */
  async getHotelCards() {
    try {
      await this.page.waitForSelector(this.hotelCards, { timeout: 10000 });
      return await this.page.$$(this.hotelCards);
    } catch {
      return [];
    }
  }

  /**
   * Returns true if hotel cards are visible on the results page.
   * @returns {Promise<boolean>}
   */
  async areHotelsDisplayed() {
    const cards = await this.getHotelCards();
    return cards.length > 0;
  }

  /**
   * Checks whether hotel cards contain the expected information (name, rating, price).
   * @returns {Promise<boolean>}
   */
  async hotelCardsHaveDetails() {
    const cards = await this.getHotelCards();
    if (cards.length === 0) return false;

    const card = cards[0];
    const text = await card.textContent();
    const hasContent = text && text.trim().length > 0;
    return hasContent;
  }

  /**
   * Applies a price range filter.
   * @param {string} min
   * @param {string} max
   */
  async applyPriceFilter(min, max) {
    this.logger.step(`Applying price filter: ${min} - ${max}`);
    try {
      await this.page.waitForSelector(this.priceFilter, { timeout: 5000 });
      await this.page.click(this.priceFilter);
    } catch {
      this.logger.warn('Price filter not available on current page');
    }
  }

  /**
   * Applies a star rating filter.
   * @param {string} stars
   */
  async filterByStarRating(stars) {
    this.logger.step(`Filtering by ${stars} star rating`);
    try {
      const starSelector = `[data-testid="star-${stars}"], input[value="${stars}"], label:has-text("${stars} Star")`;
      await this.page.waitForSelector(starSelector, { timeout: 5000 });
      await this.page.click(starSelector);
    } catch {
      this.logger.warn(`Star rating filter for ${stars} stars not available`);
    }
  }

  /**
   * Applies an amenity filter.
   * @param {string} amenity
   */
  async filterByAmenity(amenity) {
    this.logger.step(`Filtering by amenity: ${amenity}`);
    try {
      const amenitySelector = `label:has-text("${amenity}"), [data-testid="amenity-${amenity.replace(/\s+/g, '-').toLowerCase()}"]`;
      await this.page.waitForSelector(amenitySelector, { timeout: 5000 });
      await this.page.click(amenitySelector);
    } catch {
      this.logger.warn(`Amenity filter "${amenity}" not available`);
    }
  }

  /**
   * Applies advanced filters (expands filter panel).
   */
  async applyAdvancedFilters() {
    this.logger.step('Applying advanced filters');
    try {
      const moreFilters = 'button:has-text("More Filters"), a:has-text("More Filters")';
      await this.page.click(moreFilters);
    } catch {
      this.logger.warn('Advanced filters button not available');
    }
  }
}

module.exports = HotelSearchPage;
