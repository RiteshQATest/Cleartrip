Feature: Bus Booking Functionality

  Scenario: Search for buses with valid criteria
    Given User is on the Bus page
    When User enters valid source and destination cities
    And User selects a valid travel date
    And User clicks on the search button
    Then the search results should be displayed
    And the search results should contain buses matching the entered criteria
