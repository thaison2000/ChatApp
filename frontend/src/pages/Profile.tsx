import React from 'react'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'

const Profile = () => {
  return (
    <div className='w-screen h-screen'>
        <TopBar/>
        <div className='w-full flex flex-row'>
            <SideBar/>

        </div>
    </div>
  )
}

export default Profile