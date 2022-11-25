
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from './Editor'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import { APIgetCommentsByPostId } from '../API/Comment'
import { APIgetUserProfile } from '../API/User'
import ChatBox from './ChatBox'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const CommentWindow = (props: any) => {

    const [commentUsers, setCommentUsers] = useState<Array<any>>([])
    const [comments, setComments] = useState<Array<any>>([])
    const [commentCount, setCommentCount] = useState<number>(0)
    let navigate = useNavigate()

    useEffect(() => {
        const getCommentsByPostId = async () => {
            const { status, data } = await APIgetCommentsByPostId(props.postThread.postId)
            if (status) {
                setComments(data)
                setCommentCount(data.length)
            }
        }
        getCommentsByPostId();
    }, [props.postThread, commentCount]);

    useEffect(() => {
        for(let i=0;i<comments.length;i++){
            const fetchUserByUserId = async () => {
                const { status, data } = await APIgetUserProfile(props.postThread.userId)
                if (status) {
                    let value: any = commentUsers
                    value.push(data)
                  setCommentUsers(value)
                }
              }
            fetchUserByUserId();
        }
    }, [props.postThread, commentCount, comments]);

    const handleUpdateNewCommentCount = () => {
        setCommentCount((prev: any) => prev + 1)
    }

    const handleClickCommentWindow = () => {
        props.handleClickCommentWindow(props.postThread)
      }

    return (
        <div className='w-[700px] p-0 flex flex-col'>
            <div>
                <div className='font-bold text-2xl p-3 bg-neutral-500 text-white flex flex-row justify-between'>
                    <h1>Thread</h1>
                    <svg onClick={handleClickCommentWindow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-bg-white hover:text-red-600">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                    </svg>
                </div>

            </div>
            <div>
                <ChatBox post={props.postThread} handleClickCommentWindow={() => { }} />
            </div>
            <div className='flex flex-row'>
                <div className='flex flex-row'>
                    <div className='font-semibold px-1 text-neutral-500'>{commentCount}</div>
                    <div className='font-semibold px-1 text-neutral-500'>replies</div>
                </div>
                <div className='w-full h-[1px] bg-neutral-500 mt-3 mx-2'></div>
            </div>
            <div className='h-[250px] overflow-auto'>
                {
                    comments?.map((comment: any) => {
                        let user = commentUsers.filter((commentUser:any)=>{
                            return commentUser.userId === comment.userId
                        })
                        return <div
                            className='w-full bg-white hover:bg-gray-100 relative'>
                            <div className='flex flex-row relative'>
                                <div>
                                    <img onClick={() => {
                                        navigate('/profile/' + comment.userId, { replace: true })
                                        window.location.reload()
                                    }}
                                        className='w-8 h-8 m-4 rounded-full' src={user[0]?.avatar ? ('http://localhost:3001/images/' + user[0]?.avatar) : 'http://localhost:3001/images/nullAvatar.png'} alt="" />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <h1 className='mx-0 text-md font-bold'>{user[0]?.name}</h1>
                                    <div className="text-xs">{timeAgo.format(new Date(comment.createdAt))}</div>
                                </div>
                            </div>
                            <div className='ml-16 pb-4'>
                                <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className=' relative my-4 h-[90px]'>
                <Editor type={'comment'} groupId={props.groupId} postId={props.postThread.postId} handleUpdateNewCommentCount={handleUpdateNewCommentCount} />
            </div>

        </div>
    )
}

export default CommentWindow