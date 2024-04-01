import React, { useState } from "react";
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
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [maybe, setMaybe] = useState(0);

  const handleClose = () => props.setShow(false);

  const handleAddEvent = async () => {
    try {
      const response = await axios.post("http://localhost:3001/addEvent", {
        EventName: eventName,
        StartTime: startTime,
        EndTime: endTime,
        EventStartDate: eventStartDate.toISOString(),
        EventEndDate: eventEndDate.toISOString(),
        Venue: venue,
        Description: description,
        Accepted: accepted,
        Rejected: rejected,
        Maybe: maybe,
      });
      console.log("Event added successfully:", response.data);
      // Clear input fields
      setEventName("");
      setStartTime("");
      setEndTime("");
      setEventStartDate(null);
      setEventEndDate(null);
      setVenue("");
      setDescription("");
      setAccepted(0);
      setRejected(0);
      setMaybe(0);
      handleClose();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div>
      <Modal
        show={props.show}
        onHide={handleClose}
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
          Venue:{" "}
          <input
            type="text"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
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
          <Button onClick={handleAddEvent} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
