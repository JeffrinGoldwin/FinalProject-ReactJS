import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserCreationForm } from "../Froms/UserCreationForm";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { UserSkillForm } from "../Froms/UserSkillForm";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);
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
        setCurrentUser(response.data);
        if (response.data.PasswordChanged === "False") {
          navigate(`/ChangePassword?email=${response.data.Email}`);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(null); // Reset currentUser if there's an error
      }
    };

    fetchCurrentUser();
  }, [token, navigate]);

  return (
    <div className="dark:bg-gray-800 dark:text-white min-h-screen">
      <NavBar />
      <div className="container mx-auto py-8">
        <div>{currentUser.Role === "Admin" && <UserCreationForm />}</div>
        <div>{currentUser.Role !== "Admin" && <UserSkillForm currentUser={currentUser} />}</div>
      </div>
    </div>
  );
};
