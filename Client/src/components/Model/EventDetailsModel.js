import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import axios from 'axios';


export const EventDetailsModel = ({
  eventDetailsModelshow,
  handleClose,
  event,
}) => {

    const [currentUser, setCurrentUser] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [email, setemail] = useState('');
    const [eventTitle, seteventTitle] = useState('');

    useEffect(() => {
        const fetchCurrentUser = async () => {
          try {
            const response = await axios.get("http://localhost:3001/currentUser");
            setCurrentUser(response.data);
          } catch (error) {
            console.error("Error fetching current user:", error);
            setCurrentUser(null); // Reset currentUser if there's an error
          }
        };
    
        fetchCurrentUser();
      }, []);

      useEffect(() => {
        const checkAcceptReject = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/checkAcceptReject?email=${currentUser.Email}&eventName=${event.EventName}`);
            // Check if the response contains data
            if (response.data) {
              // Set the email and event title from the response data
              setemail(response.data.Email);
              seteventTitle(response.data.EventName);
              console.log(response.data.Email)
              console.log(response.data.EventName)
              console.log(currentUser.Email)
              console.log(event.EventName)
              // If the response data exists, set showDropdown to true
              setShowDropdown(true);
            }
          } catch (error) {
            console.error('Error checking accept/reject:', error);
          }
        };
      
        checkAcceptReject();
      }, [currentUser.Email, event.EventName]);

    const handleAccept = async () => {
        try {
            // Increment event.accept by 1 locally
            const updatedEvent = { ...event, Accepted: event.Accepted + 1 };
            console.log("up data", updatedEvent)
        
            // Make an API call to update the event in the database
            const response = await axios.put(`http://localhost:3001/updateEvent/${event._id}`, updatedEvent);
            
            // Check if the update was successful
            if (response.status === 200) {
              console.log('Event accept incremented successfully:', response.data);
              handleClose(); // Close the modal
              const acceptRejectData = {
                Email: currentUser.Email, 
                EventName: event.EventName,
                AcceptOrReject: '1'
                };
                const acceptRejectResponse = await axios.post('http://localhost:3001/addAcceptReject', acceptRejectData);
                console.log('Accept/reject data added successfully:', acceptRejectResponse.data);
            } else {
              console.error('Failed to increment event accept:', response.statusText);
            }
          } catch (error) {
            console.error('Error incrementing event accept:', error);
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
        <Modal.Header closeButton>
          <Modal.Title>Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Event Name:</strong> {event.EventName}
          </p>
          <p>
            <strong>Start Time:</strong> {event.StartTime}
          </p>
          <p>
            <strong>End Time:</strong> {event.EndTime}
          </p>
          <p>
            <strong>Start Date:</strong> {event.EventStartDate}
          </p>
          <p>
            <strong>End Date:</strong> {event.EventEndDate}
          </p>
          <p>
            <strong>Venue:</strong> {event.Venue}
          </p>
          <p>
            <strong>Description:</strong> {event.Description}
          </p>
        </Modal.Body>
        <Modal.Footer>
        {!(currentUser.Email === email && eventTitle === event.EventName) && (
            <Dropdown as={ButtonGroup}>
                <Button variant="primary" onClick={handleAccept}>Accept</Button>
                <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
                <Dropdown.Menu>
                    <Dropdown.Item>{event.Accepted}</Dropdown.Item>
                    <Dropdown.Item>Maybe</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};
