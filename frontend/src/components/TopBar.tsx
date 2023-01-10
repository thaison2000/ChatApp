import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APIaddFriend, APIdeleteFriendRequest, APIgetAllFriendRequestByReceiveUserId } from '../API/Friend'
import { APIfetchAllGroups } from '../API/Group'
import { APIcreateFriendRequestNotification, APIdeleteNotification, APIgetAllNotificationsByGroupIds, APIgetAllNotificationsByReceiveUserId } from '../API/Notification'
import { APIfindUserByName } from '../API/User'
import { Context } from '../context/Context'
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

const TopBar = (props: any) => {

    let navigate = useNavigate()
    const scrollRef = useRef<any>()
    const { user, dispatch } = useContext(Context);
    const [searchingAlert, setSearchingAlert] = useState<boolean>(false);
    const [searchingUsers, setSearchingUsers] = useState<any>();
    const [searchingWord, setSearchingWord] = useState<string>('');
    const [friendRequests, setFriendRequests] = useState<any>();
    const [notificationAlert, setNotificationAlert] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<any>([]);
    const [countNewNotifications, setCountNewNotifications] = useState<number>(0);
    const [newNotification, setNewNotification] = useState<any>();
    const [groups, setGroups] = useState<any>();

    const handleClickLogout = () => {
        localStorage.removeItem('user')
        window.location.reload()
    }

    const handleClickHome = () => {
        navigate('/')
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, [notifications, newNotification, notificationAlert]);

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
        const getAllNotificationsByReceiveUserId = async () => {
            const { status, data }: any = await APIgetAllNotificationsByReceiveUserId()
            if (status) {
                setNotifications(data)
            }
        }
        const getAllNotificationsByGroupIds = async () => {
            if (groups) {
                const { status, data }: any = await APIgetAllNotificationsByGroupIds(groups)
                if (status) {
                    setNotifications((prev: any) => prev.concat(data))
                }
            }
        }
        getAllNotificationsByReceiveUserId()
        getAllNotificationsByGroupIds()
    }, [groups]);


    useEffect(() => {
        const getAllFriendRequestByReceiveUserId = async () => {
            const { status, data }: any = await APIgetAllFriendRequestByReceiveUserId()
            if (status) {
                setFriendRequests(data)
            }
        }
        getAllFriendRequestByReceiveUserId()
    }, [newNotification]);

    useEffect(() => {
        props.socket?.current?.on("getNotification", (data: any) => {
            console.log(data)
            setNewNotification({
                sendUserId: data.sendUserId,
                sendUserName: data.sendUserName,
                receiveUserId: data.receiveUserId,
                type: data.type,
                post: data.post,
                createdAt: data.timestamp,
                affectedUserName: data.affectedUserName,
                groupName: data.groupName,
                groupId: data.groupId
            })
        });
    }, [props.socket?.current]);

    useEffect(() => {
        if (newNotification && newNotification.sendUserId != user.userId) {
            setNotifications((prev: any) => [...prev, newNotification]);
            setCountNewNotifications(countNewNotifications + 1)
        }
    }, [newNotification]);

    const handleClickNotificationAlert = () => {
        setNotificationAlert(!notificationAlert)
        setCountNewNotifications(0)
    }

    const handleClickDeleteFriendRequest = async (sendUserId: number, receiveUserId: number) => {
        await APIdeleteFriendRequest(sendUserId, receiveUserId)
        await APIdeleteNotification(sendUserId, receiveUserId, 4)

        await APIcreateFriendRequestNotification({
            sendUserName: user.name,
            sendUserId: receiveUserId,
            receiveUserId: sendUserId,
            type: 6
        })

        props.socket?.current?.emit("sendNotification", {
            sendUserName: user.name,
            sendUserId: receiveUserId,
            receiveUserId: sendUserId,
            type: 6
        });

        const newFriendRequests = friendRequests.filter((friendRequest: any) => friendRequest.sendUserId != sendUserId)
        setFriendRequests(newFriendRequests)
    }

    const handleClickAcceptFriendRequest = async (sendUserId: number, receiveUserId: number) => {
        await APIaddFriend(sendUserId)
        await APIdeleteFriendRequest(sendUserId, receiveUserId)
        await APIdeleteNotification(sendUserId, receiveUserId, 4)

        await APIcreateFriendRequestNotification({
            sendUserName: user.name,
            sendUserId: receiveUserId,
            receiveUserId: sendUserId,
            type: 5
        })

        props.socket?.current?.emit("sendNotification", {
            sendUserName: user.name,
            sendUserId: receiveUserId,
            receiveUserId: sendUserId,
            type: 5
        });

        const newFriendRequests = friendRequests.filter((friendRequest: any) => friendRequest.sendUserId != sendUserId)
        setFriendRequests(newFriendRequests)
        window.location.reload()
    }

    const handleClickFindUser = async () => {
        const { status, data } = await APIfindUserByName(searchingWord)
        if (status) {
            setSearchingUsers(data)
            setSearchingAlert(!searchingAlert)
            if (data.length == 0) {
                alert('Can not find any user !')
            }
        }
    }

    const handleSearchingWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchingWord(e.target.value)
    }

    const NotifcationAlert = () => (
        <div className='fixed w-[350px] h-[300px] overflow-auto h-64 bg-white shadow-2xl left-[1000px] top-[20px] z-10 rounded-xl divide-y'>
            {notifications?.map((notification: any) => {
                if (notification.type == 4 &&
                    friendRequests.some((friendRequest: any) => friendRequest.sendUserId == notification.sendUserId && friendRequest.receiveUserId == notification.receiveUserId)
                ) {
                    return (
                        <div className='py-2 px-4 hover:bg-neutral-200' ref={scrollRef}>
                            You have a <span className='text-[18px] font-medium text-sky-900'>friend request</span> from <span className='text-[18px] font-medium text-sky-900'>{notification.sendUserName}</span>
                            <div className="">{timeAgo.format(new Date(notification.createdAt))}</div>
                            <div className='flex flex-row justify-center mt-2'>
                                <div onClick={async () => await handleClickAcceptFriendRequest(notification.sendUserId, notification.receiveUserId)} className='py-1 px-8 bg-sky-900 text-white h-8 rounded-2xl hover:bg-green-500 mr-4'>Accept</div>
                                <div onClick={async () => await handleClickDeleteFriendRequest(notification.sendUserId, notification.receiveUserId)} className='py-1 px-8 bg-sky-900 text-white h-8 rounded-2xl hover:bg-red-500'>Reject</div>
                            </div>
                        </div>
                    )
                }
                if (notification.type == 5) {
                    return (
                        <div className='py-2 px-4 hover:bg-neutral-200' ref={scrollRef}>
                            <div>
                                You and <span className='text-[18px] font-medium text-sky-900'>{notification.sendUserName}</span> are <span className='text-[18px] font-medium text-sky-900'>Friends</span> !
                            </div>
                            <div className="">{timeAgo.format(new Date(notification.createdAt))}</div>

                        </div>
                    )
                }
                if (notification.type == 6) {
                    return (
                        <div className='py-2 px-4 hover:bg-neutral-200' ref={scrollRef}>
                            <div>
                                <span className='text-[18px] font-medium text-sky-900'>{notification.sendUserName}</span> has rejected your <span className='text-[18px] font-medium text-sky-900'>Friend Request</span> 
                                <div className="">{timeAgo.format(new Date(notification.createdAt))}</div>
                            </div>
                        </div>
                    )
                }
                if (notification.type == 7) {
                    return (
                        <div className='py-2 px-4 hover:bg-neutral-200' ref={scrollRef}>
                            <span className='text-[18px] font-medium text-sky-900'>{notification.sendUserName}</span> has <span className='text-[18px] font-medium text-sky-900'>Unfriend</span> you 
                            <div className="">{timeAgo.format(new Date(notification.createdAt))}</div>
                        </div>
                    )
                }
                if (notification.sendUserId != user.userId && notification.type == 9 && groups.some((group: any) => {
                    return group.groupId == notification.groupId
                })) {
                    return (
                        <div onClick={()=>{
                            navigate('/group/' + notification.groupId)
                            window.location.reload()
                        }
                        } className='py-2 px-4 hover:bg-neutral-200' ref={scrollRef}>
                            <div>
                                <span className='text-[18px] font-medium text-sky-900'>{notification.sendUserName}</span> has added <span className='text-[18px] font-medium text-sky-900'>{notification.affectedUserName}</span>  in to group <span className='text-[18px] font-medium text-sky-900'>{notification.groupName}</span>
                                <div className="">{timeAgo.format(new Date(notification.createdAt))}</div>
                            </div>
                        </div>
                    )
                }
                if (notification.sendUserId != user.userId && notification.type == 10 && groups.some((group: any) => {
                    return group.groupId == notification.groupId
                })) {
                    return (
                        <div className='py-2 px-4 hover:bg-neutral-200' ref={scrollRef}>
                            <div>
                                <span className='text-[18px] font-medium text-sky-900'>{notification.sendUserName}</span> has kicked <span className='text-[18px] font-medium text-sky-900'>{notification.affectedUserName}</span>  out of group <span className='text-[18px] font-medium text-sky-900'>{notification.groupName}</span>
                                <div className="">{timeAgo.format(new Date(notification.createdAt))}</div>
                            </div>
                        </div>
                    )
                }
                if (notification.sendUserId != user.userId && notification.type == 11 && groups.some((group: any) => {
                    return group.groupId == notification.groupId
                })) {
                    return (
                        <div className='py-2 px-4 hover:bg-neutral-200' ref={scrollRef}>
                            <div>
                                <span className='text-[18px] font-medium text-sky-900'>{notification.sendUserName}</span> has promoted <span className='text-[18px] font-medium text-sky-900'>{notification.affectedUserName}</span> to become <span className='text-[18px] font-medium text-sky-900'>Admin</span> in group <span className='text-[18px] font-medium text-sky-900'>{notification.groupName}</span>
                                <div className="">{timeAgo.format(new Date(notification.createdAt))}</div>
                            </div>
                        </div>
                    )
                }
                if (notification.sendUserId != user.userId && notification.type == 12 && groups.some((group: any) => {
                    return group.groupId == notification.groupId
                })) {
                    return (
                        <div className='py-2 px-4 hover:bg-neutral-200' ref={scrollRef}>
                            <div>
                                <span className='text-[18px] font-medium text-sky-900'>{notification.sendUserName}</span> has deleted group <span className='text-[18px] font-medium text-sky-900'>{notification.groupName}</span>
                                <div className="">{timeAgo.format(new Date(notification.createdAt))}</div>
                            </div>
                        </div>
                    )
                }
            }

            )}
        </div>
    )

    const SearchingAlert = () => {
        return (
            <div className='h-[500px] w-[600px] shadow-2xl bg-white z-20'>
                {searchingUsers.map((searchingUser: any) => (
                    <div onClick={() => {
                        navigate('/profile/' + searchingUser.userId, { replace: true })
                        window.location.reload()
                    }
                    } className='p-4 flex flex-row hover:bg-neutral-100'>
                        <div>
                            <img className='w-6 h-6' src={searchingUser?.avatar ? ('https://chatapp-server1-y5cc.onrender.com/images/' + searchingUser?.avatar) : 'https://chatapp-server1-y5cc.onrender.com/images/nullAvatar.png'} alt="" />
                        </div>
                        <div className='ml-4'>{searchingUser.name}</div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className='h-[50px] flex flex-row bg-sky-900 relative'>
            {notificationAlert ? <NotifcationAlert /> : null}
            <div className='w-[250px] flex flex-row'>
                <div className=''>
                    <h1 onClick={handleClickHome} className='text-2xl text-white font-bold px-4 py-2 hover:text-orange-300'>Chat App</h1>
                </div>
                <div className='flex flex-row ml-12'>
                </div>
            </div>
            <div className='w-[750px] flex flex-col relative'>
                <div className='relative flex flex-row'>
                    <input onChange={handleSearchingWordChange} className='w-[600px] focus:outline-none py-[6px] my-[7px] px-[10px]' type="text" placeholder=' search ...' />
                    <svg onClick={handleClickFindUser} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 absolute right-40 top-3">
                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                    </svg>
                </div>
                {searchingAlert ? <SearchingAlert /> : null}

            </div>
            <div className='w-[536px] flex flex-row justify-end'>
                <div className='flex flex-row relative'>
                    <span className='rounded-full text-[12px] text-white font-medium pl-1 bg-red-600 w-4 h-4 absolute left-[18px] top-[5px]'>{countNewNotifications}</span>
                    <svg onClick={handleClickNotificationAlert} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 my-2 text-white hover:text-orange-300">
                        <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                        <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z" clipRule="evenodd" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 my-2 text-white hover:text-orange-300 ml-4">
                        <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                    </svg>


                </div>
                <div className=''>
                    <h1 onClick={handleClickLogout} className='pointer-events-auto text-2xl text-white font-bold pl-4 py-2 mr-4 hover:text-orange-300'>Log out</h1>
                </div>
            </div>
        </div>
    )
}

export default TopBar