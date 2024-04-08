import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [loginEmail, setloginEmail] = useState('');
  const navigate = useNavigate();


  const handleSendEmail = async () => {
    try {
      await axios.post('http://localhost:3001/forgotPassword', { email: loginEmail });
      navigate(`/Confirmation?email=${loginEmail}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      Email : <input type="text" value={loginEmail} onChange={(e) => setloginEmail(e.target.value)} />
      <br />
      <br />
      <button type="button" onClick={handleSendEmail}>Send Email</button>
    </div>
  );
};
