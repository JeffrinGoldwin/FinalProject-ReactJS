import React from 'react'
import {useState } from 'react';
import axios from 'axios'



export const UserCreationForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();
    
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      age,
      role
    };

    try {
        // Make a POST request to your backend server to create the user
        const response = await axios.post('http://localhost:3001/createUser', newUser);
  
        // Handle the response (if needed)
        console.log('User created successfully:', response.data);
        console.log(response.data)
        
      } catch (error) {
        console.error('Error creating uuser:', error);
      }
  }

  return (
    <div>
        First Name : <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <br />
        Last Name : <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
       <br />
       Email : <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
       <br />
       Password : <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
       <br />
       Age : <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
       <br />
       Role : <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
       <br />
       <button onClick={handleCreateUser} >Create</button>
    </div>
  )
}
