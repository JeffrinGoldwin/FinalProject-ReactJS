import { useEffect, useState } from "react";
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

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((response) => setusers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    users.forEach((obj) => {
      console.log(obj.Email)
      const checker = obj.Email === loginEmail && obj.Password === loginPassword;
      if (checker) {
        console.log("Login successful");
        navigate('/LandingPage');
        ;
      } else {
        console.log("Invalid email or password");
      }
    });
  };

  return (
    <div className="App">
      {/* <LoginPage 
          loginEmail={loginEmail}
          setloginEmail={setloginEmail}
          loginPassword={loginPassword}
          setloginPassword={setloginPassword}
          handleLogin={handleLogin}
        /> */}
      {/* <LandingPage /> */}
      
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
