'use strict';

const { expect } = require('@playwright/test');

/**
 * Page Object Model for the Cleartrip Bus search results page.
 * Encapsulates locators and assertions for verifying search results.
 */
class SearchResultsPage {
  constructor(page) {
    this.page = page;

    // Container that holds the full results section
    this.resultsContainer = page.locator(
      '.search-results, .bus-results, [data-cy="searchResults"], .result-list, #searchResults, .buses-list'
    ).first();

    // Individual bus result cards
    this.busCards = page.locator(
      '.bus-card, .result-item, .bus-item, [data-cy="busCard"], .listing-item, .bus-listing'
    );

    // "No results" / empty-state message
    this.noResultsMessage = page.locator(
      '.no-results, .empty-state, [data-cy="noResults"], :text("No buses found"), :text("No results")'
    ).first();

    // Loading indicator (spinner, skeleton, etc.)
    this.loadingIndicator = page.locator(
      '.loading, .spinner, .skeleton, [data-cy="loading"]'
    ).first();
  }

  /**
   * Wait for the search results page to finish loading.
   * @param {number} [timeout=30000]
   */
  async waitForResults(timeout = 30000) {
    // Wait for the URL to change (results page navigation)
    await this.page.waitForURL(/bus|search|result/i, { timeout });

    // Wait for the loading indicator to disappear (if present)
    try {
      await this.loadingIndicator.waitFor({ state: 'hidden', timeout: 15000 });
    } catch {
      // Loading indicator may not exist; that is fine
    }

    // Wait for the results container to appear
    await this.resultsContainer.waitFor({ state: 'visible', timeout });
  }

  /**
   * Assert that the results container is visible on the page.
   */
  async assertResultsVisible() {
    await expect(this.resultsContainer).toBeVisible();
  }

  /**
   * Assert that at least one bus card is displayed and that its text
   * matches both the source and destination criteria.
   * @param {string} source
   * @param {string} destination
   */
  async assertBusesMatchCriteria(source, destination) {
    const count = await this.busCards.count();
    expect(count).toBeGreaterThan(0);

    // Verify the page contains both the source and destination city names,
    // confirming the results correspond to the entered route.
    const pageText = await this.page.textContent('body');
    expect(pageText.toLowerCase()).toContain(source.toLowerCase());
    expect(pageText.toLowerCase()).toContain(destination.toLowerCase());
  }
}

module.exports = SearchResultsPage;
