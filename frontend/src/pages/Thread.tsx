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
import { APIgetAllMemberByGroupId } from '../API/Group'

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

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [newPostCount, newCommentCount, newLikeCount, posts.length]);

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
    }, [newPostCount,newCommentCount,newLikeCount])

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

    return (
        <div className='w-screen h-screen pointer-events-auto'>
            <TopBar socket={props.socket} />
            <div className='w-full h-[calc(100%-50px)] flex flex-row'>
                <SideBar socket={props.socket} />
                <div className='w-[calc(100%-250px)] overflow-auto'>
                    {posts.map((post: any) => {
                        return (
                            <div className='m-4 bg-gray-200 border-2' ref={scrollRef}>
                                <div className='flex flex-row py-2 px-2'>
                                    <div>
                                        <img className='w-8 h-8 mt-2 rounded-full' src={post.groupAvatar ? ('http://localhost:3001/images/' + post.groupAvatar) : 'http://localhost:3001/images/nullAvatar.png'} alt="" />
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
                                                        <div className='flex flex-row hover:bg-gray-100 pt-2'>
                                                            <div>
                                                                <img className='w-8 h-8 mt-2 rounded-full' src={comment.userAvatar ? ('http://localhost:3001/images/' + comment.userAvatar) : 'http://localhost:3001/images/nullAvatar.png'} alt="" />
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <div className='ml-2'>
                                                                    <div className='mx-0 text-md font-bold'>{comment.userName}</div>
                                                                    <div className='text-xs'>{timeAgo.format(new Date(comment.createdAt))}</div>
                                                                </div>
                                                                <div className='ml-2 pb-4'>
                                                                    <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className='h-[120px] mt-4 mb-4'>
                                            <div className=' relative h-[90px] ml-20'>
                                                <Editor socket={props.socket} type={'comment'} groupId={post.groupId} postId={post.postId} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Thread