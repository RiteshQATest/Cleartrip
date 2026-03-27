Feature: Login with Mobile OTP
Background: Precondition
Given Display the cleartrip application Homepage

Scenario: Login to cleartrip with mobile OTP
Given User clicks on Login button
When User enters valid mobile number
And User receives OTP on mobile
And User enters valid OTP
Then User should be logged in successfully
