import Events from './Events'

const EventList = ({events}) => {
    return (
        <ul id='event-list'>
            {events? events.map(event => <Events key={event.id} event={event} />) : null}
        </ul>
    )
};

export default EventList;