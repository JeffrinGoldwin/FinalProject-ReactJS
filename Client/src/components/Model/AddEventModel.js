import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddEventModel = (props) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventStartDate, setEventStartDate] = useState(null);
  const [eventEndDate, setEventEndDate] = useState(null);
  const [trainerName, setTrainerName] = useState("");
  const [trainerEmail, setTrainerEmail] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState();
  const [description, setDescription] = useState("");
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [maybe, setMaybe] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getUsers', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          } 
        }); // Replace the URL with your backend API endpoint
        setUsers(response.data.map(user => ({ FirstName: user.FirstName, LastName: user.LastName, Email: user.Email })));
        console.log(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); 

  const handleCloseModel = () => props.setShow(false);

  const handleUserChange = (event) => {
    const selectedFirstName = event.target.value;
    setSelectedUser(selectedFirstName);
    const selectedUser = users.find(user => user.FirstName === selectedFirstName);
    if (selectedUser) {
      setTrainerName(`${selectedUser.FirstName} ${selectedUser.LastName}`);
      setTrainerEmail(selectedUser.Email);
    }
  };

  const handleAddEvent = async () => {
    try {
      handleCloseModel();
      const response = await axios.post("http://localhost:3001/addEvent", {
        EventName: eventName,
        StartTime: startTime,
        EndTime: endTime,
        EventStartDate: eventStartDate.toISOString(),
        EventEndDate: eventEndDate.toISOString(),
        TrainerName : trainerName,
        TrainerEmail : trainerEmail,
        Venue: venue,
        Capacity : capacity,
        Description: description,
        Accepted: accepted,
        Rejected: rejected,
        Maybe: maybe,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      console.log("Event added successfully:", response.data);
      setEventName("");
      setStartTime("");
      setEndTime("");
      setEventStartDate(null);
      setEventEndDate(null);
      setSelectedUser("")
      setTrainerName("")
      setTrainerEmail("")
      setVenue("");
      setDescription("");
      setAccepted(0);
      setRejected(0);
      setMaybe(0);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div>
      <Modal
        show={props.show}
        onHide={handleCloseModel}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Event Name:{" "}
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <br />
          <br />
          Start Time:{" "}
          <input
            type="text"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <br />
          <br />
          End Time:{" "}
          <input
            type="text"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <br />
          <br />
          Event Start Date:{" "}
          <DatePicker
            selected={eventStartDate}
            onChange={(date) => setEventStartDate(date)}
            dateFormat="dd/MM/yyyy"
          />
          <br />
          <br />
          Event End Date:{" "}
          <DatePicker
            selected={eventEndDate}
            onChange={(date) => setEventEndDate(date)}
            dateFormat="dd/MM/yyyy"
          />
          <br />
          <br />
          <label htmlFor="userDropdown">Select a Trainer:</label>
          <select id="userDropdown" value={selectedUser} onChange={handleUserChange}>
            <option value="" disabled hidden>Select a Trainer</option>
            {users.map((user, index) => (
              <option key={index} value={user.FirstName}>{user.FirstName}</option>
            ))}
          </select>
          <br />
          <br />
            Trainer Name:{" "}
            <input
              type="text"
              value={trainerName}
              onChange={(e) => setTrainerName(e.target.value)}
              disabled
            />
            <br />
            <br />
            Trainer Email:{" "}
            <input
              type="text"
              value={trainerEmail}
              onChange={(e) => setTrainerEmail(e.target.value)}
              disabled
            />
          <br />
          <br />
          Venue:{" "}
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
          <br />
          <br />
          Capacity:{" "}
          <input
            type="text"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <br />
          <br />
          Description:{" "}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            col={20}
            style={{ resize: "vertical", width: "190px" }}
          />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleAddEvent} className="flex rounded-md mx-1 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
