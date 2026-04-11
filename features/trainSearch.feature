@trains @regression
Feature: Train Search and Booking
  As a user of Cleartrip
  I want to search for trains
  So that I can find and book rail travel

  Background:
    Given User navigates to Cleartrip trains page

  @smoke
  Scenario: User searches for a single journey train
    When User enters train origin "Mumbai"
    And User enters train destination "Delhi"
    And User selects train departure date
    And User specifies "1" train passenger
    And User clicks train "Search" button
    Then Train search results page loads successfully
    And List of available trains is displayed

  Scenario: User searches for round-trip train
    When User selects train round-trip option
    And User enters train origin "Delhi"
    And User enters train destination "Agra"
    And User selects train departure date
    And User selects train return date
    And User clicks train "Search" button
    Then Train search results page loads successfully
    And Return trains are shown

  Scenario: User searches for trains with multiple passengers
    When User enters train origin "Mumbai"
    And User enters train destination "Pune"
    And User selects train departure date
    And User specifies "3" train passengers
    And User clicks train "Search" button
    Then Train search results page loads successfully
    And List of available trains is displayed

  Scenario Outline: User searches for trains in different classes
    When User enters train origin "Mumbai"
    And User enters train destination "Delhi"
    And User selects train departure date
    And User selects train class "<train_class>"
    And User clicks train "Search" button
    Then Train search results page loads successfully
    And Trains with "<train_class>" class are displayed

    Examples:
      | train_class |
      | Sleeper     |
      | 3A          |
      | 2A          |
      | 1A          |
