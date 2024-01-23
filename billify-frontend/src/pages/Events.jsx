import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  readAllEvents,
  createEvent,
  deleteEventById,
} from "../services/eventService";
import Menu from "../components/Menu";
import { calculateTotal, formatPriceWithCurrencyAndCommas } from "../util";
import EventModal from "../components/EventModal";
import { event } from "../model/event";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState(event);
  const [disableCreateBtn, setDisableCreateBtn] = useState(true);

  useEffect(() => {
    readAllEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  const handleCreateEvent = () => {
    setShowEventModal(true);
  };

  const handleChange = (event, nestedProperty) => {
    const { name, value } = event.target;

    setNewEvent((prevEvent) => {
      // Split the nested property string into an array
      const nestedProperties = nestedProperty ? nestedProperty.split(".") : [];

      // Create a copy of the previous state
      const updatedEvent = { ...prevEvent };

      // Traverse the nestedProperties array to update the correct nested property
      let currentLevel = updatedEvent;
      for (let i = 0; i < nestedProperties.length; i++) {
        const propertyName = nestedProperties[i];
        currentLevel[propertyName] = currentLevel[propertyName] || {};
        if (i === nestedProperties.length - 1) {
          // If it's the last property, update its value
          currentLevel[propertyName] = value;
        } else {
          // Move to the next level
          currentLevel = currentLevel[propertyName];
        }
      }

      // If it's not a nested property, update directly
      if (!nestedProperty) {
        updatedEvent[name] = value;
      }

      return updatedEvent;
    });

    if (newEvent.name) {
      setDisableCreateBtn(false);
    }
  };

  const handleModalCreateBtn = () => {
    console.log(JSON.stringify(newEvent));
    if (newEvent.name) {
      console.log("Creating event", event);
      createEvent(newEvent).then((eventId) => {
        console.log(eventId);
        newEvent.id = eventId;
        if (eventId) {
          setEvents([...events, newEvent]);
        }
        handleCloseEventModal();
      });
      handleCloseEventModal();
    }
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
    setDisableCreateBtn(true);
    setNewEvent(event);
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
    <Menu>
      <div className="container">
        <br />
        <br />
        <br />
        <h3 className="mb-4 text-center">Event List</h3>
        <ul className="list-group">
          {events.map((event) => (
            <li
              key={event.id}
              className="list-group-item d-flex justify-content-between align-items-center row col-11 me-auto ms-auto"
              style={{ cursor: "pointer" }}
            >
              <span
                className="col-5 co-sm-3"
                onClick={() => handleEventClick(event.id)}
              >
                {event.name}
              </span>
              <span
                className={`col-3 badge ${
                  event?.paymentStatus === "done"
                    ? "bg-success"
                    : "bg-secondary"
                } rounded-pill`}
              >
                {event.expenses.length
                  ? formatPriceWithCurrencyAndCommas(
                      calculateTotal(event.expenses)
                    )
                  : "NA"}
              </span>
              <i
                className="col-2 bi bi-trash3-fill text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteEvent(event)}
              ></i>
            </li>
          ))}
        </ul>
        <button
          className="btn btn-primary fixed-bottom col-4 offset-4 rounded-pill my-3"
          onClick={handleCreateEvent}
        >
          Add Event
        </button>
      </div>
      {showEventModal && (
        <EventModal
          handleCloseEventModal={handleCloseEventModal}
          handleConfirm={handleModalCreateBtn}
          event={newEvent}
          cancelBtnText="Cancel"
          confirmBtnText="Create"
          disableConfirmBtn={disableCreateBtn}
          handleChange={handleChange}
          header="Create Event"
        />
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
    </Menu>
  );
};

export default Events;
