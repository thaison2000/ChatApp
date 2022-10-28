import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ChatBox = (props:any) => {

  const [user,setUser] = useState<any>()

  useEffect(() => {
    const fetchUserByUserId = async () => {
        try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
              },
            }
            const res = await axios.get("http://localhost:3001/api/user/"+ props.post.user_id,config);
            setUser(res.data)
      
          }
          catch (err) {
            console.log(err)
          }
        };
        fetchUserByUserId();
    }, []);
  
  return (
    <div className='w-full min-h-[100px] bg-white hover:bg-slate-100'>
      <div className='flex flex-row'>
        <div>
          <img className='w-8 h-8 m-4' src={'http://localhost:3001/images/' + user?.avatar} alt="" />
        </div>
        <div>
          <h1 className='my-4 mx-0 text-xl font-bold'>{user?.name}</h1>
        </div>
      </div>
      <div className='ml-4'>
       <div dangerouslySetInnerHTML={{__html: props.post.content}}></div>
      </div>
    </div>
  )
}

export default ChatBox