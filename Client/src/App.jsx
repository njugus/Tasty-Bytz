import SignUp from './Pages/Sign/Sign';
import Login from './Pages/Login/Login';
import Timeline from './Pages/Timeline/Timeline';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './Context/Context';
function App() {
  return (
    <>
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
    </UserProvider >
    <Timeline />
    
    </>
    
    
  );
}

export default App;
