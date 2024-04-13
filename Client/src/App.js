import { useState } from "react";
import "./App.css";
import { LoginPage } from "./components/LoginModule/LoginPage";
import { LandingPage } from "./components/Pages/LandingPage";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "./components/LoginModule/ChangePassword";
import { Courses } from "./components/Pages/Courses";
import { Events } from "./components/Pages/Events";
import { NotFound } from "./components/Pages/NotFound";
import Video from "./components/Pages/Video";
import { ForgotPassword } from "./components/LoginModule/ForgotPassword";
import { Confirmation } from "./components/LoginModule/Confirmation";

function App() {
  const navigate = useNavigate();
  const [loginEmail, setloginEmail] = useState("msg3dv@gmail.com");
  const [loginPassword, setloginPassword] = useState("12345");

  const handleLogin = async (e) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        Email : loginEmail,
        Password: loginPassword,
      });
      const { token } = response.data; 
      sessionStorage.setItem('token', token)
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
        <Route path="/Courses" element={<Courses />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/Courses/video" element={<Video />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path='/Confirmation' element={<Confirmation />} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
