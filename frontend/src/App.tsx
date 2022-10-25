import React, { useContext, useEffect, useRef } from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { Context } from './context/Context';
import { io } from "socket.io-client";

function App() {

  const { user } = useContext(Context);
  const socket = useRef<any>()

  useEffect(() => {
    socket.current = io("http://localhost:3004");
    socket.current.emit("addUser", user?.user_id);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login/>}></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path='profile/:user_id' element={user?<Profile socket={socket}/>:<Login/>}></Route>
        <Route path='/' element={user?<Home socket={socket}/>:<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
