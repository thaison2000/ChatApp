import React, { useContext } from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { Context } from './context/Context';

function App() {

  const { user } = useContext(Context);

  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login/>}></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path='profile' element={user?<Profile/>:<Login/>}></Route>
        <Route path='/' element={user?<Home/>:<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
