import React from 'react'
import { useState, useEffect } from 'react' 
import axios from 'axios'
import {useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { AddEventModel } from './Model/AddEventModel';
import { EventCards } from './Cards/EventCards';
import NavBar from './NavBar';

export const Events = () => {

    const [show, setShow] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const location = useLocation();
    const [events, setEvents] = useState([]);
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
            setCurrentUser(null); // Reset currentUser if there's an error
          }
        };
    
        fetchCurrentUser();
      }, [location.pathname]);

      useEffect(() => {
        const fetchEvents = async () => {
          try {
            const response = await axios.get('http://localhost:3001/events', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              }
            });
            setEvents(response.data);
          } catch (error) {
            console.error('Error fetching events:', error);
          }
        };
    
        fetchEvents();
      }, [events]);


    const handleShow = () => setShow(true);

  return (
    <div className='min-h-screen dark:bg-gray-800'>
        <NavBar />  
        <EventCards 
        events = {events}/>
        {currentUser.Role === 'Admin' && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <button variant="primary" onClick={handleShow} className="flex rounded-md mx-1 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Create Event
          </button>
        </div>
      )}
      <AddEventModel 
        show = {show}
        setShow = {setShow}
      />
    </div>
  )
}
