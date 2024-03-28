import { useState } from "react";
import "./App.css";
import { LoginPage } from "./components/LoginPage";
import { LandingPage } from "./components/LandingPage";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [users, setusers] = useState([]);
  const [loginEmail, setloginEmail] = useState("Admin@gmail.com");
  const [loginPassword, setloginPassword] = useState("Admin");

  const handleLogin = async (e) => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        loginEmail,
        loginPassword
      });
       console.log(response.data);
      navigate('/LandingPage');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="App">  
        <Routes>
          <Route path="/login" element={<LoginPage loginEmail={loginEmail}
          setloginEmail={setloginEmail}
          loginPassword={loginPassword}
          setloginPassword={setloginPassword}
          handleLogin={handleLogin}
          />} />
          <Route path="/LandingPage" element={<LandingPage />} />
        </Routes>
    </div>
  );
}

export default App;
