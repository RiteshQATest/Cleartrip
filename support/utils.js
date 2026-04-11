'use strict';

const fs = require('fs');
const path = require('path');
const config = require('./config');

/**
 * Ensures that the required report directories exist.
 */
function ensureDirectories() {
  const dirs = [
    config.paths.reports,
    config.paths.screenshots,
    config.paths.videos,
    config.paths.logs,
    config.paths.htmlSnapshots
  ];
  dirs.forEach((dir) => {
    const resolved = path.resolve(dir);
    if (!fs.existsSync(resolved)) {
      fs.mkdirSync(resolved, { recursive: true });
    }
  });
}

/**
 * Saves a screenshot buffer to the screenshots directory.
 * @param {Buffer} screenshotBuffer
 * @param {string} name - Filename (without extension)
 * @returns {string} Full path to saved screenshot
 */
function saveScreenshot(screenshotBuffer, name) {
  ensureDirectories();
  const filename = `${name}-${Date.now()}.png`;
  const filepath = path.resolve(config.paths.screenshots, filename);
  fs.writeFileSync(filepath, screenshotBuffer);
  return filepath;
}

/**
 * Saves HTML snapshot content to the html-snapshots directory.
 * @param {string} html
 * @param {string} name
 * @returns {string} Full path to saved snapshot
 */
function saveHtmlSnapshot(html, name) {
  ensureDirectories();
  const filename = `${name}-${Date.now()}.html`;
  const filepath = path.resolve(config.paths.htmlSnapshots, filename);
  fs.writeFileSync(filepath, html, 'utf8');
  return filepath;
}

/**
 * Returns the future date offset by the given number of days from today.
 * @param {number} offsetDays
 * @returns {Date}
 */
function getFutureDate(offsetDays = 1) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date;
}

/**
 * Formats a Date as DD/MM/YYYY.
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Waits for a specified number of milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  ensureDirectories,
  saveScreenshot,
  saveHtmlSnapshot,
  getFutureDate,
  formatDate,
  sleep
};
