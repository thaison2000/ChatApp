import React, { useContext, useEffect, useRef } from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { Context } from './context/Context';
import { io } from "socket.io-client";
import Group from './pages/Group';
import DirectMessage from './pages/DirectMessage';
import Draft from './pages/Draft';
import Thread from './pages/Thread';


function App() {

  const { user } = useContext(Context);
  const socket = useRef<any>()

  useEffect(() => {
    socket.current = io("https://chatapp-server3.onrender.com");
    socket.current.emit("addUser", user?.userId);
  }, [socket.current]);

  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login/>}></Route>
        <Route path='register' element={<Register/>}></Route>
        <Route path='profile/:userId' element={user?<Profile socket={socket}/>:<Login/>}></Route>
        <Route path='group/:groupId' element={user?<Group socket={socket}/>:<Login/>}></Route>
        <Route path='directMessage/:groupId' element={user?<DirectMessage socket={socket}/>:<Login/>}></Route>
        <Route path='/' element={user?<Home socket={socket}/>:<Login/>}></Route>
        <Route path='draft' element={user?<Draft socket={socket}/>:<Login/>}></Route>
        <Route path='thread' element={user?<Thread socket={socket}/>:<Login/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
