@smoke @regression
Feature: Common Navigation
  As a user of Cleartrip
  I want to navigate between sections of the website
  So that I can access different travel services

  Scenario: User navigates to Cleartrip home page
    Given User opens the Cleartrip website
    Then The home page is displayed successfully
    And The page title contains "Cleartrip"

  Scenario: User navigates to hotels page
    Given User opens the Cleartrip website
    When User clicks on "Hotels" navigation link
    Then The hotels page is displayed
    And The hotel search form is visible

  Scenario: User navigates to flights page
    Given User opens the Cleartrip website
    When User clicks on "Flights" navigation link
    Then The flights page is displayed
    And The flight search form is visible

  Scenario: User navigates to trains page
    Given User opens the Cleartrip website
    When User clicks on "Trains" navigation link
    Then The trains page is displayed
    And The train search form is visible
