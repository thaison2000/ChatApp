import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { APIgetAllMemberByGroupId, APIgetDirectMessageByGroupId } from '../API/Group'
import { APIdeletePost, APIgetAllPostByGroupId, APIupdatePost } from '../API/Post'
import ChatBox from '../components/ChatBox'
import CommentWindow from '../components/CommentWindow'
import Editor from '../components/Editor'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import { Context } from '../context/Context'

const DirectMessage = (props: any) => {

    const groupId = useParams().groupId || ''
    const [posts, setPosts] = useState([])
    const [newPostCount, setNewPostCount] = useState<number>(0)
    const [group, setGroup] = useState<any>()
    const [members, setMembers] = useState<Array<any>>([])
    const [commentWindow, setCommentWindow] = useState<boolean>(false)
    const [postThread, setPostThread] = useState<any>({})
    const [newCommentCount, setNewCommentCount] = useState<number>(0)
    const [newLikeCount, setNewLikeCount] = useState<number>(0)

    const scrollRef = useRef<any>();

    const { user } = useContext(Context)

    const navigate = useNavigate()

    const [menu, setMenu] = useState<boolean>(false)

    const handleClickMenu = () => {
        setMenu(!menu)
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [posts.length]);

    useEffect(() => {
        props.socket?.current?.on("getNotification", (data: any) => {
            if (members.some((member: any) => member.userId == user.userId)) {
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
            }
        });
    }, [props.socket?.current]);

    useEffect(() => {
        props.socket?.current?.on("getMessage", (data: any) => {
            if (groupId == data.groupId) {
                setNewPostCount((prev: number) => prev + 1)
            }
        });
    }, [props.socket?.current]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            const { status, data } = await APIgetAllPostByGroupId(groupId)
            if (status) {
                setPosts(data)
            }
        };
        fetchAllPosts();
    }, [groupId, newPostCount, newLikeCount, newCommentCount]);

    useEffect(() => {
        const fetchGroupByGroupId = async () => {
            const { status, data } = await APIgetDirectMessageByGroupId(groupId)
            if (status) {
                setGroup(data)
            }
        };
        fetchGroupByGroupId();
    }, [groupId])

    useEffect(() => {
        const fetchAllGroupMembers = async () => {
            const { status, data } = await APIgetAllMemberByGroupId(groupId)
            if (status) {
                setMembers(data)
            }
        };
        fetchAllGroupMembers();

    }, [groupId]);

    const handleUpdateNewPostCount = () => {
        setNewPostCount((prev: any) => prev + 1)
    }

    const handleClickCommentWindow = (postThread: any) => {
        setPostThread(postThread)
        setCommentWindow(!commentWindow)
    }

    const handleClickDeletePost = async (postId: string) => {
        if (window.confirm('Are you sure you want to remove this post in group ?')) {
            const { status } = await APIdeletePost(postId)
            if (status) {
                if (postThread.postId == postId) {
                    setCommentWindow(false)
                }
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
                    <div className='sm:w-0 sm:h-0'>
                        <SideBar socket={props.socket} />
                    </div>
                    : <div className='w-full h-[calc(100%-10px)] sm:h-full flex flex-row overflow-auto'>
                        {commentWindow ?
                            <div className='h-[calc(100%-40px)] sm:h-full w-full'>
                                <CommentWindow socket={props.socket} postThread={postThread} groupId={props.groupId} handleClickCommentWindow={handleClickCommentWindow} members={members} />

                            </div>
                            :
                            <div className='h-full w-full'>
                                <div className='flex flex-row justify-between bg-neutral-200 h-[65px]'>
                                    <div className='flex flex-row pt-2'>
                                        <div className='p-2 ml-2'>
                                            <img onClick={() => {
                                                navigate('/profile/' + group.userId)
                                            }}
                                                className='w-8 h-8 rounded-full' src={group?.avatar ? ('https://chatapp-server1-y5cc.onrender.com/images/' + group?.avatar) : 'https://chatapp-server1-y5cc.onrender.com/images/nullAvatar.png'} alt="" />
                                        </div>
                                        <div className='flex flex-col p-2'>
                                            <div>{group?.name}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col h-[calc(100%-160px)] sm:h-[calc(100%-105px)] divide-y relative z-0 divide-y'>
                                    <div className='overflow-auto'>
                                        {posts?.map((post: any) => {
                                            return (
                                                <div key={post.postId} ref={scrollRef}>
                                                    <ChatBox post={post} members={members} handleClickUpdatePost={handleClickUpdatePost} handleClickDeletePost={handleClickDeletePost} handleClickCommentWindow={handleClickCommentWindow} socket={props.socket} postThread={postThread} />
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='relative p-1'>
                                        <Editor socket={props.socket} groupId={groupId} type={'post'} handleUpdateNewPostCount={handleUpdateNewPostCount} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default DirectMessage