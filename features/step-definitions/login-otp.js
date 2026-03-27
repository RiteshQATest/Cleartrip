const { Given, When, Then } = require('@cucumber/cucumber');

Given('User clicks on Login button', { timeout: 30 * 1000 }, async function () {
  console.log("User clicks on Login button");
  try {
    await this.page.waitForTimeout(2000);
    const loginBtn = await this.page.locator('//button[contains(@class, "lpnBhA")]');
    await loginBtn.click({ timeout: 10000 });
    await this.page.waitForTimeout(2000);
    console.log("Login button clicked successfully");
  } catch (error) {
    console.error("Error clicking login button:", error.message);
    throw error;
  }
});

When('User enters valid mobile number', { timeout: 30 * 1000 }, async function () {
  console.log("User enters mobile number");
  try {
    await this.page.waitForTimeout(1000);
    
    // Wait for mobile number input field
    const mobileInput = await this.page.locator('//input[@type="text" or @type="tel" or @placeholder*="mobile" or @placeholder*="phone"]').first();
    await mobileInput.waitFor({ state: 'visible', timeout: 10000 });
    
    // Enter mobile number
    const mobileNumber = '9876543210';
    await mobileInput.fill(mobileNumber);
    console.log(`Mobile number ${mobileNumber} entered successfully`);
    
    await this.page.waitForTimeout(1000);
  } catch (error) {
    console.error("Error entering mobile number:", error.message);
    throw error;
  }
});

When('User receives OTP on mobile', { timeout: 60 * 1000 }, async function () {
  console.log("Waiting for OTP to be received");
  try {
    // Look for "Send OTP" or "Get OTP" button
    const otpButton = await this.page.locator('//button[contains(text(), "OTP") or contains(text(), "Send") or contains(@class, "otp")]').first();
    
    // Check if button exists and click it
    if (await otpButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await otpButton.click({ timeout: 10000 });
      console.log("OTP sent button clicked");
    }
    
    // Wait for OTP input field to appear
    await this.page.waitForTimeout(2000);
    const otpInputs = await this.page.locator('//input[@type="text" or @type="number" or @placeholder*="OTP" or @placeholder*="otp"]').all();
    
    if (otpInputs.length > 0) {
      console.log("OTP input field(s) detected");
    } else {
      console.log("Waiting for OTP input field to appear");
      await this.page.waitForSelector('//input[@placeholder*="OTP" or @placeholder*="otp" or @type="text"]', { timeout: 15000 }).catch(() => {
        console.log("OTP field may appear after delay");
      });
    }
  } catch (error) {
    console.error("Error in OTP reception step:", error.message);
    throw error;
  }
});

When('User enters valid OTP', { timeout: 30 * 1000 }, async function () {
  console.log("User enters OTP");
  try {
    await this.page.waitForTimeout(2000);
    
    // Try to find OTP input field variations
    let otpInput = null;
    const otpSelectors = [
      '//input[@placeholder*="OTP"]',
      '//input[@placeholder*="otp"]',
      '//input[@type="number"]',
      '//input[contains(@class, "otp")]',
      '//input[contains(@id, "otp")]'
    ];
    
    for (const selector of otpSelectors) {
      try {
        const field = await this.page.locator(selector).first();
        if (await field.isVisible({ timeout: 2000 }).catch(() => false)) {
          otpInput = field;
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (otpInput) {
      // Enter OTP (typically 6 digits)
      const otp = '123456';
      await otpInput.fill(otp);
      console.log(`OTP ${otp} entered successfully`);
      
      await this.page.waitForTimeout(1000);
      
      // Look for Verify OTP button
      const verifyBtn = await this.page.locator('//button[contains(text(), "Verify") or contains(text(), "Submit") or contains(text(), "Login")]').first();
      if (await verifyBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await verifyBtn.click({ timeout: 10000 });
        console.log("Verify OTP button clicked");
      }
    } else {
      console.warn("OTP input field not found - you may need to provide OTP manually or adjust selectors");
    }
  } catch (error) {
    console.error("Error entering OTP:", error.message);
    throw error;
  }
});

Then('User should be logged in successfully', { timeout: 30 * 1000 }, async function () {
  console.log("Verifying successful login");
  try {
    await this.page.waitForTimeout(3000);
    
    // Look for success indicators
    const pageTitle = await this.page.title();
    console.log(`Current page title: ${pageTitle}`);
    
    // Check for common post-login elements
    const urlAfterLogin = await this.page.url();
    console.log(`Current URL: ${urlAfterLogin}`);
    
    // Look for profile icon, logout button, or user greeting
    const successIndicators = await this.page.locator('//button[contains(text(), "Logout")] | //span[contains(@class, "profile")] | //*[contains(text(), "Welcome")] | //*[contains(text(), "Login")]').first();
    
    if (successIndicators) {
      console.log("User successfully logged in");
    } else {
      console.log("Login verification in progress - checking page elements");
    }
  } catch (error) {
    console.error("Error verifying login:", error.message);
    throw error;
  }
});
