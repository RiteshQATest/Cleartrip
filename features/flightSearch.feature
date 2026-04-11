@flights @regression
Feature: Flight Search and Booking
  As a user of Cleartrip
  I want to search for flights
  So that I can find and book air travel

  Background:
    Given User navigates to Cleartrip flights page

  @smoke
  Scenario: User searches for one-way flight
    When User enters origin city "Mumbai"
    And User enters destination city "Delhi"
    And User selects departure date
    And User specifies "1" adult passenger
    And User clicks flight "Search" button
    Then Flight search results page loads successfully
    And List of available flights is displayed

  Scenario: User searches for round-trip flight
    When User selects round-trip option
    And User enters origin city "Delhi"
    And User enters destination city "Bangalore"
    And User selects departure date
    And User selects return date
    And User specifies "2" adult passengers
    And User clicks flight "Search" button
    Then Flight search results page loads successfully
    And List of available flights is displayed
    And Return flights are shown

  Scenario Outline: User searches for flights with different cabin classes
    When User enters origin city "Mumbai"
    And User enters destination city "Delhi"
    And User selects departure date
    And User selects cabin class "<cabin_class>"
    And User clicks flight "Search" button
    Then Flight search results page loads successfully
    And Flights with "<cabin_class>" class are displayed

    Examples:
      | cabin_class |
      | Economy     |
      | Business    |
      | First       |

  Scenario: User searches for flights with multiple passengers
    When User enters origin city "Bangalore"
    And User enters destination city "Chennai"
    And User selects departure date
    And User specifies "3" adult passengers
    And User specifies "1" child passenger
    And User clicks flight "Search" button
    Then Flight search results page loads successfully
    And List of available flights is displayed

  Scenario Outline: User searches for flights on different routes
    When User enters origin city "<origin>"
    And User enters destination city "<destination>"
    And User selects departure date
    And User clicks flight "Search" button
    Then Flight search results page loads successfully

    Examples:
      | origin    | destination |
      | Delhi     | Mumbai      |
      | Mumbai    | Goa         |
      | Bangalore | Hyderabad   |
