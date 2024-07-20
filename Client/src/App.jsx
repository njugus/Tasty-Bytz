


// import SignUp from './Pages/Sign/Sign';
// import Login from './Pages/Login/Login';
// import Timeline from './Pages/Timeline/Timeline';
// import Header from './Header';
// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { UserProvider } from './Context/Context';
// import ProtectedRoute from './Context/Protected';
// // Import the ProtectedRoute component

// function App() {
//   return (
//     <UserProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route
//             path="*"
//             element={
//               <ProtectedRoute>
//                 <Header />
//                 <Routes>
//                   <Route path="timeline" element={<Timeline />} />
//                   {/* Add more protected routes here */}
//                 </Routes>
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </UserProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/Context';
import ProtectedRoute from './Context/Protected';
import Post from './Pages/Post/postRecipe';
import SignUp from './Pages/Sign/Sign';
import Login from './Pages/Login/Login';
import Timeline from './Pages/Timeline/Timeline';
import Header from './Header';
import './App.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <>
                  <Header />
                  <Routes>
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/post-recipees" element={<Post />} />
                    {/* Add more protected routes here */}
                  </Routes>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
