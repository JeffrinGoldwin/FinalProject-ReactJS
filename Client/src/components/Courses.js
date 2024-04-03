import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCards from './Cards/CourseCards';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import { AddCourseModel } from './Model/AddCourseModel';
import {useLocation } from "react-router-dom";

export const Courses = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const [videoData, setVideoData] = useState([]);
    const [show, setShow] = useState(false);
    const location = useLocation();
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
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:3001/courses", {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                });
                setVideoData(response.data);
            } catch (error) {
                // console.log("Error fetching courses:", error); 
            }
        };
        
        fetchCourses();
    }, [videoData]);
    
    const handleShow = () => setShow(true);

    return (
        <div className='container-fluid'>
        <NavBar />
        <CourseCards 
        videoData={videoData}
        Role = {currentUser.Role}
      />
      {currentUser.Role === 'Admin' && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <Button variant="primary" onClick={handleShow}>Create Course</Button>
        </div>
      )}
      <AddCourseModel 
        show = {show}
        setShow = {setShow}
      />
    </div>
  )
}
