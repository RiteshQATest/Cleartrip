'use strict';

const { Before, After, AfterStep, Status } = require('@cucumber/cucumber');
const { ensureDirectories } = require('./utils');
const logger = require('./logger');

Before(async function () {
  ensureDirectories();
  logger.info('Starting test scenario');
  await this.openBrowser();
});

After(async function (scenario) {
  const scenarioName = scenario.pickle.name.replace(/\s+/g, '-');

  if (scenario.result.status === Status.FAILED) {
    logger.error(`Scenario FAILED: ${scenario.pickle.name}`);

    if (this.config.screenshot && this.page) {
      try {
        const screenshotPath = `reports/screenshots/FAILED-${scenarioName}-${Date.now()}.png`;
        await this.page.screenshot({ path: screenshotPath, fullPage: true });
        logger.info(`Screenshot saved: ${screenshotPath}`);

        const screenshotBuffer = require('fs').readFileSync(screenshotPath);
        await this.attach(screenshotBuffer, 'image/png');
      } catch (err) {
        logger.error(`Failed to capture screenshot: ${err.message}`);
      }
    }

    if (this.page) {
      try {
        const html = await this.page.content();
        const snapshotPath = `reports/html-snapshots/FAILED-${scenarioName}-${Date.now()}.html`;
        require('fs').writeFileSync(snapshotPath, html, 'utf8');
        logger.info(`HTML snapshot saved: ${snapshotPath}`);
      } catch (err) {
        logger.error(`Failed to capture HTML snapshot: ${err.message}`);
      }
    }
  } else {
    logger.info(`Scenario PASSED: ${scenario.pickle.name}`);
  }

  await this.closeBrowser();
});

AfterStep(async function (step) {
  if (step.result.status === Status.FAILED) {
    logger.error(`Step FAILED: ${step.pickleStep.text}`);
  }
});
