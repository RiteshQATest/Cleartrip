Feature: Bus Tab Functionality

  Background:
    Given Display the cleartrip application Homepage

  Scenario: Verify Bus page loads successfully
    Given User navigates to the Bus page
    Then the Bus page title should be displayed
    And the Bus search form should be visible

  Scenario: Verify bus search with valid inputs
    Given User navigates to the Bus page
    When User enters "Bangalore" as the source city
    And User enters "Chennai" as the destination city
    And User selects a travel date
    And User clicks on Search buses button
    Then the bus search should be initiated successfully

  Scenario: Verify bus search results display
    Given User navigates to the Bus page
    When User enters "Bangalore" as the source city
    And User enters "Chennai" as the destination city
    And User selects a travel date
    And User clicks on Search buses button
    Then the bus search results should be displayed
    And User should see a list of available buses

  Scenario: Verify bus filters work correctly
    Given User navigates to the Bus page
    When User enters "Bangalore" as the source city
    And User enters "Chennai" as the destination city
    And User selects a travel date
    And User clicks on Search buses button
    Then the bus search results should be displayed
    When User applies a departure time filter
    Then the filtered bus results should be displayed

  Scenario: Verify bus booking flow
    Given User navigates to the Bus page
    When User enters "Bangalore" as the source city
    And User enters "Chennai" as the destination city
    And User selects a travel date
    And User clicks on Search buses button
    Then the bus search results should be displayed
    When User clicks on View Seats for the first bus
    Then the bus seat selection page should be displayed
