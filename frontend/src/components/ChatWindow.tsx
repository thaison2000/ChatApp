import React, { useState } from 'react'
import ChatBox from './ChatBox'
import TextEditor from './TextEditor'

const ChatWindow = () => {
  
  return (
    <div className='w-[calc(100%-250px)]'>
        <div className='h-full'>
            <div className='h-[520px] flex flex-col overflow-auto divide-y relative z-0'>
              <ChatBox/>
              <ChatBox/>
              <ChatBox/>
              <ChatBox/>
              <ChatBox/>
              <ChatBox/>
              <ChatBox/>
            </div>
            <div className='h-[80px] w-[1290px] hover:h-[200px] fixed bottom-16 z-10 bg-white'>
            <TextEditor/>
            </div>
        </div>
    </div>
  )
}

export default ChatWindow