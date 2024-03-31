import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCards from './Cards';
import NavBar from './NavBar';

export const Courses = () => {

    const [courses, setcourses] = useState([{title:"A"}, {title:"B"}]);
    const [videoData, setVideoData] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get("http://localhost:3001/courses");
            setVideoData(response.data);
          } catch (error) {
            console.error("Error fetching courses:", error);
          }
        };
    
        fetchCourses();
      }, []);

  return (
    <div>
        <NavBar />
        <CourseCards 
        courses={courses}
        videoData={videoData}
      />
    </div>
  )
}
