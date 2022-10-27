import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'

const Group = () => {

    const group_id = useParams().group_id

    return (
        <div className='w-screen h-screen pointer-events-auto'>
        <TopBar/>
        <div className='w-full h-[calc(100%-50px)] flex flex-row'>
            <SideBar/>
            <ChatWindow group_id={group_id}/>
        </div>
    </div>
    )
}

export default Group