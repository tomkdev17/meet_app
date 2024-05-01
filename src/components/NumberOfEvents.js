import { useState } from 'react';

const NumberOfEvents = () => {

    const [eventsNumber, setEventsNumber] = useState(32);

    const handleNumberChange = (event) => {
        const value = event.target.value;
        setEventsNumber(value);
    };

    return(
        <div id='number-of-events'>
            <p>Number of events : </p>
            <input 
                type='text'
                className='number'
                placeholder='32'
                value={eventsNumber}
                onChange={handleNumberChange}
            />
        </div>
    );
};

export default NumberOfEvents;