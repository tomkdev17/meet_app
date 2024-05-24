Feature: Show/Hide an event's details

  Scenario: An event's details are hidden by default. 
    Given the app is open 
    And there is a list of upcoming events
    When the user inspects an event card
    Then the event's details will be hidden by default
  
  Scenario: Clicking the details button will show event details
    Given the app is open 
    And there is a list of upcoming events
    When the user clicks the details button
    Then the event card will expand to show the event's details

  Scenario: Clicking the details button again will hide the event details
    Given the details are rendered
    When the user clicks the details button
    Then the event card will collapse back to default
