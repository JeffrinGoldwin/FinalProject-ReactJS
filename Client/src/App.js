import { useEffect, useState } from 'react';
import './App.css';
import { LoginPage } from './components/LoginPage';
import axios from 'axios'

function App() {
  const [users, setusers] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
    .then(users => setusers(users.data))
    .catch(err => console.log(err))
    console.log(users)
  }, [])


  return (
    <div className="App">
      Name : 
      {
        users.map(users => {
           return (<p>{users.FirstName}</p>)
        })
      }
    </div>
  );
}

export default App;
