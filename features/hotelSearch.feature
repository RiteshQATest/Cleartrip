@hotels @regression
Feature: Hotel Search and Booking
  As a user of Cleartrip
  I want to search for hotels
  So that I can find and book accommodation

  Background:
    Given User navigates to Cleartrip hotels page

  @smoke
  Scenario: User searches for hotels with valid dates and location
    When User enters destination city "Mumbai"
    And User selects check-in date
    And User selects check-out date
    And User specifies number of guests "2" adults
    And User specifies number of rooms "1" room
    And User clicks "Search" button
    Then Search results page loads successfully
    And List of available hotels is displayed
    And Hotel cards show name, rating, price, and images

  Scenario Outline: User searches for hotels in multiple cities
    When User enters destination city "<city>"
    And User selects check-in date
    And User selects check-out date
    And User clicks "Search" button
    Then Search results page loads successfully
    And List of available hotels is displayed

    Examples:
      | city      |
      | Delhi     |
      | Bangalore |
      | Goa       |
      | Chennai   |

  Scenario: User filters hotels by price range
    When User enters destination city "Mumbai"
    And User selects check-in date
    And User selects check-out date
    And User clicks "Search" button
    Then Search results page loads successfully
    And User applies price filter from "1000" to "5000"
    Then Hotels within the price range are displayed

  Scenario: User filters hotels by star rating
    When User enters destination city "Mumbai"
    And User selects check-in date
    And User selects check-out date
    And User clicks "Search" button
    Then Search results page loads successfully
    And User filters by "5" star rating
    Then Only "5" star hotels are displayed

  Scenario: User filters hotels by amenities
    When User enters destination city "Mumbai"
    And User selects check-in date
    And User selects check-out date
    And User clicks "Search" button
    Then Search results page loads successfully
    And User filters by amenity "Free WiFi"
    Then Hotels with "Free WiFi" are displayed

  Scenario: User searches for hotels with multiple guests and rooms
    When User enters destination city "Delhi"
    And User selects check-in date
    And User selects check-out date
    And User specifies number of guests "4" adults
    And User specifies number of rooms "2" rooms
    And User clicks "Search" button
    Then Search results page loads successfully
    And List of available hotels is displayed

  Scenario: User searches for hotels with advanced filters
    When User enters destination city "Goa"
    And User selects check-in date
    And User selects check-out date
    And User clicks "Search" button
    Then Search results page loads successfully
    And User applies advanced filters
    Then Filtered results are displayed
