import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export const LoginPage = (props) => {
  sessionStorage.clear();
  return (
    <div>
      Email : <input type="text" value={props.loginEmail} onChange={(e) => props.setloginEmail(e.target.value)}/>
      <br />
      Password : <input type="password" value={props.loginPassword} onChange={(e) => props.setloginPassword(e.target.value)}/>
      <br />
      <button onClick={props.handleLogin}>Login</button>
      <br />
      <Link to="/ForgotPassword">Forgot Password</Link>
    </div>
  );
};
