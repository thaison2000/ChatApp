import React, { useState } from 'react'
import ChatWindow from '../components/ChatWindow'
import Profile from '../components/Profile'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'

const Home = () => {

    const [clickProfile,setClickProfile] = useState(false)
    const [clickChatWindow,setClickChatWindow] = useState(false)

    const handleClickProfile = () =>{
        setClickProfile(!clickProfile)
        setClickChatWindow(false)
    }
    return (
        <div className='w-screen h-screen pointer-events-auto'>
        <TopBar/>
        <div className='w-full h-[calc(100%-50px)] flex flex-row'>
            <SideBar handleClickProfile={handleClickProfile}/>
            {clickProfile? <Profile/>: null}
            {clickChatWindow? <ChatWindow/>: null}
        </div>
    </div>
    )
}

export default Home