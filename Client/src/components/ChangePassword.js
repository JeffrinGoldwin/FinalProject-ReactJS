import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


export const ChangePassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [emailID, setEmailID] = useState('')
    const [newPassword, setNewPassword] = useState('12345')
    const token = sessionStorage.getItem('token')

  const handleChangePassword = () => {
    // Here you can add your logic to send the new password to the server and update the user's password
    axios.post(
      'http://localhost:3001/changePassword', 
      { newPassword: newPassword , email: emailID}
    )
    .then(response => {
      console.log('Password changed successfully');
      navigate("/Login");
    }) 
    .catch(error => {
      console.error('Error changing password:', error);
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    setEmailID(email);
    }, [location.search]);

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
