import { loadFeature, defineFeature } from 'jest-cucumber'; 
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { async } from 'q';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('When user hasn\'t specified number of events', ({ given, when, then }) => {
        given('user hasn\'t specified number of events', () => {

        });

        let AppComponent;

        when('the user opens the app', () => {
            AppComponent = render(<App />);
        });

        then(/^the DOM will render (\d+) events by default$/, async (arg0) => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor( () => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('User has specified the number of events to be rendered', ({ given, and, when, then }) => {

        let AppComponent; 
        let AppDOM;
        let EventListItems;
        let EventListDOM;

        given('the app is open', () => {
            AppComponent = render(<App />);    
        });

        and('there is a list of events rendered', async () => {
            AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor( () => {
                EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            })
        });

        when('the user specifies a number of events to be rendered', async () => {
            
            const user = userEvent.setup();
            const NumberDOM = AppDOM.querySelector('#number-of-events');
            const numberInput = within(NumberDOM).queryByRole('textbox');

            await user.type(numberInput, '{backspace}{backspace}10');
        });

        then('the app renders the specified number of events', async () => {
            await waitFor( () => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(10);
            });
        });
    });
});