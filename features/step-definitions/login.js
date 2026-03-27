const{Given,Then,When}= require('@cucumber/cucumber');

Given('Display the cleartrip application Homepage',{timeout: 90 * 1000},async function () {
// Write code here that turns the phrase above into concrete actions
await this.page.goto('https://www.cleartrip.com/', {waitUntil: 'domcontentloaded', timeout: 60000});
await this.page.waitForTimeout(2000);
});
Given('Dislay the Username and Password field',{timeout: 30 * 1000},async function () {
// Write code here that turns the phrase above into concrete actions
console.log("Dislay the Username and Password field");
   await this.page.waitForTimeout(2000);
   try {
           const Loginbtn=await this.page.locator('//button[@class="sc-dAlyuH lpnBhA"]');
         await Loginbtn.click({timeout: 10000});
         await this.page.waitForTimeout(2000);
   } catch (error) {
       console.log("Login button not found or click failed:", error.message);
   }
});

When('Enter the Valid Username and Password',async function () {
// Write code here that turns the phrase above into concrete actions
console.log("Enter the Valid Username and Password");
});

When('Click on the Login button',{timeout: 30 * 1000}, async function () {
// Write code here that turns the phrase above into concrete actions
console.log("Click on the Login Button");
await this.page.waitForTimeout(2000);
try {
   const Loginbtn=await this.page.locator('//button[@class="sc-dAlyuH lpnBhA"]');
   await Loginbtn.click({timeout: 10000});
   await this.page.waitForTimeout(2000);
} catch (error) {
   console.log("Error clicking login button:", error.message);
}
});

Then('Display the Login Page TITLE',async function () {
// Write code here that turns the phrase above into concrete actions
console.log("Display the User Login Successfully message");
let Loginpagetitle=await this.page.title();
await console.log("Display the page of the TITLE : " +Loginpagetitle);
// page.close() is now handled by the After hook
});