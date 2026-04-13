Feature: Bus Search Functionality
  As a user of Cleartrip
  I want to search for buses between cities
  So that I can find available bus routes and timings

  Scenario: Verify Bus search functionality
    Given User is on the Bus page
    When User enters valid source and destination cities
    And User selects a valid travel date
    And User clicks on the search button
    Then the search results should be displayed
    And the search results should contain buses matching the entered criteria
