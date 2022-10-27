import React, { useState } from 'react'
import ChatBox from './ChatBox'
import Editor from './Editor'

const ChatWindow = (props:any) => {
  
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
            <div className=''>
            <Editor/>
            </div>
        </div>
    </div>
  )
}

export default ChatWindow