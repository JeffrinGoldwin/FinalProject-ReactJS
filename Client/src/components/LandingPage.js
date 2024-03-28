import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { UserCreationForm } from './UserCreationForm';


export const LandingPage = () => {
  const [users, setusers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/getUsers')
    .then(users => setusers(users.data))
    .catch(err => console.log(err))
    console.log(users)
  
  },[UserCreationForm])

  return (
    <div>
        <UserCreationForm />
    </div>
  )
}
