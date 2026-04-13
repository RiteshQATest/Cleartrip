const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('User navigates to the Bus page', async function () {
    await this.page.goto('https://www.cleartrip.com/bus', { waitUntil: 'domcontentloaded' });
});

Then('the Bus page title should be displayed', async function () {
    await expect(this.page).toHaveTitle(/bus|cleartrip/i);
});

Then('the Bus search form should be visible', async function () {
    const searchForm = this.page.locator('input[placeholder*="From"], input[placeholder*="Source"], input[placeholder*="from"]').first();
    await expect(searchForm).toBeVisible({ timeout: 10000 });
});

When('User enters {string} as the source city', async function (city) {
    const sourceInput = this.page.locator('input[placeholder*="From"], input[placeholder*="Source"], input[placeholder*="from"]').first();
    await sourceInput.click();
    await sourceInput.fill(city);
    const suggestion = this.page.locator(`li:has-text("${city}"), .autocomplete-item:has-text("${city}"), [class*="suggestion"]:has-text("${city}")`).first();
    await suggestion.waitFor({ timeout: 10000 });
    await suggestion.click();
});

When('User enters {string} as the destination city', async function (city) {
    const destInput = this.page.locator('input[placeholder*="To"], input[placeholder*="Destination"], input[placeholder*="to"]').first();
    await destInput.click();
    await destInput.fill(city);
    const suggestion = this.page.locator(`li:has-text("${city}"), .autocomplete-item:has-text("${city}"), [class*="suggestion"]:has-text("${city}")`).first();
    await suggestion.waitFor({ timeout: 10000 });
    await suggestion.click();
});

When('User selects a travel date', async function () {
    const dateInput = this.page.locator('input[placeholder*="Date"], input[placeholder*="date"], [class*="date-picker"], [class*="DatePicker"]').first();
    await dateInput.click();
    const nextAvailableDate = this.page.locator('[class*="calendar"] [class*="day"]:not([class*="disabled"]):not([class*="past"])').first();
    await nextAvailableDate.waitFor({ timeout: 10000 });
    await nextAvailableDate.click();
});

When('User clicks on Search buses button', async function () {
    const searchButton = this.page.locator('button:has-text("Search"), button:has-text("Search Buses"), [class*="search-btn"], [class*="searchBtn"]').first();
    await searchButton.click();
});

Then('the bus search should be initiated successfully', async function () {
    await this.page.waitForURL(/.*bus.*/, { timeout: 20000 });
    const currentUrl = this.page.url();
    expect(currentUrl).toMatch(/bus/i);
});

Then('the bus search results should be displayed', async function () {
    const results = this.page.locator('[class*="bus-item"], [class*="busItem"], [class*="bus-card"], [class*="busCard"], [class*="result"]').first();
    await results.waitFor({ timeout: 30000 });
    await expect(results).toBeVisible();
});

Then('User should see a list of available buses', async function () {
    const busList = this.page.locator('[class*="bus-item"], [class*="busItem"], [class*="bus-card"], [class*="busCard"]');
    const count = await busList.count();
    expect(count).toBeGreaterThan(0);
});

When('User applies a departure time filter', async function () {
    const filterSection = this.page.locator('[class*="filter"], [class*="Filter"]').first();
    await filterSection.waitFor({ timeout: 15000 });
    const departureFilter = this.page.locator('[class*="filter"] input[type="checkbox"], [class*="departure"] input[type="checkbox"]').first();
    await departureFilter.click();
});

Then('the filtered bus results should be displayed', async function () {
    const results = this.page.locator('[class*="bus-item"], [class*="busItem"], [class*="bus-card"], [class*="busCard"], [class*="result"]').first();
    await results.waitFor({ timeout: 20000 });
    await expect(results).toBeVisible();
});

When('User clicks on View Seats for the first bus', async function () {
    const viewSeatsButton = this.page.locator('button:has-text("View Seats"), a:has-text("View Seats"), [class*="view-seats"], [class*="viewSeats"]').first();
    await viewSeatsButton.waitFor({ timeout: 20000 });
    await viewSeatsButton.click();
});

Then('the bus seat selection page should be displayed', async function () {
    const seatLayout = this.page.locator('[class*="seat"], [class*="Seat"], [class*="seat-layout"], [class*="seatLayout"]').first();
    await seatLayout.waitFor({ timeout: 20000 });
    await expect(seatLayout).toBeVisible();
});
