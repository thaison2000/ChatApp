import React, { useState } from 'react'
import ChatWindow from '../components/ChatWindow'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'

const Home = (props: any) => {

    return (
        <div className='w-screen h-screen pointer-events-auto'>
        <TopBar socket={props.socket} />
        <div className='w-full h-[calc(100%-50px)] flex flex-row'>
            <SideBar socket={props.socket}/>
        </div>
    </div>
    )
}

export default Home