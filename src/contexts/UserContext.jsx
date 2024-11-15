// import {  createContext, useState } from "react";

// const UserContext = createContext({});

// export const UserDataProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// export default UserContext;
import React, { createContext, useState, useEffect } from 'react';

// Create a Context for user data and token management
const UserContext = createContext({});

// Create a Provider component
export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load token from local storage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
      // Optionally, fetch user data if needed
    }
  }, []);

  // Function to save token to local storage and state
  const saveToken = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  // Function to remove token from local storage and state
  const removeToken = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null); // Optionally clear user data
  };

  // Optionally, create a function to fetch user data based on the token
  const fetchUserData = async () => {
    if (token) {
      try {
        const response = await fetch('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on token change
  }, [token]);

  return (
    <UserContext.Provider value={{ user, token, saveToken, removeToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
