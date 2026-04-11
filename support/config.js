'use strict';

require('dotenv').config();

const config = {
  baseUrl: process.env.BASE_URL || 'https://www.cleartrip.com',
  browser: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS !== 'false',
  slowMo: parseInt(process.env.SLOW_MO || '0', 10),
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  screenshot: process.env.SCREENSHOT !== 'false',
  video: process.env.VIDEO === 'true',
  tracing: process.env.TRACING === 'true',
  environment: process.env.ENVIRONMENT || 'staging',
  viewportWidth: parseInt(process.env.VIEWPORT_WIDTH || '1280', 10),
  viewportHeight: parseInt(process.env.VIEWPORT_HEIGHT || '720', 10),

  paths: {
    features: 'features',
    stepDefinitions: 'features/step-definitions',
    support: 'support',
    pages: 'support/pages',
    reports: 'reports',
    screenshots: 'reports/screenshots',
    videos: 'reports/videos',
    logs: 'reports/logs',
    htmlSnapshots: 'reports/html-snapshots'
  }
};

module.exports = config;
