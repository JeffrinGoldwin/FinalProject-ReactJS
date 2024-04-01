import React, { useEffect, useState } from "react";
import axios from "axios";
import {useLocation } from "react-router-dom";
import { UserCreationForm } from "./UserCreationForm";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import CourseCards from "./Cards/CourseCards"
import { Courses } from "./Courses";

export const LandingPage = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState([]);
  const [courses, setcourses] = useState([{title:"A"}, {title:"B"}]);
  const [videoData, setVideoData] = useState([]);
  const location = useLocation();

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
    console.log("User", currentUser); // Log the currentUser whenever it changes
    if (currentUser.PasswordChanged === "False") {
      navigate("/ChangePassword");
    }
  }, [currentUser]);

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
      <div>
        <p>Welcome {currentUser.FirstName} !</p>
        {currentUser.Role === "Admin" && <UserCreationForm />}
      </div>
    </div>
  );
};
