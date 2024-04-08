import React, { useEffect, useState } from "react";
import axios from "axios";
import {useLocation } from "react-router-dom";
import { UserCreationForm } from "./UserCreationForm";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"
import { UserSkillForm } from "./UserSkillForm";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);
  const location = useLocation();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/currentUser', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("data", response)
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(null); // Reset currentUser if there's an error
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    console.log("User", currentUser);
    if (currentUser.PasswordChanged === "False") {
      navigate(`/ChangePassword?email=${currentUser.Email}`);
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <p>Welcome {currentUser.FirstName} !</p>
        {currentUser.Role === "Admin" && <UserCreationForm />}
        {currentUser.Role !== "Admin" && <UserSkillForm currentUser = {currentUser}/>}
      </div>
    </div>
  );
};
