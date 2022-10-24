import React, { useState } from 'react'
import ChatWindow from '../components/ChatWindow'
import Profile from './Profile'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'

const Home = () => {

    return (
        <div className='w-screen h-screen pointer-events-auto'>
        <TopBar/>
        <div className='w-full h-[calc(100%-50px)] flex flex-row'>
            <SideBar/>
        </div>
    </div>
    )
}

export default Home