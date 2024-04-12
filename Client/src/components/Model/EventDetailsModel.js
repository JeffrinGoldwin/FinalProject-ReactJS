import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import { EditEventModel } from "./EditEventModel";

export const EventDetailsModel = ({
  eventDetailsModelshow,
  handleClose,
  event,
}) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [email, setemail] = useState("");
  const [selectedEvent, setselectedEvent] = useState({});
  const [eventTitle, seteventTitle] = useState("");
  const [editModelShow, setEditModelShow] = useState(false);
  const [clicked, setClicked] = useState(false);
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("http://localhost:3001/currentUser", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const checkAcceptReject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/checkAcceptReject?email=${currentUser.Email}&eventName=${event.EventName}` , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        // Check if the response contains data
        if (response.data) {
          // Set the email and event title from the response data
          setemail(response.data.Email);
          seteventTitle(response.data.EventName);
        }
      } catch (error) {
        console.error("Error checking accept/reject:", error);
      }
    };

    checkAcceptReject();
  }, [currentUser.Email, event.EventName]);

  useEffect(() => {
    setselectedEvent(event)
  }, [event])
  
  const handleSpanClick = async () => {
    setClicked(true);
    try {
      const response = await axios.post('http://localhost:3001/send-email', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body : {
          name: currentUser.FirstName,
          subject: 'Intrested',
          body: `${currentUser.FirstName} is intrested in ${selectedEvent.EventName}`,
          eventName: selectedEvent.EventName,
        }
      })
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleModelShow = () => {
    setEditModelShow(true);
    handleClose();
  };

  const HandleEventAlmostFill = async () => {
    try {
      const response = await axios.get('https://localhost:3001/eventAlmostFull', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const HandleConfirmation = async () => {
    try {
      const response = await axios.put('http://localhost:3001/Confirmation' , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body : {
          Email: currentUser.Email,
          EventName : selectedEvent.EventName
        }
      })
    } catch (error) {
      console.error('Error in confirmation:', error);
    }
  }

  const handleAccept = async () => {
    try {
      // Increment event.accept by 1 locally
      const updatedEvent = { ...event, Accepted: event.Accepted + 1 };
      console.log("up data", updatedEvent);

      HandleConfirmation();
      if(selectedEvent.Capacity - selectedEvent.Accepted <= 5 ){
        HandleEventAlmostFill();
      }

      // Make an API call to update the event in the database
      const response = await axios.put(`http://localhost:3001/updateEventStatus/${event._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body : {
          updatedEvent
        }
      });

      // Check if the update was successful
      if (response.status === 200) {
        console.log("Event accept incremented successfully:", response.data);
        handleClose(); // Close the modal
        setemail(currentUser.Email);
        seteventTitle(selectedEvent.EventName);
        const acceptRejectData = {
          Email: currentUser.Email,
          EventName: event.EventName,
          AcceptOrReject: "1",
        };
        const acceptRejectResponse = await axios.post("http://localhost:3001/addAcceptReject", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body : {
            acceptRejectData
          }
        });
        console.log(
          "Accept/reject data added successfully:",
          acceptRejectResponse.data
        );
      } else {
        console.error("Failed to increment event accept:", response.statusText);
      }
    } catch (error) {
      console.error("Error incrementing event accept:", error);
    }
  };

  const handleReject = async () => {
    try {
      const updatedEvent = { ...event, Rejected: event.Rejected + 1 };
      console.log("up data", updatedEvent);

      // Make an API call to update the event in the database
      const response = await axios.put(`http://localhost:3001/updateEventStatus/${event._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body : {
          updatedEvent
        }
      });

      // Check if the update was successful
      if (response.status === 200) {
        console.log("Event reject incremented successfully:", response.data);
        handleClose(); // Close the modal
        setemail(currentUser.Email);
        seteventTitle(selectedEvent.EventName);
        const acceptRejectData = {
          Email: currentUser.Email,
          EventName: event.EventName,
          AcceptOrReject: "2",
        };
        const acceptRejectResponse = await axios.post("http://localhost:3001/addAcceptReject", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body:{
            acceptRejectData
          }
        });
        console.log(
          "Accept/reject data added successfully:",
          acceptRejectResponse.data
        );
      } else {
        console.error("Failed to increment event accept:", response.statusText);
      }
    } catch (error) {
      console.error("Error incrementing event accept:", error);
    }
  };

  const handleMaybe = async () => {
    try {
      const updatedEvent = { ...event, Maybe: event.Maybe + 1 };
      console.log("up data", updatedEvent);

      // Make an API call to update the event in the database
      const response = await axios.put(
        `http://localhost:3001/updateEventStatus/${event._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body : {
            updatedEvent
          }
        });

      // Check if the update was successful
      if (response.status === 200) {
        console.log("Event reject incremented successfully:", response.data);
        handleClose(); // Close the modal
        setemail(currentUser.Email);
        seteventTitle(selectedEvent.EventName);
        const acceptRejectData = {
          Email: currentUser.Email,
          EventName: event.EventName,
          AcceptOrReject: "3",
        };
        const acceptRejectResponse = await axios.post("http://localhost:3001/addAcceptReject", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body : {
            acceptRejectData
          }
        });
        console.log(
          "Accept/reject data added successfully:",
          acceptRejectResponse.data
        );
      } else {
        console.error("Failed to increment event maybe:", response.statusText);
      }
    } catch (error) {
      console.error("Error incrementing event maybe:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Make an API call to delete the event
      const response = await axios.delete(`http://localhost:3001/deleteEvent/${event._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      // Check if the event was deleted successfully
      if (response.status === 200) {
        console.log('Event deleted successfully');
        handleClose(); // Close the modal or perform any other necessary actions
      } else {
        console.error('Failed to delete event:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
  <Modal
    show={eventDetailsModelshow}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton className="bg-gray-900 text-white">
      <Modal.Title>Event</Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-gray-100">
      <p>
        <strong>Event Name:</strong> {selectedEvent.EventName}
      </p>
      <p>
        <strong>Start Time:</strong> {selectedEvent.StartTime}
      </p>
      <p>
        <strong>End Time:</strong> {selectedEvent.EndTime}
      </p>
      <p>
        <strong>Start Date:</strong> {selectedEvent.EventStartDate}
      </p>
      <p>
        <strong>End Date:</strong> {selectedEvent.EventEndDate}
      </p>
      <p>
        <strong>Trainer Name:</strong> {selectedEvent.TrainerName}
      </p>
      <p>
        <strong>Trainer Email:</strong> {selectedEvent.TrainerEmail}
      </p>
      <p>
        <strong>Venue:</strong> {selectedEvent.Venue}
      </p>
      <p>
        <strong>Participents: </strong> {selectedEvent.Accepted}/{selectedEvent.Capacity}
      </p>
      <p>
        <strong>Description:</strong> {selectedEvent.Description}
      </p>
      {currentUser.Role === "Admin" && (
      <>
      <p>
        <strong>Accepted:</strong> {selectedEvent.Accepted}
      </p>
      <p>
        <strong>Rejected:</strong> {selectedEvent.Rejected}
      </p>
      <p>
        <strong>Maybe:</strong> {selectedEvent.Maybe}
      </p>
      </>
      )}
    </Modal.Body>
    <Modal.Footer className="bg-gray-900">
      {currentUser.Role === "User" ? (
      <div>
        {(currentUser.Email === email && eventTitle === selectedEvent.EventName) ? (
          <>
          {selectedEvent.Capacity-selectedEvent.Accepted == 0 ? (
              <u>
                <span style={{ color: "blue" }} onClick={handleSpanClick}>
                  {clicked ? 'Notified!' : 'Click Here if you are interested'}
                </span>
              </u>
            ) : null}
          {' '}
          <Button variant="secondary" disabled>Answered</Button>
          </>
        ) : (
        <Dropdown as={ButtonGroup}>
          <Button variant="primary" onClick={handleAccept}>
            Accept
          </Button>
          <Dropdown.Toggle
            split
            variant="primary"
            id="dropdown-split-basic"
          />
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleReject}>Reject</Dropdown.Item>
            <Dropdown.Item onClick={handleMaybe}>Maybe</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        )}
      </div>
      ) : (
      <div>
        <div className="flex">
          <button
            onClick={handleDelete}
            type="button"
            className="flex rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
          <button
            onClick={handleModelShow}
            type="button"
            className="flex rounded-md mx-1 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
        </div>
      </div>
      )}
    </Modal.Footer>
  </Modal>
  <EditEventModel 
    editModelShow={editModelShow}
    setEditModelShow={setEditModelShow}
    event={event}
  />
</div>

  );
};
