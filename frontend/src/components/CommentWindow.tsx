
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from './Editor'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import ChatBox from './ChatBox'
import { APIdeleteCommentsByCommentId, APIgetCommentsByPostId } from '../API/Comment'
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
        props.socket?.current?.on("getNotification", (data: any) => {
            if (data.type == 2) {
                setNewCommentCount((prev: number) => prev + 1)
            }
            if (data.type == 1) {
                setNewLikeCount((prev: number) => prev + 1)
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

    const handleClickDeleteComment = async (commentId: string) => {
        if (window.confirm('Are you sure you want to delete this comment ?')) {
            const { status } = await APIdeleteCommentsByCommentId(commentId)
            if (status) {

                setNewCommentCount((prev: number) => prev + 1)
            }
        }
    }

    return (
        <div className='w-full h-full p-0 flex flex-col relative z-10'>
            <div className='relative'>
                <div className='font-bold text-2xl p-3 bg-neutral-500 text-white flex flex-row justify-between relative z-0'>
                    <h1>Thread</h1>
                    <svg onClick={handleClickCommentWindow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-bg-white hover:text-red-600">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                    </svg>
                </div>

            </div>
            <div className='max-h-[144px] h-[144px] w-full overflow-auto relative'>
                <ChatBox post={props.postThread} socket={props.socket} members={props.members} />
            </div>
            <div className='flex flex-row'>
                <div className='flex flex-row'>
                    <div className='font-semibold px-1 text-neutral-500'>{comments.length}</div>
                    <div className='font-semibold px-1 text-neutral-500'>replies</div>
                </div>
                <div className='w-full h-[1px] bg-neutral-500 mt-3 mx-2'></div>
            </div>
            <div className='h-[calc(100%-240px)] sm:h-[calc(100%-255px)] flex flex-col justify-between'>
                <div className='overflow-auto divide-y border-b-2'>
                    {
                        comments.map((comment: any) => {
                            return <div
                                key={comment.commentId}
                                className='w-full bg-white hover:bg-gray-100 relative'>

                                <div className='flex flex-row relative justify-between w-full'>
                                    <div className='flex flex-row'>
                                        <div>
                                            <img onClick={() => {
                                                navigate('/profile/' + comment.userId)
                                                window.location.reload()
                                            }}
                                                className='w-8 h-8 m-4 rounded-full' src={comment.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + comment.avatar) : `${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png'} alt="" />
                                        </div>
                                        <div className='flex flex-col mt-2'>
                                            <h1 className='mx-0 text-md font-bold'>{comment.name}</h1>
                                            <div className="text-xs">{timeAgo.format(new Date(comment.createdAt))}</div>
                                        </div>
                                    </div>
                                    {
                                        comment.userId == user.userId? <button onClick={() => handleClickDeleteComment(comment.commentId)} className=" text-white py-2 px-3 mx-2 my-3 font-medium text-xl bg-red-500 hover:bg-red-900 hover:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                        </svg>

                                    </button>: null
                                    }
                                </div>
                                <div className='ml-16 pb-4 w-fit' ref={scrollRef}>
                                    <div className='' dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                                </div>
                                <div className='flex flex-row ml-12'>
                                    {
                                        comment.fileNames ? comment.fileNames.map((fileName: any) => {
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
                        })
                    }
                </div>
                <div className='relative my-4 m-1'>
                    <Editor group={props.group} socket={props.socket} type={'comment'} groupId={props.groupId} post={props.postThread} postContentForCommentNotification={props.postThread.content} />
                </div>
            </div>

        </div>
    )
}

export default CommentWindow