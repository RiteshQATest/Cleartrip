const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

// ─── Step 1: Navigate to the Cleartrip bus page ─────────────────────────────
Given('User is on the Bus page', { timeout: 60 * 1000 }, async function () {
  // Navigate to the Cleartrip bus booking page
  await this.page.goto('https://www.cleartrip.com/buses');

  // Wait until the network is idle so all page assets have loaded
  await this.page.waitForLoadState('networkidle');

  // Confirm that the bus page is visible by checking for its main container
  const busPageContainer = this.page.locator('//div[contains(@class,"bus")]').first();
  await expect(busPageContainer).toBeVisible({ timeout: 30000 });
});

// ─── Step 2: Enter source and destination cities ─────────────────────────────
When('User enters valid source and destination cities', { timeout: 60 * 1000 }, async function () {
  // Source city input — try common placeholder values used by Cleartrip
  const sourceInput = this.page.locator(
    '//input[@placeholder="From" or @placeholder="Source" or @id="fromCity" or contains(@class,"from")]'
  ).first();

  await sourceInput.click();
  await sourceInput.fill('Mumbai');

  // Wait for the auto-suggestion dropdown and pick the first suggestion
  const sourceSuggestion = this.page.locator(
    '//ul[contains(@class,"suggestion") or contains(@class,"autocomplete")]//li'
  ).first();
  await sourceSuggestion.waitFor({ state: 'visible', timeout: 15000 });
  await sourceSuggestion.click();

  // Destination city input
  const destInput = this.page.locator(
    '//input[@placeholder="To" or @placeholder="Destination" or @id="toCity" or contains(@class,"to")]'
  ).first();

  await destInput.click();
  await destInput.fill('Pune');

  // Wait for the auto-suggestion dropdown and pick the first suggestion
  const destSuggestion = this.page.locator(
    '//ul[contains(@class,"suggestion") or contains(@class,"autocomplete")]//li'
  ).first();
  await destSuggestion.waitFor({ state: 'visible', timeout: 15000 });
  await destSuggestion.click();
});

// ─── Step 3: Select a valid travel date ─────────────────────────────────────
When('User selects a valid travel date', { timeout: 60 * 1000 }, async function () {
  // Open the date picker by clicking the date input field
  const dateInput = this.page.locator(
    '//input[@placeholder="Date" or @id="onward_date" or contains(@class,"date")]'
  ).first();
  await dateInput.click();

  // Wait for the calendar widget to appear
  const calendar = this.page.locator(
    '//div[contains(@class,"calendar") or contains(@class,"datepicker") or contains(@class,"DayPicker")]'
  ).first();
  await calendar.waitFor({ state: 'visible', timeout: 15000 });

  // Select the first available (enabled/active) future date in the calendar
  const availableDate = this.page.locator(
    '//td[not(contains(@class,"disabled")) and not(contains(@class,"past"))]//span | ' +
    '//div[contains(@class,"day") and not(contains(@class,"disabled")) and not(contains(@class,"past"))]'
  ).first();
  await availableDate.click();
});

// ─── Step 4: Click the search button ────────────────────────────────────────
When('User clicks on the search button', { timeout: 60 * 1000 }, async function () {
  // Locate the Search / Submit button on the bus booking form
  const searchButton = this.page.locator(
    '//button[contains(text(),"Search") or contains(@class,"search") or @type="submit"]'
  ).first();

  await searchButton.waitFor({ state: 'visible', timeout: 15000 });
  await searchButton.click();

  // Wait for navigation / results page to begin loading
  await this.page.waitForLoadState('domcontentloaded');
});

// ─── Step 5: Verify that search results are displayed ───────────────────────
Then('the search results should be displayed', { timeout: 60 * 1000 }, async function () {
  // Wait for the results container to appear on the page
  const resultsContainer = this.page.locator(
    '//div[contains(@class,"result") or contains(@class,"bus-list") or contains(@class,"listing")]'
  ).first();

  await resultsContainer.waitFor({ state: 'visible', timeout: 30000 });
  await expect(resultsContainer).toBeVisible();
});

// ─── Step 6: Verify results match the entered search criteria ───────────────
Then('the search results should contain buses matching the entered criteria', { timeout: 60 * 1000 }, async function () {
  // Each bus result card should be present in the listing
  const busCards = this.page.locator(
    '//div[contains(@class,"bus-item") or contains(@class,"bus-card") or contains(@class,"result-item")]'
  );

  // Ensure at least one result card is shown
  await expect(busCards.first()).toBeVisible({ timeout: 30000 });

  const count = await busCards.count();
  expect(count).toBeGreaterThan(0);
});
