
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
import ProfileCard from './Pages/Profile/Profile';
import View from './Pages/View/View';
import Logout from './Pages/Logout/Logout'
import UpdateForm from './Components/UpdateForm/Update';
import Admin from './Components/UpdateForm/Admin/Admin';

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
                    <Route path="/postrecipees" element={<Post />} />
                    <Route path="/profile" element={<ProfileCard />} />
                    <Route path="/view-recipees" element = {<View />} />
                    <Route path="/update/:id" element = {<UpdateForm />} />
                    <Route path = "/admin" element={<Admin />} />
                    
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
