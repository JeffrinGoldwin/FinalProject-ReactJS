import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import axios from 'axios';

export const EditEventModel = (props) => {
  const token = sessionStorage.getItem('token');
  const [editedEvent, setEditedEvent] = useState({
    EventName: props.event.EventName, 
    StartTime: props.event.StartTime,
    EndTime: props.event.EndTime,
    EventStartDate: props.event.EventStartDate,
    EventEndDate: props.event.EventEndDate,
    Venue: props.event.Venue,
    Description: props.event.Description,
    Accepted: props.event.Accepted,
    Rejected: props.event.Rejected,
    Maybe: props.event.Maybe,
  });

  const handleClose = () => props.setEditModelShow(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleStartDateChange = (date) => {
    setEditedEvent({ ...editedEvent, EventStartDate: date });
  };

  const handleEndDateChange = (date) => {
    setEditedEvent({ ...editedEvent, EventEndDate: date });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/updateEvent/${props.event._id}`,editedEvent, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      // Check if the update was successful
      if (response.status === 200) {
        console.log('Event updated successfully:', response.data);
        handleClose(); // Close the modal
      } else {
        console.error('Failed to update event:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div>
  <Modal show={props.editModelShow} onHide={handleClose} backdrop="static" keyboard={false}>
    <Modal.Header closeButton className="bg-indigo-600 text-white">
      <Modal.Title>Edit Event</Modal.Title>
    </Modal.Header>
    <Modal.Body className="bg-gray-100">
      <p>
        Event Name: <input type="text" name="Eventname" value={editedEvent.EventName} onChange={handleInputChange} className="block w-full rounded-md border-4 focus:outline-none focus:border-indigo-700 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-900 sm:text-sm sm:leading-6" />
      </p>
      <p>
        Start Time: <input type="text" name="StartTime" value={editedEvent.StartTime} onChange={handleInputChange} className="block w-full rounded-md border-4 focus:outline-none focus:border-indigo-700 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-900 sm:text-sm sm:leading-6" />
      </p>
      <p>
        End Time: <input type="text" name="EndTime" value={editedEvent.EndTime} onChange={handleInputChange} className="block w-full rounded-md border-4 focus:outline-none focus:border-indigo-700 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-900 sm:text-sm sm:leading-6" />
      </p>
      <p>
        Start Date: <DatePicker selected={editedEvent.EventStartDate} onChange={handleStartDateChange} />
      </p>
      <p>
        End Date: <DatePicker selected={editedEvent.EventEndDate} onChange={handleEndDateChange} />
      </p>
      <p>
        Venue: <input type="text" name="Venue" value={editedEvent.Venue} onChange={handleInputChange} className="block w-full rounded-md border-4 focus:outline-none focus:border-indigo-700 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-900 sm:text-sm sm:leading-6" />
      </p>
      <p>
        Description: <textarea
          rows={3}
          name="Description"
          style={{ resize: 'vertical', width: '190px' }}
          value={editedEvent.Description}
          onChange={handleInputChange}
          className="block w-full rounded-md border-4 focus:outline-none focus:border-indigo-700 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-900 sm:text-sm sm:leading-6"
        />
      </p>
    </Modal.Body>
    <Modal.Footer className="bg-gray-100">
      <button onClick={handleSave} className="flex rounded-md mx-1 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
    </Modal.Footer>
  </Modal>
</div>

  );
};
