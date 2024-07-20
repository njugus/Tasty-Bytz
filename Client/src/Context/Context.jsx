
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { decodeJwt } from 'jose';

// const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = Cookies.get('access_token');
//     console.log(token);
//     if (token) {
//       const stringToken = String(token);
//       const userData = decodeJwt(stringToken);
//       setUser(userData);
//     }
//   }, []);

//   const setUserInformation = (token) => {
//     const stringToken = String(token);
//     const userData = decodeJwt(stringToken);
//     setUser(userData);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUserInformation }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   return useContext(UserContext);
// };

import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      try {
        const stringToken = String(token)
        console.log(stringToken);
        const decoded = decodeJwt(stringToken);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        // Handle the error (e.g., remove the invalid token from cookies)
        // Cookies.remove('access_token');
      }
    }
  }, []);

  const setUserInformation = (decoded) => {
    try {
      // const stringToken = String(token)
      // console.log(stringToken);
      // const decoded = decodeJwt(stringToken);
      setUser(decoded);
    } catch (error) {
      console.error("Invalid token", error);
      // Handle the error
    }
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
