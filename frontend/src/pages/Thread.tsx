import React, { useContext, useEffect, useRef, useState } from 'react'
import { APIdeletePost, APIgetPostThread, APIupdatePost } from '../API/Post'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import Editor from '../components/Editor'
import ChatBox from '../components/ChatBox'
import { Context } from '../context/Context'
import { APIdeleteCommentsByCommentId } from '../API/Comment'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const Thread = (props: any) => {

    const [posts, setPosts] = useState([])
    const [newPostCount, setNewPostCount] = useState<number>(0)
    const [newCommentCount, setNewCommentCount] = useState<number>(0)
    const [newLikeCount, setNewLikeCount] = useState<number>(0)
    const { user } = useContext(Context)
    const scrollRef = useRef<any>()

    const [menu, setMenu] = useState<boolean>(false)

    const handleClickMenu = () => {
        setMenu(!menu)
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [newPostCount, posts.length]);

    useEffect(() => {
        props.socket?.current?.on("getNotification", (data: any) => {
            if (data.type == 2) {
                setNewCommentCount((prev: number) => prev + 1)
            }
            if (data.type == 1) {
                setNewLikeCount((prev: number) => prev + 1)
            }
            if (data.type == 15) {
                setNewCommentCount((prev: number) => prev - 1)
            }
            if (data.type == 16) {
                setNewPostCount((prev: number) => prev + 1)
            }
            if (data.type == 17) {
                setNewPostCount((prev: number) => prev + 1)
            }
            if (data.type == 18) {
                setNewPostCount((prev: number) => prev + 1)
            }
        });
    }, [props.socket?.current]);

    useEffect(() => {
        const fetchThread = async () => {
            const { status, data } = await APIgetPostThread()
            if (status) {
                setPosts(data)
            }
        }
        fetchThread();
    }, [newPostCount, newCommentCount, newLikeCount])

    const handleClickDeletePost = async (postId: string) => {
        if (window.confirm('Are you sure you want to remove this post in group ?')) {
            const { status } = await APIdeletePost(postId)
            if (status) {
                setNewPostCount((prev: number) => prev - 1)
            }
        }
    }

    const handleClickUpdatePost = async (postId: string, content: string) => {
        if (window.confirm('Are you sure you want to update this post in group ?')) {
            const { status } = await APIupdatePost(postId, content)
            if (status) {
                setNewPostCount((prev: number) => prev + 1)
            }
        }
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
        <div className='w-screen h-screen pointer-events-auto'>
            <TopBar socket={props.socket} />
            <div className='w-full h-[calc(100%-50px)] flex flex-col sm:flex sm:flex-row'>
                <div onClick={handleClickMenu} className='w-full sm:w-0 flex flex-row bg-sky-700 hover:bg-sky-800'>
                    <div className='p-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white hover:text-orange-300">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className='py-4 text-xl text-white font-bold'>Menu</div>
                </div>
                <div className='w-0 h-0 sm:w-[250px] sm:h-full'>
                    <SideBar socket={props.socket} />
                </div>
                {menu ?
                    <div className='sm:w-0 sm:h-0 h-[calc(100%-64px)]'>
                        <SideBar socket={props.socket} />
                    </div>
                    :
                    <div className='w-full h-full flex flex-row'>
                        <div className=' overflow-auto w-full'>
                            {posts.map((post: any) => {
                                return (
                                    <div className='mx-4 bg-gray-200 border-2 my-6' ref={scrollRef}>
                                        <div className='flex flex-row pb-2 px-2'>
                                            <div>
                                                <img className='w-8 h-8 mt-2 rounded-full' src={post.groupAvatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + post.groupAvatar) : `${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png'} alt="" />
                                            </div>
                                            <div className='flex flex-col'>
                                                <div className='ml-2 mx-0 text-md font-bold'>{post.groupName}</div>
                                                <div className='text-xs ml-2'>{timeAgo.format(new Date(post.createdAt))}</div>
                                            </div>

                                        </div>
                                        <div className=' py-2 bg-white'>
                                            <div className='flex flex-col mx-2'>
                                                <div className='ml-4 border-b-2 hover:bg-gray-100'>
                                                    <ChatBox handleClickUpdatePost={handleClickUpdatePost} handleClickDeletePost={handleClickDeletePost} post={post} socket={props.socket} />
                                                </div>
                                                <div className='ml-20 divide-y mr-6'>
                                                    {
                                                        post.comment?.map((comment: any) => {
                                                            return (
                                                                <div className='flex flex-row justify-between hover:bg-gray-100 pt-2'>
                                                                <div className='flex w-full'>
                                                                    <div>
                                                                        <img className='w-8 h-8 mt-2 rounded-full' src={comment.userAvatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + comment.userAvatar) : `${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png'} alt="" />
                                                                    </div>
                                                                    <div className='flex flex-col w-full'>
                                                                        <div className='flex justify-between w-full'>
                                                                            <div className='ml-2'>
                                                                                <div className='mx-0 text-md font-bold'>{comment.userName}</div>
                                                                                <div className='text-xs'>{timeAgo.format(new Date(comment.createdAt))}</div>
                                                                            </div>
                                                                            {
                                                                                comment.userId == user.userId ? <button onClick={() => handleClickDeleteComment(comment.commentId)} className=" text-white py-2 px-3 mx-2 my-3 font-medium text-xl bg-red-500 hover:bg-red-900 hover:text-white">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                                                                    </svg>

                                                                                </button> : null
                                                                            }
                                                                        </div>
                                                                        <div className='ml-2 pb-4'>
                                                                            <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className='mt-4 mb-4 pl-4 h-fit'>
                                                    <div className=' relative pb-12'>
                                                        <Editor socket={props.socket} type={'comment'} groupId={post.groupId} postId={post.postId} post={post} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default Thread