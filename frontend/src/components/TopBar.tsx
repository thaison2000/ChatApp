import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'

const TopBar = (props:any) => {

    const navigate = useNavigate()
    const scrollRef = useRef<any>()
    const { user, dispatch } = useContext(Context);
    const [notificationAlert, setNotificationAlert] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<any>();
    const [countNewNotifications, setCountNewNotifications] = useState(-1);
    const [newNotification, setNewNotification] = useState<any>();
    const [deletedfriendRequestNotification, setDeletedFriendRequestNotification] = useState();

    const handleClickLogout = () => {
        localStorage.removeItem('user')
        window.location.reload()
    }

    const handleClickHome = () => {
        navigate('/')
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [notifications]);

    // useEffect(() => {
    //     const getNotifications = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:3001/api/notification/" + user._id);
    //             setNotifications(res.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getNotifications();
    // }, []);

    // useEffect(() => {
    //     props.socket?.current?.on("getNotification", (data:any) => {
    //         console.log(data)
    //         setNewNotification({
    //             sendUserId: data.sendUserId,
    //             sendUserName: data.sendUserName,
    //             receiveUserId: data.receiveUserId,
    //             type: data.type,
    //             post: data.post,
    //             createdAt: data.timestamp
    //         })
    //     });
    // }, [props.socket?.current]);

    // useEffect(() => {
    //     newNotification &&
    //         setNotifications((prev:any) => [...prev, newNotification]);
    //     setCountNewNotifications(countNewNotifications + 1)
    // }, [newNotification]);

    // useEffect(() => {
    //     deletedfriendRequestNotification &&
    //         setNotifications(notifications.filter((notification) => {
    //             let deletedValue = { ...deletedfriendRequestNotification, type: 4 }

    //             return (notification.sendUserName !== deletedValue.sendUserName && notification.type !== deletedValue.type) && notification !== deletedfriendRequestNotification
    //         }));
    //     console.log(notifications)
    // }, [deletedfriendRequestNotification]);

    // const handleClickAcceptAddFriend = async (deletefriendRequestNotification:any) => {
    //     try {
    //         await axios.put(`http://localhost:3001/api/user/` + user._id + '/addfriend', { userId: deletefriendRequestNotification.sendUserId, });
    //         await axios.delete(`http://localhost:3001/api/notification`, {
    //             data: {
    //                 sendUserId: deletefriendRequestNotification.sendUserId,
    //                 receiveUserId: user._id,
    //                 type: 4
    //             }
    //         });
    //         await axios.post(`http://localhost:3003/api/conversation/`, { firstUserId: deletefriendRequestNotification.sendUserId, secondUserId: user._id });

    //         socket.current?.emit("sendNotification", {
    //             sendUserName: user.username,
    //             sendUserId: deletefriendRequestNotification.receiveUserId,
    //             receiveUserId: deletefriendRequestNotification.sendUserId,
    //             type: 5
    //         });

    //         dispatch({ type: "ADDFRIEND", payload: deletefriendRequestNotification.sendUserId });
    //         setNotifications(notifications.filter((notification) => {
    //             return notification != deletefriendRequestNotification
    //         }))

    //     } catch (err) {
    //     }
    // };

    // const handleClickRejectAddFriend = async (deletefriendRequestNotification) => {
    //     try {
    //         await axios.delete(`http://localhost:3001/api/notification`, {
    //             data: {
    //                 sendUserId: deletefriendRequestNotification.sendUserId,
    //                 receiveUserId: user._id,
    //                 type: 4
    //             }
    //         });
    //         setNotifications(notifications.filter((notification) => {
    //             return notification != deletefriendRequestNotification
    //         }))
    //         socket.current?.emit("sendNotification", {
    //             sendUserName: user.username,
    //             sendUserId: deletefriendRequestNotification.receiveUserId,
    //             receiveUserId: deletefriendRequestNotification.sendUserId,
    //             type: 6
    //         });
    //     } catch (err) {
    //     }
    // };

    return (
        <div className='h-[50px] flex flex-row bg-sky-900'>
            <div className='w-[250px] flex flex-row'>
                <div className=''>
                    <h1 onClick={handleClickHome} className='text-2xl text-white font-bold px-4 py-2 hover:text-orange-300'>Chat App</h1>
                </div>
                <div className='flex flex-row ml-12'>
                </div>
            </div>
            <div className='w-[750px]'>
                <div>
                    <input className='w-[600px] focus:outline-none py-[6px] my-[7px] px-[10px]' type="text" placeholder=' search ...' />
                </div>
            </div>
            <div className='w-[536px] flex flex-row justify-end'>
                <div className='flex flex-row'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 my-2 text-white hover:text-orange-300">
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