const { Given,When,Then } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

//Scenario: Verify the Flight tab page
Given('Display the cleartrip application Homepage',{timeout: 90 * 1000},async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.page.goto('https://www.cleartrip.com', {waitUntil: 'domcontentloaded', timeout: 60000});
    await this.page.waitForTimeout(2000);
});

   //1)Scenario: Verify the Flight tab page 
Given('Display the Flight tab page',{timeout: 30 * 1000},async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("Display the Flight tab page");
    await this.page.waitForTimeout(2000);
    try {
        const Flighttab=await this.page.locator('//a[@class="sc-dAlyuH lpnBhA"]');
        await Flighttab.click();
    } catch (error) {
        console.error("Error clicking on Flight tab:", error);
    }
    await this.page.waitForTimeout(2000);
});

When('User should be clicked on cancel button in login popup',{timeout: 30 * 1000},async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("User should be clicked on cancel button in login popup");
    await this.page.waitForTimeout(2000);
    try {
        const cancelButton = await this.page.locator('//button[@class="sc-dAlyuH lpnBhA"]');
        await cancelButton.click();
    } catch (error) {
        console.error("Error clicking on cancel button in login popup:", error);
    }
    await this.page.waitForTimeout(2000);
});

Then('User should be navigated to Flight tab page successfully',{timeout: 30 * 1000},async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("User should be navigated to Flight tab page successfully");
    await this.page.waitForTimeout(2000);
    try {
        const flightTabHeader = await this.page.locator('//h1[contains(text(), "Book Flights")]');
        const isVisible = await flightTabHeader.isVisible();
        if (isVisible) {
            console.log("User is successfully navigated to Flight tab page.");
        } else {
            console.error("User is not navigated to Flight tab page.");
        }
    } catch (error) {
        console.error("Error verifying navigation to Flight tab page:", error);
    }
    await this.page.waitForTimeout(2000);
});






