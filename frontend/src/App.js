import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from "./Components/MainPage/MainPage";
import Register from './Components/Register/Register.jsx';
import Profile from "./Components/Profile/Profile"
import LandingPage from "./Components/LandingPage/LandingPage";
import Tasks from "./Components/Tasks/Tasks";
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/Login/Login.jsx';
import EditProfile from './Components/Profile/EditProfile'
import jwt_decode from "jwt-decode";
import ProtectedRoute from './Components/Auth/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogin = (token) => {
    localStorage.setItem("jwtToken", token);
    setUser(jwt_decode(token));
    navigate('/main', { replace: true });
  };
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
    navigate('/', { replace: true });
  };

  return (
    <>
      {user && <NavBar handleLogout={handleLogout} user={user}/>}
      <Routes>

        <Route element={<ProtectedRoute user={user}/>}>
          <Route path='/main' element = {<MainPage/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit/:id" element={<EditProfile />} />
          <Route path='/tasks' element={<Tasks />}/>
        </Route>     
        
      {!user && (<><Route path='/login' element={<Login onLogin={handleLogin}/>} />
        <Route index element ={<LandingPage />} />
        <Route path='/registration' element={<Register />} /></>)}
      </Routes>
    </>
  );
}

export default App;
