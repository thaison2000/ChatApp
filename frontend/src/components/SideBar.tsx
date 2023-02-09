import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { APIfetchAllDirectMessageGroups, APIfetchAllGroups } from '../API/Group';
import { APIgetAllUnreadPosts, APIupdateAllUnreadPostByGroupId } from '../API/Post';
import { Context } from '../context/Context'
import CreateGroupForm from './CreateGroupForm'

const SideBar = (props: any) => {

    const groupId = useParams().groupId

    const navigate = useNavigate()
    const { user } = useContext(Context)

    const [displayChanel, setDisplayChanel] = useState(true)
    const [displayDirectMessage, setDisplayDirectMessage] = useState(true)
    const [createGroupForm, setCreateGroupForm] = useState(false)
    const [groups, setGroups] = useState<Array<any>>()
    const [directMessages, setDirectMessages] = useState<Array<any>>()
    const [newNotification, setNewNotification] = useState<any>({});
    const [unreadPosts, setUnreadPosts] = useState<Array<any>>([]);
    const [unreadPostsCount, setUnreadPostsCount] = useState<number>(0);
    const [onlineUsers, setOnlineUsers] = useState<Array<any>>()

    useEffect(() => {
        props.socket.current?.on("getNotification", (data: any) => {
            setNewNotification({
                sendUserId: data.sendUserId,
                receiveUserId: data.receiveUserId,
                type: data.type,
                post: data.post,
                createdAt: data.timestamp
            })
        });
    }, [props.socket.current]);

    useEffect(() => {
        props.socket.current?.on("getMessage", (data: any) => {
            setNewNotification({
                sendUserId: data.sendUserId,
                type: data.type,
                groupId: data.groupId,
                createdAt: data.timestamp
            })
        });
    }, [props.socket.current]);

    useEffect(() => {
        props.socket.current?.on("getUsers", (data: any) => {
            setOnlineUsers(data)
        });
    }, [props.socket.current]);

    useEffect(() => {
        const fetchAllUnreadPosts = async () => {
            const { status, data } = await APIgetAllUnreadPosts()
            if (status) {
                setUnreadPosts(data)
            }
        }
        fetchAllUnreadPosts();
    }, [newNotification, unreadPostsCount]);

    const handleClickUpdateUnreadPostsToReadPosts = async (groupId: string) => {
        const { status } = await APIupdateAllUnreadPostByGroupId(groupId)
        if (status) {
            setUnreadPostsCount((prev: any) => prev - 1)
            navigate('/group/' + groupId)
            // window.location.reload()
        }
    }

    const handleClickProfile = () => {
        navigate('/profile/' + user.userId)
    }

    const handleClickDisplayChanel = () => {
        setDisplayChanel(!displayChanel)
    }

    const handleClickDisplayDirectMessage = () => {
        setDisplayDirectMessage(!displayDirectMessage)
    }

    const handleClickCreateGroup = () => {
        setCreateGroupForm(!createGroupForm)
    }

    useEffect(() => {
        const fetchAllGroups = async () => {
            const { status, data } = await APIfetchAllGroups()
            if (status) {
                setGroups(data)
            }
        }
        fetchAllGroups();
    }, [newNotification]);

    useEffect(() => {
        const fetchAllDirectMessageGroups = async () => {
            const { status, data } = await APIfetchAllDirectMessageGroups()
            if (status) {
                setDirectMessages(data)
            }
        }
        fetchAllDirectMessageGroups();
    }, [newNotification]);

    return (
        <div className='h-full lg:w-[250px] bg-sky-700 overflow-y-auto overflow-x-hidden relative z-100'>
            {createGroupForm ? <CreateGroupForm handleClickCreateGroupForm={handleClickCreateGroup} /> : null}
            <div className='flex flex-col divide-y-2 relative'>
                <div className=' py-4 flex flex-row w-[250px] hover:bg-sky-800' onClick={handleClickProfile}>
                    <img className='rounded-full m-2 ml-4 w-8 h-8' src={user?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + user?.avatar) : (`${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png')} alt="" />
                    <h1 className='text-2xl text-white font-bold px-4 py-2 overflow-auto'>{user.name}</h1>
                </div>
                <div>
                    <div onClick={() => {
                        navigate('/thread')
                        // window.location.reload()
                    }} className='flex flex-row py-2 hover:bg-sky-800'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline text-white ml-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                        </svg>
                        <span className='text-white ml-2'>Threads</span>
                    </div>
                    <div onClick={() => {
                        navigate('/mention')
                        // window.location.reload()
                    }}
                        className = 'flex flex-row py-2 hover:bg-sky-800' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline text-white ml-4">
                            <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                        </svg>
                        <span className='text-white ml-2'>Mentions & reactions</span>
                    </div>
                <div onClick={() => {
                    navigate('/draft')
                    // window.location.reload()
                }} className='flex flex-row py-2 hover:bg-sky-800'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline text-white ml-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                    <span className='text-white ml-2'>Draft and sent</span>
                </div>
                <div className='flex flex-row py-2 hover:bg-sky-800'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline text-white ml-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>

                    <span className='text-white ml-2'>Connection</span>
                </div>
                <div className='flex flex-row py-2 hover:bg-sky-800'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline text-white ml-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>

                    <span className='text-white ml-2'>More</span>
                </div>
            </div>
            <div>
                <div className='flex flex-row py-2 hover:bg-sky-800' onClick={handleClickDisplayChanel}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline text-white ml-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                    </svg>
                    <span className='ml-2 text-white'>Chanel</span>
                </div>
                {displayChanel ?
                    <div className='max-h-[200px] overflow-y-auto'>
                        <div onClick={handleClickCreateGroup} className='flex flex-row py-2 pl-10 hover:bg-sky-800'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white mt-1">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                            </svg>
                            <span className='text-white ml-4 mt-1'>Add Chanel</span>
                        </div>
                        {groups?.map((group => {

                            return (
                                <div key={group.groupId} onClick={() => handleClickUpdateUnreadPostsToReadPosts(group.groupId)

                                } className='flex flex-row py-2 pl-10 hover:bg-sky-800 relative'>
                                    <img className='w-6 h-6 rounded-full' src={group?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + group?.avatar) : (`${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png')} alt="" />
                                    <span className='text-white ml-4 overflow-x-auto'>{group.name}</span>
                                    {unreadPosts.filter((unreadPost: any) => unreadPost.groupId == group.groupId).length > 0 ? <div className='rounded-full text-[12px] text-white font-medium pl-1 bg-red-600 w-4 h-4 absolute left-[55px] top-[2px]'>{unreadPosts.filter((unreadPost: any) => unreadPost.groupId == group.groupId).length}</div> : null}
                                </div>
                            )
                        }))}
                    </div> : null}
            </div>
            <div>
                <div className='flex flex-row py-2 hover:bg-sky-800' onClick={handleClickDisplayDirectMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline text-white ml-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                    </svg>
                    <span className='ml-2 text-white'>Direct message</span>
                </div>
                {displayDirectMessage ?
                    <div className='max-h-[200px] overflow-y-auto'>
                        {directMessages?.map((directMessage: any) => {
                            return (
                                <div key={directMessage.groupId} onClick={() => {
                                    navigate('/directMessage/' + directMessage.groupId)
                                    // window.location.reload()
                                }} className='flex flex-row py-2 pl-10 hover:bg-sky-800 relative'>
                                    <img className='w-6 h-6 rounded-full mt-[1px]' src={directMessage?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + directMessage?.avatar) : (`${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png')} alt="" />
                                    <span className='text-white ml-4 overflow-x-auto'>{directMessage.name}</span>
                                    {unreadPosts.filter((unreadPost: any) => unreadPost.groupId == directMessage.groupId).length > 0 ? <div className='rounded-full text-[12px] text-white font-medium pl-1 bg-red-600 w-4 h-4 absolute left-[55px] top-[2px]'>{unreadPosts.filter((unreadPost: any) => unreadPost.groupId == directMessage.groupId).length}</div> : null}
                                    {onlineUsers?.some((onlineUser: any)=> onlineUser.userId == directMessage.userId)? <div className='rounded-full text-[12px] text-white font-medium pl-1 bg-green-600 w-4 h-4 absolute left-[55px] bottom-[2px]'></div> : null}
                                </div>
                            )
                        })}
                    </div> : null}
            </div>
        </div>
        </div >
    )
}

export default SideBar