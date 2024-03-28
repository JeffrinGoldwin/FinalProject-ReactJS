import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { UserCreationForm } from './UserCreationForm';
import { useNavigate } from "react-router-dom";


export const LandingPage = () => {
    const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/currentUser'); // Assuming this endpoint returns the current user data
        // console.log(response.data);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
        setCurrentUser(null); // Reset currentUser if there's an error
      }
    };

    fetchCurrentUser();
  }, [location.pathname]); //  route changes

  useEffect(() => {
    console.log("User", currentUser); // Log the currentUser whenever it changes
    if(currentUser.PasswordChanged === "False") {
      navigate("/ChangePassword");
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Landing Page</h1>
        <div>
          <p>Welcome, {currentUser.FirstName}!</p>
          <p>Email: {currentUser.Email}</p>
          {currentUser.Role === 'Admin' && <UserCreationForm />}
        </div>
    </div>
  );
};
