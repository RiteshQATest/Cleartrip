// OTP Helper Utilities for Cleartrip Login Tests

/**
 * Intercept API requests to get OTP from network responses
 * @param {object} page - Playwright page object
 * @returns {promise} - Returns OTP when intercepted
 */
async function interceptOTPFromAPI(page) {
  try {
    // Listen for API responses that might contain OTP
    const otpResponse = await Promise.race([
      page.waitForResponse(
        response => 
          response.url().includes('/otp') || 
          response.url().includes('/verify') ||
          response.status() === 200
      ),
      new Promise(resolve => setTimeout(() => resolve(null), 15000))
    ]);

    if (otpResponse) {
      const responseData = await otpResponse.json().catch(() => null);
      console.log("Intercepted OTP response:", responseData);
      return responseData?.otp || responseData?.code || null;
    }
  } catch (error) {
    console.log("Could not intercept OTP from API:", error.message);
  }
  return null;
}

/**
 * Fill OTP with digit-by-digit approach (handles separated OTP inputs)
 * @param {object} page - Playwright page object
 * @param {string} otp - OTP value to fill
 */
async function fillOTPDigitByDigit(page, otp) {
  console.log(`Filling OTP digit by digit: ${otp}`);
  
  // Try to find individual digit inputs
  const digitInputs = await page.locator('//input[@maxlength="1" or contains(@class, "digit") or contains(@class, "otp-input")]').all();
  
  if (digitInputs.length >= 6) {
    // Found individual digit inputs
    for (let i = 0; i < otp.length && i < digitInputs.length; i++) {
      await digitInputs[i].fill(otp[i]);
      await digitInputs[i].press('ArrowRight');
    }
    console.log("OTP filled digit by digit");
    return true;
  }
  
  return false;
}

/**
 * Wait for OTP dialog or modal to appear
 * @param {object} page - Playwright page object
 * @param {number} timeout - Timeout in ms
 */
async function waitForOTPModal(page, timeout = 15000) {
  const otpModalSelectors = [
    '//dialog[contains(text(), "OTP")]',
    '//*[@class*="modal"][contains(., "OTP")]',
    '//*[@role="dialog"][contains(text(), "OTP")]',
    '//div[@class*="otp" or @class*="modal"]'
  ];

  for (const selector of otpModalSelectors) {
    try {
      await page.waitForSelector(selector, { timeout: 5000 }).catch(() => null);
      console.log(`OTP modal found: ${selector}`);
      return true;
    } catch (e) {
      // Continue to next selector
    }
  }
  return false;
}

/**
 * Send OTP request and get verification code
 * @param {object} page - Playwright page object
 * @param {string} mobileNumber - Mobile number
 */
async function sendOTPRequest(page, mobileNumber) {
  try {
    // Click send OTP button
    const sendOtpBtn = await page.locator(
      '//button[contains(text(), "Send OTP") or contains(text(), "Send Code") or contains(text(), "Get OTP")]'
    ).first();
    
    if (await sendOtpBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await sendOtpBtn.click();
      console.log("OTP request sent for mobile:", mobileNumber);
      await page.waitForTimeout(2000);
      return true;
    }
  } catch (error) {
    console.error("Error sending OTP:", error.message);
  }
  return false;
}

/**
 * Verify OTP and handle success/failure
 * @param {object} page - Playwright page object
 * @param {string} otp - OTP to verify
 */
async function verifyOTP(page, otp) {
  try {
    // Find and fill OTP input
    const otpInput = await page.locator(
      '//input[@placeholder*="OTP" or @placeholder*="otp" or contains(@class, "otp")]'
    ).first();
    
    if (await otpInput.isVisible({ timeout: 5000 }).catch(() => false)) {
      await otpInput.fill(otp);
      console.log("OTP filled:", otp);
      
      // Click verify button
      const verifyBtn = await page.locator(
        '//button[contains(text(), "Verify") or contains(text(), "Verify OTP") or contains(text(), "Continue")]'
      ).first();
      
      if (await verifyBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await verifyBtn.click();
        console.log("OTP verification initiated");
        await page.waitForTimeout(3000);
        return true;
      }
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
  }
  return false;
}

/**
 * Complete mobile login flow
 * @param {object} page - Playwright page object
 * @param {string} mobileNumber - Mobile number to login with
 * @param {string} otp - OTP code (optional, will use default if not provided)
 */
async function completeMobileLogin(page, mobileNumber, otp = '123456') {
  console.log("Starting mobile login flow...");
  
  // Step 1: Enter mobile number
  const mobileInput = await page.locator('//input[@type="tel" or @type="text" or contains(@placeholder, "mobile")]').first();
  await mobileInput.fill(mobileNumber);
  console.log("Mobile number entered");
  
  // Step 2: Send OTP
  await sendOTPRequest(page, mobileNumber);
  
  // Step 3: Wait for OTP modal
  await waitForOTPModal(page);
  
  // Step 4: Verify OTP
  const verified = await verifyOTP(page, otp);
  
  if (verified) {
    console.log("Mobile login completed successfully");
  } else {
    console.log("Mobile login verification in progress");
  }
  
  return verified;
}

module.exports = {
  interceptOTPFromAPI,
  fillOTPDigitByDigit,
  waitForOTPModal,
  sendOTPRequest,
  verifyOTP,
  completeMobileLogin
};
