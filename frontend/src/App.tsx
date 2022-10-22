import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './components/Profile';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login/>}></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path='profile' element={<Profile/>}></Route>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
