import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'

const Group = (props: any) => {

    const groupId = useParams().groupId

    return (
        <div className='w-screen h-screen pointer-events-auto'>
        <TopBar socket={props.socket} />
        <div className='w-full h-[calc(100%-50px)] flex flex-row'>
            <SideBar socket={props.socket}/>
            <ChatWindow groupId={groupId} socket={props.socket}/>
        </div>
    </div>
    )
}

export default Group