import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {

    let numberOfEvents ; 

    beforeEach( () => {
        numberOfEvents = render(<NumberOfEvents />);
    });

    test('NumberOfEvents renders a textbox', () => {
        const inputField = numberOfEvents.queryByRole('textbox');
        expect(inputField).toBeInTheDocument();
    });

    test('NumberOfEvents has default value of 32', () => {
        const inputField = numberOfEvents.queryByRole('textbox');
        expect(inputField.value).toBe("32");
    });

    test('NumberOfEvents value changes with user input', async () => {
        const user = userEvent.setup();
        const inputField = numberOfEvents.queryByRole('textbox');
        const newValue = await user.type(inputField, '{backspace}{backspace}10');
        numberOfEvents.rerender(<NumberOfEvents />);
        expect(inputField.value).toBe('10');
    });
});