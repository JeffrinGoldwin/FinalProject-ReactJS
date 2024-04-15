import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [emailID, setEmailID] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    axios
      .post("http://localhost:3001/changePassword", {
        newPassword: newPassword,
        email: emailID,
      })
      .then((response) => {
        console.log("Password changed successfully");
        navigate("/Login");
      })
      .catch((error) => {
        console.error("Error changing password:", error);
      });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");

    setEmailID(email);
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Change Password
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Type your new password
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="new-password" className="sr-only">
                New Password
              </label>
              <input
                id="new-password"
                name="new-password"
                type="password"
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-gray-800 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="New Password"
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleChangePassword}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 2.114.646 4.079 1.747 5.712l-1.37 2.776a1 1 0 001.324 1.324l2.776-1.37A9.96 9.96 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zM7 9a1 1 0 112 0v1a1 1 0 11-2 0V9zm1-6a7.953 7.953 0 00-4.672 1.535l1.344 2.63A5.994 5.994 0 016 5.846V4h1zm3 0h1v1a5.994 5.994 0 012.328 1.315l1.344-2.63A7.953 7.953 0 0010 3V2zm3 7a1 1 0 11-2 0v-1a1 1 0 112 0v1z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
