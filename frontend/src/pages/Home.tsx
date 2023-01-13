import React, { useState } from 'react'
import ChatWindow from '../components/ChatWindow'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'

const Home = (props: any) => {

    const [menu, setMenu] = useState<boolean>(false)

    const handleClickMenu = () => {
        setMenu(!menu)
      }

    return (
        <div className='w-screen h-screen pointer-events-auto'>
        <TopBar socket={props.socket} />
        <div className='flex flex-col divide-y h-[calc(100%-50px)]'>
          <div onClick={handleClickMenu} className='w-full sm:w-[250px] flex flex-row bg-sky-700 hover:bg-sky-800'>
            <div className='p-4 h-[50px]'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white hover:text-orange-300">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </div>
            <div className='py-4 text-xl text-white font-bold'>Menu</div>
          </div>
          {menu ? <SideBar socket={props.socket} /> : null }
        </div>
    </div>
    )
}

export default Home