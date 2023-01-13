import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChatWindow from '../components/ChatWindow'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'

const Group = (props: any) => {

  const groupId = useParams().groupId
  const [menu, setMenu] = useState<boolean>(false)

  const handleClickMenu = () => {
    setMenu(!menu)
  }

  return (
    <div className='w-screen h-screen pointer-events-auto'>
      <TopBar socket={props.socket} />
      <div className='w-full h-[calc(100%-50px)] flex flex-col sm:flex sm:flex-row'>
        <div onClick={handleClickMenu} className='w-full sm:w-0 sm:h-0 flex flex-row bg-sky-700 hover:bg-sky-800'>
          <div className='p-4'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white hover:text-orange-300">
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </div>
          <div className='py-4 text-xl text-white font-bold'>Menu</div>
        </div>
        <div className='w-0 h-0 sm:w-[250px] sm:h-full'>
          <SideBar socket={props.socket} />
        </div>
        {menu ?
          <div className='sm:w-0 sm:h-0'>
            <SideBar socket={props.socket} />
          </div>
          : 
            <ChatWindow groupId={groupId} socket={props.socket} />}
    </div>
    </div>
  )
}

export default Group