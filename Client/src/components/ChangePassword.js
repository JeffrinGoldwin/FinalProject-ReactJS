import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const ChangePassword = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('12345')
    const [currentUser, setCurrentUser] = useState([]);

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
      }, []);

      useEffect(() => {
        console.log("User", currentUser); // Log the currentUser whenever it changes
      }, [currentUser]);


  const handleChangePassword = () => {
    // Here you can add your logic to send the new password to the server and update the user's password
    axios.post('http://localhost:3001/changePassword', { newPassword: newPassword  })
      .then(response => {
        console.log('Password changed successfully');
        navigate("/Login");
      }) 
      .catch(error => {
        console.error('Error changing password:', error);
      });
  };

  return (
    <div>
        <h1>Change Password</h1>
        <p>Type your new password</p>
        New Password : <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
        <br />
        <br />
        <button onClick={handleChangePassword}>Confirm</button>
    </div>
  )
}
