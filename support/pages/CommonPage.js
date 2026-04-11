'use strict';

const config = require('../config');
const logger = require('../logger');

class CommonPage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    this.page = page;
    this.config = config;
    this.logger = logger;
  }

  /**
   * Navigates to the given URL.
   * @param {string} [url]
   */
  async navigate(url) {
    const target = url || this.config.baseUrl;
    this.logger.info(`Navigating to: ${target}`);
    await this.page.goto(target, { waitUntil: 'domcontentloaded', timeout: this.config.timeout });
  }

  /**
   * Returns the page title.
   * @returns {Promise<string>}
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Returns the current URL.
   * @returns {Promise<string>}
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  /**
   * Waits for an element matching the selector to be visible.
   * @param {string} selector
   * @param {number} [timeout]
   */
  async waitForElement(selector, timeout) {
    await this.page.waitForSelector(selector, {
      state: 'visible',
      timeout: timeout || this.config.timeout
    });
  }

  /**
   * Clicks a navigation link by its visible text.
   * @param {string} linkText
   */
  async clickNavLink(linkText) {
    this.logger.step(`Clicking navigation link: ${linkText}`);
    await this.page.click(`a:has-text("${linkText}")`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Clicks an element matching the given selector.
   * @param {string} selector
   */
  async click(selector) {
    this.logger.step(`Clicking: ${selector}`);
    await this.page.click(selector);
  }

  /**
   * Types text into the element matching the given selector.
   * @param {string} selector
   * @param {string} text
   */
  async type(selector, text) {
    this.logger.step(`Typing "${text}" into: ${selector}`);
    await this.page.fill(selector, text);
  }

  /**
   * Returns true if the element is visible on the page.
   * @param {string} selector
   * @returns {Promise<boolean>}
   */
  async isVisible(selector) {
    try {
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  /**
   * Returns all elements matching the selector.
   * @param {string} selector
   * @returns {Promise<import('playwright').ElementHandle[]>}
   */
  async getElements(selector) {
    return await this.page.$$(selector);
  }

  /**
   * Returns the text content of the first matching element.
   * @param {string} selector
   * @returns {Promise<string>}
   */
  async getText(selector) {
    return await this.page.textContent(selector) || '';
  }

  /**
   * Takes a screenshot and saves it to the screenshots directory.
   * @param {string} name
   */
  async screenshot(name) {
    const path = `reports/screenshots/${name}-${Date.now()}.png`;
    await this.page.screenshot({ path, fullPage: true });
    this.logger.info(`Screenshot saved: ${path}`);
  }
}

module.exports = CommonPage;
