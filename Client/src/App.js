import { useEffect, useState } from 'react';
import './App.css';
import { LoginPage } from './components/LoginPage';
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
    // for(let i=0; i<users.length; i++){
    //   // const user = users[i].find(users => users.Email === loginEmail && users.Password === loginPassword);
    //   const user = users[i].Email = loginEmail && users[i].password == loginPassword
    //   console.log(summa)
    //   if (user) {
    //     console.log('Login successful');
    //     break;
    //   } else {
    //     console.log('Invalid email or password');
    //   }
    // }
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
      <LoginPage 
        loginEmail = {loginEmail}
        setloginEmail = {setloginEmail}
        loginPassword = {loginPassword}
        setloginPassword = {setloginPassword}
        handleLogin = {handleLogin}
      />
      {/* Name : 
      {
        users.map(users => {
           return (<p>{users.FirstName}</p>)
        })
      } */}
    </div>
  );
}

export default App;
