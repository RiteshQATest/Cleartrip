'use strict';

/**
 * Page Object Model for the Cleartrip Bus search page.
 * Encapsulates locators and actions for the bus search form.
 */
class BusPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.cleartrip.com/bus-tickets/';

    // Bus tab / navigation
    this.busTab = page.locator('a[href*="bus"], [data-cy="bus"], li:has-text("Bus")').first();

    // Source city input
    this.sourceInput = page.locator(
      '[placeholder*="From"], [placeholder*="Source"], input[name="from"], #fromCity, [data-cy="fromCity"]'
    ).first();

    // Destination city input
    this.destinationInput = page.locator(
      '[placeholder*="To"], [placeholder*="Destination"], input[name="to"], #toCity, [data-cy="toCity"]'
    ).first();

    // Date picker trigger
    this.datePicker = page.locator(
      '[placeholder*="Date"], [data-cy="travelDate"], input[name="date"], .date-input, #travelDate'
    ).first();

    // Search / Find Buses button
    this.searchButton = page.locator(
      'button:has-text("Search"), button:has-text("Find Buses"), [data-cy="searchBtn"], input[type="submit"]'
    ).first();

    // Autocomplete suggestion list
    this.autocompleteSuggestions = page.locator(
      '.autocomplete-suggestions li, .suggestion-item, [role="option"], .dropdown-item'
    );
  }

  /**
   * Navigate directly to the Cleartrip bus search page.
   */
  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }

  /**
   * Fill the source city field and pick the first autocomplete suggestion.
   * @param {string} city
   */
  async enterSourceCity(city) {
    await this.sourceInput.click();
    await this.sourceInput.fill('');
    await this.sourceInput.type(city, { delay: 80 });
    const firstSuggestion = this.autocompleteSuggestions.first();
    await firstSuggestion.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    if (await firstSuggestion.isVisible()) {
      await firstSuggestion.click();
    }
  }

  /**
   * Fill the destination city field and pick the first autocomplete suggestion.
   * @param {string} city
   */
  async enterDestinationCity(city) {
    await this.destinationInput.click();
    await this.destinationInput.fill('');
    await this.destinationInput.type(city, { delay: 80 });
    const firstSuggestion = this.autocompleteSuggestions.first();
    await firstSuggestion.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
    if (await firstSuggestion.isVisible()) {
      await firstSuggestion.click();
    }
  }

  /**
   * Select the given date from the date picker.
   * Tries clicking the matching date cell; falls back to direct input.
   * @param {Date} date
   */
  async selectTravelDate(date) {
    await this.datePicker.click();
    // Wait for the calendar/date-picker widget to become visible
    const calendar = this.page.locator('.DayPicker, .rdp, .calendar, [role="dialog"][aria-label*="date"], [class*="datepicker"]').first();
    await calendar.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});

    const day = date.getDate().toString();

    // Try clicking the day number inside an open calendar widget
    const dayCell = this.page.locator(
      `.DayPicker-Day:not(.DayPicker-Day--outside):not(.DayPicker-Day--disabled):has-text("${day}"),` +
      `td.rdp-day:not([disabled]):has-text("${day}"),` +
      `[aria-label*="${day}"]:not([disabled]),` +
      `[data-day="${day}"]`
    ).first();

    if (await dayCell.isVisible({ timeout: 3000 }).catch(() => false)) {
      await dayCell.click();
    } else {
      // Fallback: type the date directly into the input
      const formatted = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${day.padStart(2, '0')}/${date.getFullYear()}`;
      await this.datePicker.fill(formatted);
      await this.page.keyboard.press('Escape');
    }
  }

  /**
   * Click the Search / Find Buses button.
   */
  async clickSearch() {
    await this.searchButton.click();
  }
}

module.exports = BusPage;
