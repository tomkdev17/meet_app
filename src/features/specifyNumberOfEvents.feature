Feature: Specify number of events 
  Scenario: When user hasn't specified number of events
    Given user hasn't specified number of events
    When the user opens the app 
    Then the DOM will render 32 events by default

  Scenario: User has specified the number of events to be rendered
    Given the app is open
    And there is a list of events rendered
    When the user specifies a number of events to be rendered
    Then the app renders the specified number of events