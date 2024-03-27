import { useEffect, useState } from 'react';
import './App.css';
import { LoginPage } from './components/LoginPage';
import { LandingPage } from './components/LandingPage';
import axios from 'axios'


function App() {
  const [users, setusers] = useState([])
  const [loginEmail, setloginEmail] = useState("Admin@gmail.com")
  const [loginPassword, setloginPassword] = useState("Admin")

  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
    .then(users => setusers(users.data))
    .catch(err => console.log(err))
    console.log(users)
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault();
    users.forEach(obj => {
      const checker = obj.Email = loginEmail && obj.Password == loginPassword
      if (checker) {
        console.log('Login successful');
        return ;
      } else {
        console.log('Invalid email or password');
      }
    })
  }

  return (
    <div className="App">
        {/* <LoginPage 
          loginEmail={loginEmail}
          setloginEmail={setloginEmail}
          loginPassword={loginPassword}
          setloginPassword={setloginPassword}
          handleLogin={handleLogin}
        /> */}
        <LandingPage />
    </div>
  );
}

export default App;
