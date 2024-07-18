// src/context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode} from 'jwt-decode'

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      const userData = jwtDecode(token);
      setUser(userData);
    }
  }, []);

  const setUserInformation = (token) => {
    const userData = jwtDecode(token);
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUserInformation }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
