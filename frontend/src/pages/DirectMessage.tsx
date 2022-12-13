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
            }
        });
    }, [props.socket?.current]);

    useEffect(() => {
        props.socket?.current?.on("getMessage", () => {
            if (members.some((member: any) => member.userId == user.userId)) {
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
            <div className='w-full h-[calc(100%-50px)] flex flex-row relative'>
                <SideBar socket={props.socket} />
                <div className='w-[calc(100%-250px)] flex flex-row'>
                    <div className='h-full w-full'>
                        <div className='flex flex-row justify-between bg-neutral-200 h-[65px]'>
                            <div className='flex flex-row pt-2'>
                                <div className='p-2 ml-2'>
                                    <img onClick={() => {
                                        navigate('/profile/' + group.userId)
                                    }}
                                        className='w-8 h-8 rounded-full' src={group?.avatar ? ('http://localhost:3001/images/' + group?.avatar) : 'http://localhost:3001/images/nullAvatar.png'} alt="" />
                                </div>
                                <div className='flex flex-col p-2'>
                                    <div>{group?.name}</div>
                                </div>
                            </div>
                        </div>
                        <div className='h-[460px] flex flex-col overflow-auto divide-y relative z-0 divide-y'>
                            {posts?.map((post: any) => {
                                return (
                                    <div key={post.postId} ref={scrollRef}>
                                        <ChatBox post={post} members={members} handleClickUpdatePost={handleClickUpdatePost} handleClickDeletePost={handleClickDeletePost} handleClickCommentWindow={handleClickCommentWindow} socket={props.socket} postThread={postThread} />
                                    </div>
                                )
                            })}
                        </div>
                        <div className='relative h-[90px] pl-2'>
                            <Editor socket={props.socket} groupId={groupId} type={'post'} handleUpdateNewPostCount={handleUpdateNewPostCount} />
                        </div>
                    </div>
                    {commentWindow ? <CommentWindow socket={props.socket} postThread={postThread} groupId={groupId} handleClickCommentWindow={handleClickCommentWindow} members={members} /> : null}
                </div>
            </div>
        </div>
    )
}

export default DirectMessage