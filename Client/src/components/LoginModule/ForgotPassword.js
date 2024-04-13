import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/forgotPassword', { email: loginEmail });
      navigate(`/Confirmation?email=${loginEmail}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 my-2 dark:text-gray-50">Forgot Password</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSendEmail}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <!-- Heroicon name: solid/lock-closed --> */}
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 2.114.646 4.079 1.747 5.712l-1.37 2.776a1 1 0 001.324 1.324l2.776-1.37A9.96 9.96 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zM7 9a1 1 0 112 0v1a1 1 0 11-2 0V9zm1-6a7.953 7.953 0 00-4.672 1.535l1.344 2.63A5.994 5.994 0 016 5.846V4h1zm3 0h1v1a5.994 5.994 0 012.328 1.315l1.344-2.63A7.953 7.953 0 0010 3V2zm3 7a1 1 0 11-2 0v-1a1 1 0 112 0v1z" clipRule="evenodd" />
                </svg>
              </span>
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
