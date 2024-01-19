import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  readAllEvents,
  createEvent,
  deleteEventById,
} from "../services/eventService";

const Events = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    readAllEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  const handleCreateEvent = () => {
    const eventName = prompt("Enter the event name:");
    if (eventName) {
      const newEvent = { name: eventName, expenses: [] };
      createEvent(newEvent).then((eventId) => {
        console.log(eventId);
        if (eventId) {
          setEvents([...events, { id: eventId, name: eventName }]);
        }
      });
    }
  };

  const handleDeleteEvent = (event) => {
    if (
      window.confirm(`Are you sure you want to delete event - ${event.name}`)
    ) {
      console.log("Deleting event", event);
      deleteEventById(event.id).then((isDeleted) => {
        readAllEvents().then((data) => {
          setEvents(data);
        });
      });
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}/expenses`);
  };

  return (
    <div className="container">
      <h1 className="mt-4">Event List</h1>
      <ul className="list-group">
        {events.map((event) => (
          <li
            key={event.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <span onClick={() => handleEventClick(event.id)}>{event.name}</span>
            <i
              className="bi bi-trash3-fill text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteEvent(event)}
            ></i>
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
