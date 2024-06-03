import { useState } from 'react';

const NumberOfEvents = ({currentNOE, setCurrentNOE, setErrorAlert}) => {

    const handleNumberChange = (event) => {
        const value = event.target.value;
        let errorText;
        // const numberValue = Number(value);

        if (isNaN(value) || value < 1 ) {
            errorText = 'Please select a positive integer for the number of events';
            setCurrentNOE(undefined);
        } else{
            errorText = '';
            setCurrentNOE(value);
            console.log('setting currentNOE:', value);
        }
        setErrorAlert(errorText);
    };

    return(
        <div id='number-of-events'>
            <p>Number of events : </p>
            <input 
                type='text'
                className='number'
                placeholder='32'
                value={currentNOE}
                onChange={handleNumberChange}
            />
        </div>
    );
};

export default NumberOfEvents;

// || numberValue <= 0