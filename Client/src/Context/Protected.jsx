// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useUser} from './Context.jsx'

//  const ProtectedRoute = ({ element }) => {
//   const { user } = useUser();

//   if (!user) {
//     // If there is no user, redirect to the login page
//     return <Navigate to="/login" />;
//   }

//   // If user is authenticated, render the element
//   return element;
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './Context';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    // If there is no user, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the children
  return children;
};

export default ProtectedRoute;
