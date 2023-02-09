import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIgetUserProfile } from '../API/User';
import TimeAgo from 'javascript-time-ago'
import { Context } from '../context/Context';

// English.
import en from 'javascript-time-ago/locale/en'
import { APIgetCommentsByPostId } from '../API/Comment';
import { APIcreatePostLike, APIdeleteLike, APIgetLikesByPostId } from '../API/Like';
import { APIactiveImportantPost, APIdeletePost, APIinactiveImportantPost, APIupdatePost } from '../API/Post';
import Editor from './Editor';
import { APIcreateNotification } from '../API/Notification';

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const ChatBox = (props: any) => {

  const [user, setUser] = useState<any>()
  const [interactiveAlert, setInteractiveAlert] = useState<Boolean>(false)
  const [comments, setComments] = useState<any>([])
  const [newCommentCount, setNewCommentCount] = useState<number>(0)
  const [likes, setLikes] = useState<any>([])
  const [newLikeCount, setNewLikeCount] = useState<number>(0)
  const [currentUserLike, setCurrentUserLike] = useState<boolean>(false)
  const [editPost, setEditPost] = useState<boolean>(false)

  const { user: currentUser } = useContext(Context)


  const navigate = useNavigate()

  useEffect(() => {
    props.socket?.current?.on("getNotification", (data: any) => {
      if (props.members?.some((member: any) => member?.userId == currentUser?.userId)) {
        if (data.type == 2) {
          setNewCommentCount((prev: number) => prev + 1)
        }
        if (data.type == 1) {
          setNewLikeCount((prev: number) => prev + 1)
        }
        if (data.type == 13) {
          setNewLikeCount((prev: number) => prev - 1)
        }

      }
    });
  }, [props.socket?.current]);

  useEffect(() => {
    if (likes.some((like: any) => like.userId == currentUser.userId)) {
      setCurrentUserLike(true)
    }
    else {
      setCurrentUserLike(false)
    }
  }, [props.post, likes]);

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
    const getLikesByPostId = async () => {
      const { status, data } = await APIgetLikesByPostId(props.post.postId)
      if (status) {
        setLikes(data)
      }
    }
    getLikesByPostId();
  }, [props.post, props.socket?.current, newLikeCount]);

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

  const handleClickLike = async () => {
    const { status } = await APIcreatePostLike({
      postId: props.post.postId,
      userId: currentUser.userId,
      groupId: props.post.groupId
    })
    const { status: status1 } = await APIcreateNotification({
      sendUserName: user.name,
      sendUserId: user.userId,
      groupId: props.groupId,
      postId: props.post.postId,
      type: 1
    })
    if (status) {
      props.socket?.current?.emit("sendNotification", {
        sendUserName: user.name,
        sendUserId: user.userId,
        groupId: props.groupId,
        postId: props.post.postId,
        type: 1
      });
    }
  }

  const handleClickActiveImportantPost = async () => {
    const { status } = await APIactiveImportantPost(props.post.postId)
    if (status) {
      props.socket?.current?.emit("sendNotification", {
        sendUserName: user.name,
        sendUserId: user.userId,
        groupId: props.groupId,
        type: 17
      });
    }
  }

  const handleClickInActiveImportantPost = async () => {
    const { status } = await APIinactiveImportantPost(props.post.postId)
    if (status) {
      props.socket?.current?.emit("sendNotification", {
        sendUserName: user.name,
        sendUserId: user.userId,
        groupId: props.groupId,
        type: 18
      });
    }
  }

  const handleClickDeletePost = async () => {
    props.handleClickDeletePost(props.post?.postId)
  }

  const handleClickEditPost = async () => {
    setEditPost(!editPost)
  }

  const handleClickUnLike = async () => {
    const likeArray = likes.filter((like: any) => like.userId == currentUser.userId)
    if (likeArray) {
      const { status } = await APIdeleteLike(likeArray[0]?.likeId)
      if (status) {
        props.socket?.current?.emit("sendNotification", {
          sendUserName: user.name,
          sendUserId: user.userId,
          groupId: props.groupId,
          type: 13
        });
      }
    }
  }

  const handleClickSavePost = async (content: string, files: any) => {
    props.handleClickUpdatePost(props.post?.postId, content, files)
    setEditPost(!editPost)
  }

  const InteractiveAlert = () => {
    return (
      <div className='absolute right-1 top-1 z-100 p-1 bg-white rounded-2xl shadow-2xl'>
       
        <div className=''>
        <div className='flex flex-row '>
          <div>
            {
              props.post.userId == currentUser.userId ?
                (props.post.type == 1 ?
                  <div onClick={handleClickInActiveImportantPost} className='mx-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
                      <path fillRule="evenodd" d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z" clipRule="evenodd" />
                    </svg>
                  </div> :
                  <div onClick={handleClickActiveImportantPost} className='mx-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M3 2.25a.75.75 0 01.75.75v.54l1.838-.46a9.75 9.75 0 016.725.738l.108.054a8.25 8.25 0 005.58.652l3.109-.732a.75.75 0 01.917.81 47.784 47.784 0 00.005 10.337.75.75 0 01-.574.812l-3.114.733a9.75 9.75 0 01-6.594-.77l-.108-.054a8.25 8.25 0 00-5.69-.625l-2.202.55V21a.75.75 0 01-1.5 0V3A.75.75 0 013 2.25z" clipRule="evenodd" />
                    </svg>
                  </div>) : null
            }
          </div>
          <div>
            {
              currentUserLike ?
                <div onClick={handleClickUnLike} className='mx-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
                    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                  </svg>
                </div> :
                <div onClick={handleClickLike} className='mx-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                    <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                  </svg>
                </div>
            }
          </div>
          <div>
            {
              props.post.userId == currentUser.userId ?
                <div onClick={handleClickEditPost} className='mx-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:text-yellow-500">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </div> : null
            }
          </div>
          <div>
            {
              props.post.userId == currentUser.userId ?
                <div onClick={handleClickDeletePost} className='mx-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:text-red-500">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                  </svg>
                </div> : null
            }
          </div>
        </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {editPost ?
        <div className='border-2 w-[97%] m-4 relative bg-white z-100'>
          <div onClick={handleClickEditPost} className='absolute top-2 right-2'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-500">
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>

          </div>
          <div className='flex flex-row'>
            <div>
              <img onClick={() => {
                navigate('/profile/' + user.userId, { replace: true })
                window.location.reload()
              }}
                className='w-8 h-8 m-4 rounded-full' src={user?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + user?.avatar) : `${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png'} alt="" />
            </div>
            <div className='flex flex-col mt-2'>
              <h1 className='mx-0 text-md font-bold'>{user?.name}</h1>
              <div className="text-xs">{timeAgo.format(new Date(props.post.createdAt))}</div>
            </div>
          </div>
          <div className='relative p-4 z-1 h-[420px]'>
            <Editor type={'updatePost'} content={props.post.content} handleClickSavePost={handleClickSavePost} />
            <div className='flex flex-row ml-2 absolute bottom-10'>
              {
                props.post.fileNames ? props.post.fileNames?.map((fileName: any) => {

                  return (
                    <div className='m-4' >
                      <div className='bg-neutral-200 text-center hover:bg-neutral-400 hover:text-white'>
                        <a href={`${process.env.REACT_APP_SERVER2_URL}` + '/docs/' + fileName} className='w-20 h-8'>{fileName.split('.')[1]}</a>
                      </div>
                      <object className='w-24 h-16' data={`${process.env.REACT_APP_SERVER2_URL}` + '/docs/' + fileName}></object>
                    </div>
                  )
                }) : null
              }
            </div>
          </div>
        </div> :
        <div
          onMouseEnter={() => setInteractiveAlert(true)}
          onMouseLeave={() => setInteractiveAlert(false)}
          className={props.post.type == 1 ? 'w-full bg-red-100 hover:bg-red-200 relative' : 'w-full bg-white hover:bg-gray-100 relative'}>
          <div className='flex flex-row relative'>
            {interactiveAlert ? <InteractiveAlert /> : null}
            <div>
              <img onClick={() => {
                navigate('/profile/' + user.userId, { replace: true })
                window.location.reload()
              }}
                className='w-8 h-8 mx-4 mt-4 rounded-full' src={user?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + user?.avatar) : `${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png'} alt="" />
            </div>
            <div className='flex flex-col'>
              <h1 className='mx-0 mt-2 text-md font-bold'>{user?.name}</h1>
              <div className='flex flex-row'>
                <div className="text-xs">{timeAgo.format(new Date(props.post.createdAt))}</div>
                {props.post.type == 1 ?
                  (
                    <div className='ml-2'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500 ">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                      </svg>

                    </div>
                  ) : null}
              </div>
            </div>
          </div>
          <div className='ml-16 pb-1'>
            <div dangerouslySetInnerHTML={{ __html: props.post.content }}></div>
          </div>
          <div className='flex flex-row ml-12'>
            {
              props.post.fileNames ? props.post.fileNames.map((fileName: any) => {
                return (
                  <div className='m-4' >
                    <div className='bg-neutral-200 text-center hover:bg-neutral-400 hover:text-white'>
                      <a href={`${process.env.REACT_APP_SERVER2_URL}` + '/docs/' + fileName} className='w-20 h-8'>{fileName.split('.')[1]}</a>
                    </div>
                    <object className='w-24 h-16' data={`${process.env.REACT_APP_SERVER2_URL}` + '/docs/' + fileName}></object>
                  </div>
                )
              }) : null
            }
          </div>
          <div className='ml-16 pb-1 flex flex-row justify-between'>
            <div className='flex flex-row'>
            <div onClick={handleClickLike} className='mr-4 font-bold pointer-events-auto text-sm'>{likes.length} likes</div>
            <div onClick={handleClickCommentWindow} className='text-sky-900 text-sm font-bold hover:underline pointer-events-auto'>{comments.length} replies</div>
            </div>
            <div className='mx-4 text-gray-500 font-bold text-sm m-2'>ID :{props.post.postId}</div>
          </div>

        </div>}
    </div>

  )
}

export default ChatBox