import React from 'react'
import { useState, useEffect } from 'react' 
import axios from 'axios'
import {useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { AddEventModel } from './Model/AddEventModel';
import { EventCards } from './Cards/EventCards';

export const Events = () => {

    const [show, setShow] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const location = useLocation();
    const [events, setEvents] = useState([]);

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
      }, [location.pathname]);

      useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await axios.get('http://localhost:3001/events');
            setEvents(response.data);
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        };
    
        fetchEvents();
      }, []);


    const handleShow = () => setShow(true);

  return (
    <div>
        <EventCards 
        events = {events}/>
        {currentUser.Role === 'Admin' && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <Button variant="primary" onClick={handleShow}>Create Event</Button>
        </div>
      )}
      <AddEventModel 
        show = {show}
        setShow = {setShow}
      />
    </div>
  )
}
