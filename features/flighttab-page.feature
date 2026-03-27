
Feature: Flight tab page
Background: Precondition

Given Display the cleartrip application Homepage

Scenario: Verify the Flight tab page
Given User clicks on Flight tab
When User should be clicked on cancel button in login popup
Then User should be navigated to Flight tab page successfully
