import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIgetUserProfile } from '../API/User';
import TimeAgo from 'javascript-time-ago'
import { Context } from '../context/Context';

// English.
import en from 'javascript-time-ago/locale/en'
import { APIgetCommentsByPostId } from '../API/Comment';

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const ChatBox = (props: any) => {

  const [user, setUser] = useState<any>()
  const [interactiveAlert, setInteractiveAlert] = useState<Boolean>(false)
  const [comments, setComments] = useState<any>([])
  const [newCommentCount, setNewCommentCount] = useState<number>(0)

  const { user: currentUser } = useContext(Context)
  

  const navigate = useNavigate()

  useEffect(() => {
    props.socket?.current?.on("getNotification", () => {
      if (props.members?.some((member: any) => member?.userId == currentUser?.userId)) {

        setNewCommentCount((prev: number) => prev + 1)
      }
    });
  }, [props.socket?.current]);

  useEffect(() => {
    const getCommentsByPostId = async () => {
      const { status, data } = await APIgetCommentsByPostId(props.post.postId)
      if (status) {
        setComments(data)
      }
    }
    getCommentsByPostId();
  }, [props.post, props.socket?.current, newCommentCount]);

  useEffect(() => {
    const fetchUserByUserId = async () => {
      const { status, data } = await APIgetUserProfile(props.post.userId)
      if (status) {
        setUser(data)
      }
    }
    fetchUserByUserId();
  }, [props.post.userId]);

  const handleClickCommentWindow = () => {
    props.handleClickCommentWindow(props.post)
  }

  const InteractiveAlert = () => {
    return (
      <div className='absolute right-4 top-[-20px] bg-white p-2 rounded-2xl shadow-2xl'>
        <div className='flex flex-row'>
          <div className='mx-2 my-1'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500 mt-1">
              <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
            </svg>
          </div>
          <div className='mx-2 my-1'>
            <svg onClick={handleClickCommentWindow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-orange-500 mt-1">
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      onMouseEnter={() => setInteractiveAlert(true)}
      onMouseLeave={() => setInteractiveAlert(false)}
      className='w-full bg-white hover:bg-gray-100 relative'>
      <div className='flex flex-row relative'>
        {interactiveAlert ? <InteractiveAlert /> : null}
        <div>
          <img onClick={() => {
            navigate('/profile/' + user.userId, { replace: true })
            window.location.reload()
          }}
            className='w-8 h-8 m-4 rounded-full' src={user?.avatar ? ('http://localhost:3001/images/' + user?.avatar) : 'http://localhost:3001/images/nullAvatar.png'} alt="" />
        </div>
        <div className='flex flex-col mt-2'>
          <h1 className='mx-0 text-md font-bold'>{user?.name}</h1>
          <div className="text-xs">{timeAgo.format(new Date(props.post.createdAt))}</div>
        </div>
      </div>
      <div className='ml-16 pb-4'>
        <div dangerouslySetInnerHTML={{ __html: props.post.content }}></div>
      </div>
      <div className='ml-16 pb-4 flex flex-row'>
        <div className='mr-4 text-base font-bold'>0 likes</div>
        <div onClick={handleClickCommentWindow} className='text-sky-900 text-base font-bold hover:underline'>{comments.length} replies</div>
      </div>
    </div>
  )
}

export default ChatBox