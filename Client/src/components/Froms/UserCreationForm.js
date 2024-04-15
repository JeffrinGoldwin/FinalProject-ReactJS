import React, { useState } from 'react';
import axios from 'axios';

export const UserCreationForm = () => {
  const [firstName, setFirstName] = useState('Jeff');
  const [lastName, setLastName] = useState('Gold');
  const [email, setEmail] = useState('jeffrin.2005031@srec.ac.in');
  const [age, setAge] = useState('21');
  const [role, setRole] = useState('User'); 
  const token = sessionStorage.getItem('token');

  const handleCreateUser = async (e) => {
    e.preventDefault();    
    const newUser = {
      firstName,
      lastName,
      email,
      age,
      role
    };
    
    try {
      const response = await axios.post('http://localhost:3001/createUser', newUser, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('User created successfully:', response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  return (
    <div>
      <div className="border-b border-gray-900/10 dark:border-gray-300 pb-12 mx-20 my-20">
        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">Creating a User</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">Make sure to use correct Email ID so that the user can receive the mail</p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              First name
            </label>
            <div className="mt-2">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="first-name"
              id="first-name"
              autoComplete="given-name"
              className="block w-full rounded-md border-4 focus:outline-none focus:border-indigo-700 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-900 sm:text-sm sm:leading-6"

            />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-4 focus:outline-none focus:border-indigo-700 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border-4 focus:outline-none focus:border-indigo-700 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              Age
            </label>
            <div className="mt-2">
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                name="age"
                id="age"
                autoComplete="age"
                className="block w-full rounded-md border-4 focus:outline-none focus:border-indigo-700 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              Role
            </label>
            <div className="mt-2">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                name="role"
                id="role"
                className="block w-full rounded-md border-4 focus:outline-none focus:border-indigo-700 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-900 sm:text-sm sm:leading-6">
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-6">
            <button
              onClick={handleCreateUser}
              className="flex rounded-md mx-1 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
