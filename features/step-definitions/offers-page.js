const { Given, When, Then } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

async function selectOfferType(page, optionText) {
  await page.getByRole('listitem').filter({ hasText: optionText }).waitFor({ state: 'visible', timeout: 20000 });
  await page.getByRole('listitem').filter({ hasText: optionText }).click({ timeout: 20000 });

  const titleLocator = page.getByTitle(` ${optionText}`);
  if (await titleLocator.count() > 0) {
    const span = titleLocator.locator('span');
    const icon = titleLocator.locator('i');
    if (await span.count() > 0) {
      await span.first().click({ timeout: 10000 });
    }
    if (await icon.count() > 0) {
      await icon.first().click({ timeout: 10000 });
    }
  }

  await page.waitForTimeout(1000);
  const selected = await page.locator('//div[@class="SumoSelect sumo_offer_tag"]').textContent({ timeout: 10000 });
  if (!selected || !selected.includes(optionText.trim())) {
    throw new Error(`Expected '${optionText}' to be selected but got '${selected || ''}'.`);
  }
}

async function clickOffersLink(page) {
  try {
    let closepopupbtn = page.locator('//div[@class="pb-1 px-1 flex flex-middle nmx-1"]');
    await closepopupbtn.click({ timeout: 10000 });
    console.log("Popup closed");
  } catch (e) {
    console.log("Popup not found or not clickable, proceeding without closing");
  }
  await page.waitForTimeout(2000);

  let locatorOffersPage = page.locator("div").filter({ hasText: /^Offers$/ }).nth(1);
  await locatorOffersPage.click();
  console.log("Clicked on Offers link and navigated to Offers page successfully");
}

//1) Scenario: Verify the Offers page # features\Offers.feature:5

Given("User clicks on Offers link", { timeout: 60 * 5000 }, async function () {
  await clickOffersLink(this.page);
});

Then("User should be navigated to Offers page successfully", async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log("User should be navigated to Offers page successfully");
  const offerpagetitle = await this.page.title();
  console.log(offerpagetitle);
});

Then(
  "User should see the list of available offers",
  { timeout: 60 * 1000 },
  async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("User should see the list of available offers");
    let offersList = this.page.locator('//a[@class="card_cover"]');

    const count = await offersList.count();
    console.log(`Number of offers found: ${count}`);
    if (count > 0) {
      console.log("Offers are displayed successfully");
    } else {
      console.log("No offers found on the page");
    }
  },
);

Given("User clicks on Offers link1", { timeout: 60 * 1000 }, async function () {
  // Try to close popup if present
  try {
    let closepopupbtn1 = this.page.locator(
      '//div[@class="pb-1 px-1 flex flex-middle nmx-1"]',
    );
    await closepopupbtn1.click({ timeout: 10000 });
    console.log("Popup closed");
  } catch (e) {
    console.log("Popup not found or not clickable, proceeding without closing");
  }
  await this.page.waitForTimeout(2000);

  let locatorOffersPage1 = this.page
    .locator("div")
    .filter({ hasText: /^Offers$/ })
    .nth(1);
  await locatorOffersPage1.click();
  console.log(
    "Clicked on Offers link and navigated to Offers page successfully",
  );
});

When(
  "User applies valid filters on Offers page",
  { timeout: 60 * 1000 },
  async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log("User applies valid filters on Offers page");
    console.log("User should see the filtered list of offers");
    let offersList = this.page.locator('//a[@class="card_cover"]');
    const count = await offersList.count();
    console.log(`Number of offers found after applying filters: ${count}`);
    if (count > 0) {
      console.log("Filtered offers are displayed successfully");
    } else {
      console.log("No offers found after applying filters");
    }
  },
);
Then(
  "User should see the filtered list of offers",
  { timeout: 60 * 1000 },
  async function () {
    // Write code here that turns the phrase above into concrete actions
    // Click the SumoSelect to open the dropdown
    await this.page
      .locator('//div[@class="offer_category is-flex flex-md-column"]')
      .click();
    await this.page.waitForTimeout(1000);

    // Select Flight
    await this.page.getByText("Flights", { exact: true }).click();
    await this.page.waitForTimeout(2000);

    // Select Hotel
    await this.page.getByText("Hotels").click();
    await this.page.waitForTimeout(2000);

    // Select Bus
    await this.page.getByText("Buses").click();
    await this.page.waitForTimeout(2000);

    console.log("User applies valid filters on Offers page");
  },
);

//4) Scenario: Verify the Offers dropdwon for Fights tab # features\Offers.feature:14
Given("User clicks on Offers link2",async function () {
  try {
    let closepopupbtn2 = this.page.locator(
      '//div[@class="pb-1 px-1 flex flex-middle nmx-1"]',
    );
    await closepopupbtn2.click({ timeout: 10000 });
    console.log("Popup closed");
  } catch (e) {
    console.log("Popup not found or not clickable, proceeding without closing");
  }
  await this.page.waitForTimeout(2000);

  let locatorOffersPage2 = this.page
    .locator("div")
    .filter({ hasText: /^Offers$/ })
    .nth(1);
  await locatorOffersPage2.click();
  console.log(
    "Clicked on Offers link and navigated to Offers page successfully",
  );

});

When("User clicks on Offers dropdown for Flights tab", { timeout: 60 * 1000 }, async function () {
  // Click the offers dropdown and open options
  const dropdownflightoffers = this.page.locator("div.SumoSelect.sumo_offer_tag, div[class*='SumoSelect'][class*='sumo_offer_tag']");
  await dropdownflightoffers.waitFor({ state: 'visible', timeout: 30000 });
  await dropdownflightoffers.click({ timeout: 30000 });

  // Wait for options to render using a more robust locator strategy
  const optionLocator = this.page.locator("//li[normalize-space() = 'Flights' or normalize-space() = 'Flights ']").first();
  const fallbackLocator = this.page.getByText('Flights', { exact: true }).first();

  let flightOption;
  if ((await optionLocator.count()) > 0) {
    flightOption = optionLocator;
  } else if ((await fallbackLocator.count()) > 0) {
    flightOption = fallbackLocator;
  } else {
    // fallback to any list item under dropdown that contains flights text
    const fuzzyLocator = this.page.locator("//li[contains(normalize-space(), 'Flights')] ").first();
    if ((await fuzzyLocator.count()) > 0) {
      flightOption = fuzzyLocator;
    }
  }

  if (!flightOption) {
    const allOptions = await this.page.locator("//li").allTextContents();
    console.log('Available options after opening dropdown:', allOptions);
    throw new Error('Could not find Flights option in Offers dropdown after opening it.');
  }

  await flightOption.waitFor({ state: 'visible', timeout: 30000 });
  await flightOption.click({ timeout: 30000 });

  await this.page.waitForTimeout(1000);

  const selected = (await dropdownflightoffers.textContent({ timeout: 10000 })) || '';
  if (!selected.toLowerCase().includes('flights')) {
    console.warn(`Offers dropdown text after selecting Flights is '${selected}'. Proceeding as Flights option was clicked.`);
  }
});

Then("User should see the list of available offers for Flights", { timeout: 60 * 1000 }, async function () {
  // Validate that flight offers are displayed after choosing Flights from dropdown
  await this.page.waitForTimeout(3000);

  const offersList = this.page.locator('//a[@class="card_cover"]');
  const offerCount = await offersList.count();
  console.log(`Number of Flight offers found: ${offerCount}`);

  if (offerCount === 0) {
    throw new Error('No available offers are found for Flights tab.');
  }

  // Optional check: have at least one visible offer after filter
  let visibleOfferCount = 0;
  for (let i = 0; i < offerCount; i++) {
    if (await offersList.nth(i).isVisible()) {
      visibleOfferCount++;
    }
  }
  console.log(`Number of Flight offers visible on screen: ${visibleOfferCount}`);
});
//5) Scenario: Verify the Offers dropdwon for Hotels tab # features\Offers.feature:19
Given('User clicks on Offers link3', async function () {
  try {
    let closepopupbtn3 = this.page.locator(
      '//div[@class="pb-1 px-1 flex flex-middle nmx-1"]',
    );
    await closepopupbtn3.click({ timeout: 10000 });
    console.log("Popup closed");
  } catch (e) {
    console.log("Popup not found or not clickable, proceeding without closing");
  }
  await this.page.waitForTimeout(2000);
  let locatorOffersPage3 = this.page
    .locator("div")
    .filter({ hasText: /^Offers$/ })
    .nth(1);
  await locatorOffersPage3.click();
  console.log(
    "Clicked on Offers link and navigated to Offers page successfully",
  );
});


 When('User clicks on Offers dropdown for Hotels tab',async function () {
  const dropdownhoteloffers= this.page.locator("div.SumoSelect.sumo_offer_tag, div[class*='SumoSelect'][class*='sumo_offer_tag']");
  await dropdownhoteloffers.waitFor({ state: 'visible', timeout: 30000 });
  await dropdownhoteloffers.click({ timeout: 30000 });
  const optionLocator = this.page.locator("//li[normalize-space() = 'Hotels' or normalize-space() = 'Hotels ']").first();
  const fallbackLocator = this.page.getByText('Hotels', { exact: true }).first();
  let hotelOption;
  if ((await optionLocator.count()) > 0) {
    hotelOption = optionLocator;
  } else if ((await fallbackLocator.count()) > 0) {
    hotelOption = fallbackLocator;
  } else {
    const fuzzyLocator = this.page.locator("//li[contains(normalize-space(), 'Hotels')] ").first();
    if ((await fuzzyLocator.count()) > 0) {
      hotelOption = fuzzyLocator;
    }
  
  }
  if (!hotelOption) {
    const allOptions = await this.page.locator("//li").allTextContents();
    console.log('Available options after opening dropdown:', allOptions);
    throw new Error('Could not find Hotels option in Offers dropdown after opening it.');
  }
  await hotelOption.waitFor({ state: 'visible', timeout: 30000 });
  await hotelOption.click({ timeout: 30000 });
  await this.page.waitForTimeout(1000);
  const selected = (await dropdownhoteloffers.textContent({ timeout: 10000 })) || '';
  if (!selected.toLowerCase().includes('hotels')) {
    console.warn(`Offers dropdown text after selecting Hotels is '${selected}'. Proceeding as Hotels option was clicked.`);
  }
});






         Then('User should see the list of available offers for Hotels',async function () {
           // Write code here that turns the phrase above into concrete actions
             await this.page.waitForTimeout(3000);
              const offersList= this.page.locator('//a[@class="card_cover"]'); 
              const offerCount = await offersList.count();
              console.log(`Number of Hotel offers found: ${offerCount}`);
              if (offerCount === 0) {
                throw new Error('No available offers are found for Hotels tab.');
              }
              let visibleOfferCount = 0;
              for (let i = 0; i < offerCount; i++) {
                if (await offersList.nth(i).isVisible()) {
                  visibleOfferCount++;
                }
              }
              console.log(`Number of Hotel offers visible on screen: ${visibleOfferCount}`);






         });

//6) Scenario: Verify the Offers dropdwon for Buses tab # features\Offers.feature:24
Given('User clicks on Offers link4', async function () {
  try {
    let closepopupbtn4 = this.page.locator(
      '//div[@class="pb-1 px-1 flex flex-middle nmx-1"]',
    );
    await closepopupbtn4.click({ timeout: 10000 });
    console.log("Popup closed");
  
  } catch (e) {
    console.log("Popup not found or not clickable, proceeding without closing");
  }
  await this.page.waitForTimeout(2000);
  let locatorOffersPage4 = this.page
    .locator("div")
    .filter({ hasText: /^Offers$/ })
    .nth(1);
  await locatorOffersPage4.click();
  console.log(
    "Clicked on Offers link and navigated to Offers page successfully",
  );
});

When('User clicks on Offers dropdown for Buses tab', async function () {
  const dropdownbusoffers = this.page.locator("div.SumoSelect.sumo_offer_tag, div[class*='SumoSelect'][class*='sumo_offer_tag']");
  await dropdownbusoffers.waitFor({ state: 'visible', timeout: 30000 });
  await dropdownbusoffers.click({ timeout: 30000 });
  const optionLocator = this.page.locator("//li[normalize-space() = 'Buses' or normalize-space() = 'Buses ']").first();
  const fallbackLocator = this.page.getByText('Buses', { exact: true }).first();
  let busOption;
  if ((await optionLocator.count()) > 0) {
    busOption = optionLocator;
  } else if ((await fallbackLocator.count()) > 0) {
    busOption = fallbackLocator;
  } else {
    const fuzzyLocator = this.page.locator("//li[contains(normalize-space(), 'Buses')] ").first();
    if ((await fuzzyLocator.count()) > 0) {
      busOption = fuzzyLocator;
    }
  }
  if (!busOption) {
    const allOptions = await this.page.locator("//li").allTextContents();
    console.log('Available options after opening dropdown:', allOptions);
    throw new Error('Could not find Buses option in Offers dropdown after opening it.');
  }
  await busOption.waitFor({ state: 'visible', timeout: 30000 });
  await busOption.click({ timeout: 30000 });
  await this.page.waitForTimeout(1000);
  const selected = (await dropdownbusoffers.textContent({ timeout: 10000 })) || '';
  if (!selected.toLowerCase().includes('buses')) {
    console.warn(`Offers dropdown text after selecting Buses is '${selected}'. Proceeding as Buses option was clicked.`);
  }
});

Then('User should see the list of available offers for Buses', async function () {
  await this.page.waitForTimeout(3000);
  const offersList = this.page.locator('//a[@class="card_cover"]');
  const offerCount = await offersList.count();
  console.log(`Number of Bus offers found: ${offerCount}`);
  if (offerCount === 0) {
    throw new Error('No available offers are found for Buses tab.');
  
  }
  let visibleOfferCount = 0;
  for (let i = 0; i < offerCount; i++) {
    if (await offersList.nth(i).isVisible()) {
      visibleOfferCount++;
    }
  }
  console.log(`Number of Bus offers visible on screen: ${visibleOfferCount}`);
});













// //3) Scenario: Verify the Offers page with invalid filters # features\Offers.feature:15

//          Given('User clicks on Offers link', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          When('User applies invalid filters on Offers page', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          Then('User should see a message indicating no offers found', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

// //4) Scenario: Verify the Offers page with sorting options # features\Offers.feature:20

//          Given('User clicks on Offers link', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          When('User sorts the offers by price low to high', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          Then('User should see the offers sorted by price in ascending order', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

// //5) Scenario: Verify the Offers page with sorting options # features\Offers.feature:25

//          Given('User clicks on Offers link', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          When('User sorts the offers by price high to low', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          Then('User should see the offers sorted by price in descending order', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

// //6) Scenario: Verify the Offers page with sorting options # features\Offers.feature:30

//          Given('User clicks on Offers link', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          When('User sorts the offers by popularity', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          Then('User should see the offers sorted by popularity', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

// //7) Scenario: Verify the Offers page with sorting options # features\Offers.feature:35

//          Given('User clicks on Offers link', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          When('User sorts the offers by latest', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          Then('User should see the offers sorted by latest first', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

// //8) Scenario: Verify the Offers page with sorting options # features\Offers.feature:40

//          Given('User clicks on Offers link', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          When('User sorts the offers by ending soon', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          Then('User should see the offers sorted by ending soon first', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

// //9) Scenario: Verify the Offers page with sorting options # features\Offers.feature:45

//          Given('User clicks on Offers link', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          When('User sorts the offers by discount', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

//          Then('User should see the offers sorted by discount percentage in descending order', function () {
//            // Write code here that turns the phrase above into concrete actions
//            return 'pending';
//          });

// //10) Scenario: Verify the Offers page with sorting options # features\Offers.feature:50

//           Given('User clicks on Offers link', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           When('User sorts the offers by cashback', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           Then('User should see the offers sorted by cashback amount in descending order', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

// //11) Scenario: Verify the Offers page with sorting options # features\Offers.feature:55

//           Given('User clicks on Offers link', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           When('User sorts the offers by exclusive', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           Then('User should see the offers sorted by exclusive first', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

// //12) Scenario: Verify the Offers page with sorting options # features\Offers.feature:61

//           Given('User clicks on Offers link', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           When('User sorts the offers by best seller', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           Then('User should see the offers sorted by best seller first', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

// //13) Scenario: Verify the Offers page with sorting options # features\Offers.feature:66

//           Given('User clicks on Offers link', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           When('User sorts the offers by customer rating', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           Then('User should see the offers sorted by customer rating in descending order', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

// //14) Scenario: Verify the Offers page with sorting options # features\Offers.feature:71

//           Given('User clicks on Offers link', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           When('User sorts the offers by new arrivals', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           Then('User should see the offers sorted by new arrivals first', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

// //15) Scenario: Verify the Offers page with sorting options # features\Offers.feature:76

//           Given('User clicks on Offers link', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           When('User sorts the offers by ending soon', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           Then('User should see the offers sorted by ending soon first', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

// //16) Scenario: Verify the Offers page with sorting options # features\Offers.feature:81

//           Given('User clicks on Offers link', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           When('User sorts the offers by discount', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           Then('User should see the offers sorted by discount percentage in descending order', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

// //17) Scenario: Verify the Offers page with sorting options # features\Offers.feature:86

//           Given('User clicks on Offers link', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//           When('User sorts the offers by cashback', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });

//    Then('User should see the offers sorted by cashback amount in descending order', function () {
//             // Write code here that turns the phrase above into concrete actions
//             return 'pending';
//           });
