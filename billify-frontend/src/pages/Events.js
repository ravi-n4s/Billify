import { useState } from "react";
import { useNavigate } from "react-router";

const Events = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    { id: 1, name: "Event 1" },
    { id: 2, name: "Event 2" },
    { id: 3, name: "Event 3" },
  ]);

  const handleCreateEvent = () => {
    const eventName = prompt("Enter the event name:");
    if (eventName) {
      const newEvent = { id: events.length + 1, name: eventName };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (eventName) => {
    navigate(`/events/${eventName}/expenses`);
  };

  return (
    <div className="container">
      <h1 className="mt-4">Event List</h1>
      <ul className="list-group">
        {events.map((event) => (
          <li
            key={event.id}
            className="list-group-item"
            onClick={() => handleEventClick(event.id)}
          >
            {event.name}
          </li>
        ))}
      </ul>
      <button className="btn btn-primary mt-4" onClick={handleCreateEvent}>
        Add Event
      </button>
    </div>
  );
};

export default Events;
