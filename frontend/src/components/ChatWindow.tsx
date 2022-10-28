import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ChatBox from './ChatBox'
import Editor from './Editor'

const ChatWindow = (props:any) => {

  const [posts,setPosts] = useState([])

  useEffect(() => {
    const fetchAllPosts = async () => {
        try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
              },
            }
            const res = await axios.get("http://localhost:3002/api/post/group/"+ props.group_id,config);
            setPosts(res.data)
      
          }
          catch (err) {
            console.log(err)
          }
        };
        fetchAllPosts();
    }, [posts]);
  
  return (
    <div className='w-[calc(100%-250px)]'>
        <div className='h-full'>
            <div className='h-[520px] flex flex-col overflow-auto divide-y relative z-0'>
             {posts?.map((post:any)=>{
              return (
                <ChatBox post={post}/>
              )
             })}
            </div>
            <div className=''>
            <Editor group_id={props.group_id}/>
            </div>
        </div>
    </div>
  )
}

export default ChatWindow