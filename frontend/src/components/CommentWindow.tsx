
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from './Editor'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import ChatBox from './ChatBox'
import { APIgetCommentsByPostId } from '../API/Comment'
import { Context } from '../context/Context'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const CommentWindow = (props: any) => {

    const [comments, setComments] = useState<any>([])
    const [newCommentCount, setNewCommentCount] = useState<number>(0)
    const [newLikeCount, setNewLikeCount] = useState<number>(0)
    
    let navigate = useNavigate()

    const scrollRef = useRef<any>();

    const { user } = useContext(Context)

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [comments]);

    useEffect(() => {
        props.socket?.current?.on("getNotification", (data:any) => {
            console.log(data)
            if (props.members?.some((member: any) => member.userId == user.userId)) {
                if(data.type == 2){
                    setNewCommentCount((prev: number) => prev + 1)
                  }
                  if(data.type == 1){
                    setNewLikeCount((prev: number) => prev + 1)
                  }

            }
        });
    }, [props.socket?.current]);

    useEffect(() => {
        const getCommentsByPostId = async () => {
            const { status, data } = await APIgetCommentsByPostId(props.postThread.postId)
            if (status) {
                setComments(data)
            }
        }
        getCommentsByPostId();
    }, [props.postThread, newCommentCount, newLikeCount]);

    const handleClickCommentWindow = () => {
        props.handleClickCommentWindow(props.postThread)
    }

    return (
        <div className='w-[700px] p-0 flex flex-col relative'>
            <div className='relative'>
                <div className='font-bold text-2xl p-3 bg-neutral-500 text-white flex flex-row justify-between relative z-0'>
                    <h1>Thread</h1>
                    <svg onClick={handleClickCommentWindow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-bg-white hover:text-red-600">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                    </svg>
                </div>

            </div>
            <div className='max-h-[144px] max-w-[453px] overflow-auto relative'>
                <ChatBox post={props.postThread} socket={props.socket} members={props.members} />
            </div>
            <div className='flex flex-row'>
                <div className='flex flex-row'>
                    <div className='font-semibold px-1 text-neutral-500'>{comments.length}</div>
                    <div className='font-semibold px-1 text-neutral-500'>replies</div>
                </div>
                <div className='w-full h-[1px] bg-neutral-500 mt-3 mx-2'></div>
            </div>
            <div className='h-[260px] overflow-auto'>
                {
                    comments.map((comment: any) => {
                        return <div
                            key={comment.commentId}
                            className='w-full bg-white hover:bg-gray-100 relative'>
                            <div className='flex flex-row relative'>
                                <div>
                                    <img onClick={() => {
                                        navigate('/profile/' + comment.userId)
                                        window.location.reload()
                                    }}
                                        className='w-8 h-8 m-4 rounded-full' src={comment.avatar ? ('http://localhost:3001/images/' + comment.avatar) : 'http://localhost:3001/images/nullAvatar.png'} alt="" />
                                </div>
                                <div className='flex flex-col mt-2'>
                                    <h1 className='mx-0 text-md font-bold'>{comment.name}</h1>
                                    <div className="text-xs">{timeAgo.format(new Date(comment.createdAt))}</div>
                                </div>
                            </div>
                            <div className='ml-16 pb-4' ref={scrollRef}>
                                <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className=' relative my-4 h-[90px]'>
                <Editor socket={props.socket} type={'comment'} groupId={props.groupId} postId={props.postThread.postId} />
            </div>

        </div>
    )
}

export default CommentWindow