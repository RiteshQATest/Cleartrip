'use strict';

const { setWorldConstructor, World } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const config = require('./config');
const logger = require('./logger');

class CleartripWorld extends World {
  constructor(options) {
    super(options);
    this.config = config;
    this.logger = logger;
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  /**
   * Launches the browser and creates a new browser context and page.
   */
  async openBrowser() {
    const browserType = this.config.browser;
    logger.info(`Launching browser: ${browserType}`);

    const launchers = { chromium, firefox, webkit };
    const launcher = launchers[browserType] || chromium;

    this.browser = await launcher.launch({
      headless: this.config.headless,
      slowMo: this.config.slowMo
    });

    const contextOptions = {
      viewport: {
        width: this.config.viewportWidth,
        height: this.config.viewportHeight
      }
    };

    if (this.config.video) {
      contextOptions.recordVideo = { dir: this.config.paths.videos };
    }

    this.context = await this.browser.newContext(contextOptions);

    if (this.config.tracing) {
      await this.context.tracing.start({ screenshots: true, snapshots: true });
    }

    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(this.config.timeout);
    logger.info('Browser launched successfully');
  }

  /**
   * Closes the browser and all associated resources.
   */
  async closeBrowser() {
    if (this.config.tracing && this.context) {
      await this.context.tracing.stop({ path: 'reports/trace.zip' });
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
      logger.info('Browser closed');
    }
  }

  /**
   * Takes a screenshot of the current page.
   * @param {string} name - Screenshot name
   * @returns {Promise<Buffer>}
   */
  async takeScreenshot(name) {
    if (this.page) {
      return await this.page.screenshot({ path: `reports/screenshots/${name}-${Date.now()}.png` });
    }
    return null;
  }
}

setWorldConstructor(CleartripWorld);

module.exports = CleartripWorld;
