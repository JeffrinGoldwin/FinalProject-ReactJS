import { useState } from "react";
import "./App.css";
import { LoginPage } from "./components/LoginPage";
import { LandingPage } from "./components/LandingPage";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "./components/ChangePassword";

function App() {
  const navigate = useNavigate();
  const [loginEmail, setloginEmail] = useState("jeffrin.2005031@srec.ac.in");
  const [loginPassword, setloginPassword] = useState("O3DJ;MRUP!#D");

  const handleLogin = async (e) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        Email : loginEmail,
        Password: loginPassword,
      });
      navigate("/LandingPage");
    } catch (error) {
      console.error("Login error:", error);
    }
  };  

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              loginEmail={loginEmail}
              setloginEmail={setloginEmail}
              loginPassword={loginPassword}
              setloginPassword={setloginPassword}
              handleLogin={handleLogin}
            />
          }
        />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
      </Routes>
    </div>
  );
}

export default App;
