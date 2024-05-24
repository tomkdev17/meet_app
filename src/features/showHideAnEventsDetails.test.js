import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { async } from 'q';
import userEvent from '@testing-library/user-event';
import EventList from '../components/EventList';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    test('An event\'s details are hidden by default.', ({ given, and, when, then }) => {
        let AppComponent; 
        let AppDOM;

        given('the app is open', () => {
            AppComponent = render(<App />);
        });
        and('there is a list of upcoming events', async () => {
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor( () => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });

        when('the user inspects an event card', () => {

        });

        then('the event\'s details will be hidden by default', () => {
            const eventDetails = AppDOM.querySelector('.event-details');
            expect(eventDetails).toBeNull();
        });
    });

    test('Clicking the details button will show event details', ({ given, and, when, then }) => {
        let AppComponent;
        let AppDOM;
        let EventComponent;
        let EventListItems;

        given('the app is open', () => {
            AppComponent = render(<App />);
        });

        and('there is a list of upcoming events', async () => {
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor( () => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });

        when('the user clicks the details button', async () => {
            EventComponent = EventListItems[0];
            const DetailsButtonDOM = EventComponent.querySelector('.toggle-details');
            const user = userEvent.setup();
            await user.click(DetailsButtonDOM);
        });

        then('the event card will expand to show the event\'s details', () => {
            const eventDetails = EventComponent.querySelector('.event-details');
            expect(eventDetails).toBeInTheDocument();
        });
    });

    test('Clicking the details button again will hide the event details', ({ given, when, then }) => {
        let AppComponent;
        let AppDOM;
        let EventComponent; 
        let EventListItems;
        let DetailsButtonDOM;
        let eventDetails;
        given('the details are rendered', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor( () => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                EventComponent = EventListItems[0];
                DetailsButtonDOM = EventComponent.querySelector('.toggle-details');
            })
            const user = userEvent.setup();
            await user.click(DetailsButtonDOM);
            
            eventDetails = EventComponent.querySelector('.event-details');
            expect(eventDetails).toBeInTheDocument();
        });

        when('the user clicks the details button', async () => {
            const user = userEvent.setup();
            await user.click(DetailsButtonDOM);
        });

        then('the event card will collapse back to default', async () => {
            // const eventDetails = EventComponent.querySelector('.event-details');
            await waitFor( () => {
                expect(eventDetails).not.toBeInTheDocument();
            })
        });
    });
})