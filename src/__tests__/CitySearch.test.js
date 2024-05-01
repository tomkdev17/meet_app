import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';
import { getEventListeners } from 'events';

describe('<CitySearch /> component', () => {

    let citySearchComponent;

    beforeEach( () => {
        citySearchComponent = render(<CitySearch />);
    });

    test('renders a text input', () => {
        const cityTextBox = citySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument(); 
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestion list is hidden by default', () => {
        const suggestionList = citySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions upon focus', async () => {
        const user = userEvent.setup();
        const cityTextBox = citySearchComponent.queryByRole('textbox');
        await user.click(cityTextBox);
        const suggestionList = citySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        citySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
        const cityTextBox = citySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');
        const suggestions = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
        }) : [];
        const suggestionListItems = citySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
    });

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents(); 
        const allLocations = extractLocations(allEvents);
        citySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
    
        const cityTextBox = citySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");
    
        // the suggestion's textContent look like this: "Berlin, Germany"
        const BerlinGermanySuggestion = citySearchComponent.queryAllByRole('listitem')[0];
    
        await user.click(BerlinGermanySuggestion);
    
        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
      });
});