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

import Admin from '../Components/UpdateForm/Admin/Admin';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './Context';

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    // If there is no user, redirect to the login page
    return <Navigate to="/login" />;
  }
  console.log(user)
  if (user.data.role === "admin"){
    return <Admin />;
  }
  return children;
};

export default ProtectedRoute;
