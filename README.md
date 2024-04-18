# meet_app

The Meet application is a react powered application that makes use of the google calendar API to collect and display upcoming events in various locations. 

The creation of this app is following the Test Driven Development process (TDD) . 

Below are listed several User Stories as well as scenarios that follow Gherkin's "Given, When, Then" syntax. 

User Stories

Feature 1 : 
As a User
I should be able to filter events by city
So that only the events in a specified city will appear, cutting down on unnecessary search results.

Feature 2: 
As a User
I should be able to click a button to show/hide event details
So that I can see more information about specific events or hide that information after viewing. 

Feature 3: 
As a User
I should be able to specify how many events are rendered on the page
So that I can view the top results without an endless stream of events.

Feature 4: 
As a User 
I should be able to use this application while offline
So that I don’t have to rely on internet to use the app.

Feature 5: 
As a User 
I should be able to add a shortcut to the app to my home screen
So that I can quickly access the app without having to manually navigate to it. 

Feature 6: 
As a User
I should be able to view charts visualizing event details
So that I can see a visual representation of certain data points which might be better represented visually than numerically.


Scenarios: 

Feature 1: 
	Scenario 1: 
	Given a user hasn’t searched for a city, 
	When the user opens the app, 
	Then the user can see all upcoming events
	
	Scenario 2: 
	Given the main page is open, 
	When the user begins typing in the city search bar, 
	Then the user will see a suggested list of cities matching the search criteria 

	Scenario 3: 
	Given the user has typed a city name into the search bar && the suggested cities are present, 
	When the user selects a city
	Then the user should receive a list of events that are located within that city

Feature 2: 
	Scenario 1: 
	Given that the main page is open && there is a list of upcoming events,
	When the user inspects an event card, 
	Then the details of the event will be hidden by default 
	
	Scenario 2: 
	Given the user is interested in a particular event, 
	When they click on the ‘more details’ button, 
	Then the event card will expand to show more details about the event

	Scenario 3: 
	Given the user has expanded the details of an event card, 
	When the user clicks the ‘hide details’ button
	Then the expanded details window will collapse back to default state

Feature 3: 
	Scenario 1: 
	Given that a user has not specified a number of events to be returned per page, 
	When the main page loads, 
	Then 32 events will be shown by default

	Scenario 2: 
	Given that a user has specified a number of events to be shown, 
	When the user specifies the number,
	The application renders that number of events per page

Feature 4: 
	Scenario 1: 
	Given that a user is using the application while offline, 
	When the main page of the application is rendered, 
	Then the app will return cached event data
	
	Scenario 2: 
	Given that a user is using the application while offline, 
	When the user changes the search settings (city, number of events), 
	Then the app will display an error message

Feature 5: 
	Scenario 1: 
	Given that the user wants to have a shortcut to the app, 
	When the user clicks the ‘download home screen shortcut’ button, 
	Then a shortcut to the application will be installed on the user’s device 

Feature 6: 
	Scenario 1: 
	Given that the application is open && there are upcoming events, 
	When the user views the home screen, 
	Then the app will render a chart showing the number of upcoming events in each city. 