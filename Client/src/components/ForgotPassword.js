import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleOTP = async () => {
    try {
      const response = await axios.post('http://localhost:3001/sendOTP', { email });
        navigate('/OTPVerification');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send OTP. Mail ID doesnt exist in the database.');
    }
  };

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <br />
      <br />    
      <button onClick={handleOTP}>Send OTP</button>
    </div>
  );
};
