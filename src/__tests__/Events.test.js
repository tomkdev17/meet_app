import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Events from '../components/Events';
import { getEvents } from '../api';

describe('<Events /> component', () => {

    let EventComponent ; 
    let allEvents ; 

    beforeAll(async () => {
        allEvents = await getEvents();
    });

    beforeEach( () => {
        EventComponent = render(<Events event={allEvents[0]}/>);
    });

    test('renders event title', () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test('renders event start time', () => {
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });

    test('renders event location', () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    test('renders event details button with text "show details"', () => {
        expect(EventComponent.queryByText('Show details')).toBeInTheDocument();
    });

    test('by default, event details should be hidden', () => {
        const eventDetails = EventComponent.container.querySelector('.event-details');
        expect(eventDetails).not.toBeInTheDocument();
    });

    test('shows details section when user clicks on the details button', async () => {
        const user = userEvent.setup();
        const detailsButton = EventComponent.queryByText('Show details');
        await user.click(detailsButton);
        const eventDetails = EventComponent.container.querySelector('.event-details');
        expect(eventDetails).toBeInTheDocument();
    });

    test('hides details section when user clicks on the hide details button', async () => {
        const user = userEvent.setup();
        const hideDetails = EventComponent.queryByText('Hide details');
        await user.click(hideDetails);
        const eventDetails = EventComponent.container.querySelector('.event-details');
        expect(eventDetails).not.toBeInTheDocument;
    });
})