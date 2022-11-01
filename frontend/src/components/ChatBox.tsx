import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const ChatBox = (props: any) => {

  const [user, setUser] = useState<any>()
  const [commentWindow, setCommentWindw] = useState<Boolean>(false)
  const comment = useRef<any>()

  console.log('gg')
  useEffect(() => {
    const fetchUserByUserId = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
          },
        }
        const res = await axios.get("http://localhost:3001/api/user/" + props.post.user_id, config);
        setUser(res.data)

      }
      catch (err) {
        console.log(err)
      }
    };
    fetchUserByUserId();
  }, []);

  const handleClickCommentWindow = () => {
    setCommentWindw(!commentWindow)
  }

  const handleClickSubmitComment = async () =>{
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
        },
      }
      // await axios.post("http://localhost:3001/api/comment/", {
      //   name: name.current?.value,
      //   dateOfBirth: dateOfBirth.current?.value,
      //   phone: phone.current?.value,
      //   address: address.current?.value,
      //   gender: gender.current?.value
      // },
      //   config);
      // dispatch({
      //   type: 'UPDATE_PROFILE', payload: {
      //     name: name.current?.value,
      //     dateOfBirth: dateOfBirth.current?.value,
      //     phone: phone.current?.value,
      //     address: address.current?.value,
      //     gender: gender.current?.value
      //   }
      // })
      // setClickProfileEdit(!clickProfileEdit)

    }
    catch (err) {
      console.log(err)
    }
  }

  const CommentWindow = () => {
    return (
      <div className='bg-gray-300 h-64 p-4'>
        <div className='relative flex flex-row'>
          <input type="text" className='my-2 py-2 w-[75%] rounded-lg px-4' ref={comment} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:text-green-500 mt-4 ml-2">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full bg-white hover:bg-slate-100 relative'>
      <div className='flex flex-row'>
        <div>
          <img className='w-8 h-8 m-4' src={'http://localhost:3001/images/' + user?.avatar} alt="" />
        </div>
        <div>
          <h1 className='my-4 mx-0 text-xl font-bold'>{user?.name}</h1>
        </div>
      </div>
      <div className='ml-4'>
        <div dangerouslySetInnerHTML={{ __html: props.post.content }}></div>
      </div>
      <div className='flex flex-row justify-end'>
        <div className='mr-2 my-2 flex flex-row'>
          <div className='text-lg font-medium mr-2 text-gray-500'>5</div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500 hover:text-blue-500">
            <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
          </svg>

        </div>
        <div className='ml-8 mr-4 my-2 flex flex-row'>
          <div className='text-lg font-medium mr-2 text-gray-500'>5</div>
          <svg onClick={handleClickCommentWindow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500 hover:text-orange-500">
            <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z" clipRule="evenodd" />
          </svg>

        </div>
      </div>
      {commentWindow ? <CommentWindow /> : null}
    </div>
  )
}

export default ChatBox