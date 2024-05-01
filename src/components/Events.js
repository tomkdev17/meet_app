import { useState } from 'react';

const Events = ({event}) => {
    
    const [showDetails, setShowDetails] = useState(false);
    
    return (
        <li className='event'>
            <h3 className='event-title'>{event && event.summary}</h3>
            <p className='event-time'>{event && event.created}</p>
            <p className='event-location'>{event && event.location}</p>
            {showDetails ? 
                <p className='event-details'>Details: {event && event.description}</p>
                : null 
            }
            <button className='toggle-details'
                onClick={() => { showDetails ? setShowDetails(false) : setShowDetails(true) }}
            >
                {showDetails ? 'Hide details' : 'Show details'} 
            </button>
        </li>
    );
};

export default Events;