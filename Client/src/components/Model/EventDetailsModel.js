import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const EventDetailsModel = ({ eventDetailsModelshow, handleClose, event }) => {
  return (
    <div>
      <Modal show={eventDetailsModelshow} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p><strong>Event Name:</strong> {event.EventName}</p>
          <p><strong>Time:</strong> {event.Time}</p>
          <p><strong>Start Date:</strong> {event.EventStartDate}</p>
          <p><strong>End Date:</strong> {event.EventEndDate}</p>
          <p><strong>Venue:</strong> {event.Venue}</p>
          <p><strong>Description:</strong> {event.Description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
