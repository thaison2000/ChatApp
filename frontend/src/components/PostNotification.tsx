
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Editor from './Editor'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import ChatBox from './ChatBox'
import { APIgetCommentsByPostId } from '../API/Comment'
import { Context } from '../context/Context'
import { APIgetPostByPostId } from '../API/Post'
import { APIgetGroupByGroupId } from '../API/Group'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const PostNotification = (props: any) => {

    const [post, setPost] = useState<any>({})
    const [group, setGroup] = useState<any>({})
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
        const fetchGroupByGroupId = async () => {
            const { status, data } = await APIgetGroupByGroupId(props.groupId)
            if (status) {
                setGroup(data)
            }
        };
        fetchGroupByGroupId();
    }, [props.groupId])

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
        const getPostByPostId = async () => {
            const { status, data } = await APIgetPostByPostId(props.postId)
            if (status) {
                setPost(data)
            }
        }
        getPostByPostId();
    }, [newCommentCount, newLikeCount]);

    useEffect(() => {
        const getCommentsByPostId = async () => {
            const { status, data } = await APIgetCommentsByPostId(props.postId)
            if (status) {
                setComments(data)
            }
        }
        getCommentsByPostId();
    }, [props.postId, newCommentCount, newLikeCount]);

    return (
        <div className='fixed sm:right-0 sm:left-0 sm:top-0 sm:bottom-0 sm:m-auto sm:w-[500px] sm:h-[320px] md:w-[800px] sm:h-[600px] w-full z-30 bg-white drop-shadow-xl'>
            <div className='relative'>
                <div className='font-bold text-2xl p-3 bg-neutral-500 text-white flex flex-row justify-between relative z-0'>
                    <div className='flex '>
                        <div>
                            <img onClick={() => {
                                navigate('/group/' + group.groupId)
                                window.location.reload()
                            }}
                                className='w-8 h-8 m-2 rounded-full' src={group.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + group.avatar) : `${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png'} alt="" />
                        </div>
                        <div className='flex flex-col mt-2 ml-2'>
                            <h1 className='mx-0 text-md font-bold'>{group.name}</h1>
                        </div>
                    </div>
                    <svg onClick={() => window.location.reload()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 m-2 text-bg-white hover:text-red-600">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                    </svg>
                </div>

            </div>
            <div className='max-h-[144px] h-[144px] w-full overflow-auto relative'>
                <ChatBox post={post} socket={props.socket} members={props.members} />
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
                                <div className='flex flex-row relative'>
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
                                <div className='ml-16 pb-4' ref={scrollRef}>
                                    <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
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
                    <Editor group={group} socket={props.socket} type={'comment'} groupId={props.groupId} postId={post?.postId} postContentForCommentNotification={post?.content} />
                </div>
            </div>

        </div>
    )
}

export default PostNotification