import { render, within } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import { userEvent } from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';
import {currentNOE, setCurrentNOE} from '../App';

describe('<NumberOfEvents /> component', () => {

    let numberOfEvents ; 

    beforeEach( () => {
        numberOfEvents = render(<NumberOfEvents setCurrentNOE={setCurrentNOE} />);
    });

    test('NumberOfEvents renders a textbox', () => {
        const inputField = numberOfEvents.queryByRole('textbox');
        expect(inputField).toBeInTheDocument();
    });

    test('NumberOfEvents has default value of 32', () => {
        const inputField = numberOfEvents.queryByRole('textbox');
        expect(inputField.placeholder).toBe("32");
    });

    test('NumberOfEvents value changes with user input', async () => {
        const user = userEvent.setup();
        const inputField = numberOfEvents.queryByRole('textbox');
        numberOfEvents.rerender(<NumberOfEvents setCurrentNOE={() => {}}/>);
        await user.type(inputField, '{backspace}{backspace}10');
        
        expect(inputField.value).toBe('10');
    });
});

describe('<NumberOfEvents /> integration', () => {
    test('Correct number of events is rendered after user changes NumberOfEvents value', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const NoeDOM = AppDOM.querySelector('#number-of-events');
        const NoeInput = within(NoeDOM).queryByRole('textbox');

        await user.type(NoeInput, '{backspace}{backspace} 10');

        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');

        // const allEvents = await getEvents();

        expect(allRenderedEventItems.length).toBe(10);
    })
});