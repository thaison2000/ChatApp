import React from 'react'

const ChatBox = () => {
  return (
    <div className='w-full min-h-[100px] bg-white hover:bg-slate-100'>
      <div className='flex flex-row'>
        <div>
          <img className='w-8 h-8 m-4' src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
        </div>
        <div>
          <h1 className='my-4 mx-0 text-xl font-bold'>Thai Son</h1>
        </div>
      </div>
      <div className='ml-4'>
        Xin chao moi nguoi
        aaaaaa
      </div>
    </div>
  )
}

export default ChatBox