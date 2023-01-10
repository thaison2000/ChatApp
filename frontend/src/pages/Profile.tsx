import { useContext, useEffect, useRef, useState } from 'react'
import { Context } from '../context/Context'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import { useParams } from 'react-router-dom'
import { APIgetUserProfile, APIupdateUserAvatar, APIupdateUserProfile } from '../API/User'
import { APIaddFriend, APIcreateFriendRequest, APIdeleteFriend, APIdeleteFriendRequest, APIgetAllFriendRequestBySendUserId, APIgetAllFriends } from '../API/Friend'
import { APIcreateFriendRequestNotification, APIcreateNotification, APIdeleteNotification } from '../API/Notification'

const Profile = (props: any) => {

  const { user: currentUser, dispatch } = useContext(Context)

  let userId: string = useParams().userId || ''

  const name = useRef<any>()
  const gender = useRef<any>()
  const dateOfBirth = useRef<any>()
  const phone = useRef<any>()
  const address = useRef<any>()

  const [clickProfileEdit, setClickProfileEdit] = useState(false)
  const [avatar, setAvatar] = useState<any>();
  const [user, setUser] = useState<any>()
  const [newNotification, setNewNotification] = useState<any>({});
  const [userCondition, setUserCondition] = useState<string>('user');
  //userCondition = [currentUser, user, friendRequest, friend]

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
    if (newNotification.type == 5) {
      const addFriend = async () => {
        setUserCondition('friend')
      }
      addFriend()
    }
    if (newNotification.type == 6) {
      setUserCondition('user')
    }
    if (newNotification.type == 7) {
      const deleteFriend = async () => {
        const { status } = await APIdeleteFriend(newNotification.sendUserId)
        if (status) {
          setUserCondition('user')
        }
      }
      deleteFriend()
    }
  }, [newNotification]);

  //lay thong tin ca nhan nguoi dung
  useEffect(() => {
    const getUserProfile = async () => {
      const { status, data } = await APIgetUserProfile(userId)
      if (status) {
        setUser(data)
      }
    }
    getUserProfile()

  }, [userId, clickProfileEdit]);

  useEffect(() => {

    let friends: any = []
    let friendRequests: any = []

    if (user?.userId == currentUser?.userId) {
      setUserCondition('currentUser')
    }
    else {
      const getAllFriends = async () => {
        const { status, data }: any = await APIgetAllFriends()
        if (status) {
          friends = data
        }
        if (friends.some((friend: any) => friend.friendId == user?.userId)) {
          setUserCondition('friend')
        }
      }

      const getAllFriendRequestBySendUserId = async () => {
        const { status, data }: any = await APIgetAllFriendRequestBySendUserId()
        if (status) {
          friendRequests = data
        }
        if (friendRequests.some((friendRequest: any) => friendRequest.sendUserId == currentUser.userId && friendRequest.receiveUserId == user?.userId)) {
          setUserCondition('friendRequest')

        }
      }

      getAllFriends()
      getAllFriendRequestBySendUserId()
    }
  }, [user, userId]);

  const handleClickProfileEdit = () => {
    setClickProfileEdit(!clickProfileEdit)
  }

  //xu ly khi gui loi moi ket ban
  const handleClickSendFriendRequest = async () => {
    const { status }: any = await APIcreateFriendRequest(user.userId)
    if (status) {
      setUserCondition('friendRequest')
    }

    await APIcreateFriendRequestNotification({
      sendUserId: currentUser.userId,
      receiveUserId: user.userId,
      sendUserName: currentUser.name,
      type: 4
    })

    props.socket?.current?.emit("sendNotification", {
      sendUserName: currentUser.name,
      sendUserId: currentUser.userId,
      receiveUserId: user.userId,
      type: 4
    });
  }

  //xu ly khi xoa loi moi ket ban
  const handleClickDeleteFriendRequest = async () => {
    const { status }: any = await APIdeleteFriendRequest(currentUser.userId, user.userId)
    if (status) {
      setUserCondition('user')
    }
    await APIdeleteNotification(currentUser.userId, user.userId, 4)
  }

  //xu ly khi xoa ban
  const handleClickDeleteFriend = async () => {
    const { status }: any = await APIdeleteFriend(user.userId)
    if (status) {
      await APIcreateNotification({
        sendUserName: currentUser.name,
        sendUserId: currentUser.userId,
        receiveUserId: user.userId,
        type: 7
      })
      props.socket?.current?.emit("sendNotification", {
        sendUserName: currentUser.name,
        sendUserId: currentUser.userId,
        type: 7
      });
      setUserCondition('user')
    }
  }

  //xu ly khi thay doi anh dai dien
  const handleSubmitUpdateAvatar = async () => {
    let fileName = ''
    if (avatar) {
      const { status, data }: any = await APIupdateUserAvatar(avatar)
      if (status) {
        fileName = data
        dispatch({ type: 'UPDATE_AVATAR', payload: { avatar: fileName } });
        setAvatar(null)
        window.location.reload()
      }
    }
  };

  // xu ly khi thay doi thong tin ca nhan
  const handleClickSubmitUpdateProfile = async () => {
    const { status }: any = await APIupdateUserProfile({
      name: name.current.value,
      dateOfBirth: dateOfBirth.current.value,
      phone: phone.current.value,
      address: address.current.value,
      gender: gender.current.value
    })
    if (status) {
      dispatch({
        type: 'UPDATE_PROFILE', payload: {
          name: name.current.value,
          dateOfBirth: dateOfBirth.current.value,
          phone: phone.current.value,
          address: address.current.value,
          gender: gender.current.value
        }
      })
      setClickProfileEdit(!clickProfileEdit)
    }
  };

  //form thay doi thong tin ca nhan
  const ProfileEditForm = () => {
    return (
      <div className='drop-shadow-2xl bg-white rounded-2xl p-4 mt-4 w-[600px]'>
        <div className='mx-8 mt-4 flex flex-row'>
          <span className='text-2xl text-sky-700 font-bold w-[200px]'>User information</span>
          <svg onClick={handleClickProfileEdit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-3 mt-1 text-amber-400 hover:text-red-700">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
            <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
          </svg>
        </div>
        <div className='flex flex-col mx-8 my-2 justify-between'>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Name</span>
            <input ref={name} className='text-xl text-stone-500 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='text' defaultValue={user.name} />
          </div>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Gender</span>
            <select className='text-xl text-stone-500 font-normal p-2 pl-4 pr-4 enabled:bg-yellow-200 rounded-xl' ref={gender} name="gender" id="gender" defaultValue={user.gender}>
              <option value="Male">Male</option>
              <option value="Female">FeMale</option>
            </select>

          </div>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Date of Birth</span>
            <input ref={dateOfBirth} className='text-xl text-stone-700 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='date' defaultValue={user?.dateOfBirth} />
          </div>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Phone</span>
            <input ref={phone} className='text-xl text-stone-500 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='text' defaultValue={user?.phone} />
          </div>
          <div className='flex flex-row my-2'>
            <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
            <span className='text-xl w-[200px] text-sky-700 font-bold'>Address</span>
            <input ref={address} className='text-xl text-stone-700 font-normal p-2 pl-4 enabled:bg-yellow-200 rounded-xl' type='text' defaultValue={user?.address} />
          </div>
          <div className='flex flex-row my-2'>
            <span className='text-xl w-[200px] text-sky-700 font-bold ml-3'></span>
            <button onClick={handleClickSubmitUpdateProfile} className='text-xl text-stone-700 font-normal p-2 pl-4 bg-green-500 rounded-xl p-2 flex flex-row hover:bg-green-600 hover:text-white'>
              <span className=' mr-2 font-bold'>Submit</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='w-screen h-screen pointer-events-auto'>
      <TopBar socket={props.socket} />
      <div className='w-full h-[calc(100%-50px)] flex flex-row'>
        <SideBar socket={props.socket} />
        <div className='flex flex-row p-4'>
          <div className='flex flex-row'>
            <div className='flex flex-col'>
              <div className='my-4 ml-8 mr-4 flex flex-col relative drop-shadow-2xl bg-white rounded-2xl w-[250px] h-[250px] justify-center items-center'>
                <img className='w-48 h-48 rounded-full' src={user?.avatar ? ('https://chatapp-server1-y5cc.onrender.com/images/' + user?.avatar) : 'https://chatapp-server1-y5cc.onrender.com/images/nullAvatar.png'} alt="" />

              </div>
              {currentUser?.userId == user?.userId ?
                <div className='my-4 ml-8 mr-4 relative drop-shadow-2xl bg-white rounded-2xl w-[250px] pb-6 '>
                  <label className="block mb-2 text-sm w-[240px] mt-4 ml-4 font-medium text-gray-900 dark:text-gray-300">Change avatar</label>
                  <input className="block w-[240px] text-sm text-slate-500 ml-3
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                    type="file"
                    id="avatar"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e: any) => setAvatar(e.target.files[0])}
                  ></input>
                  {avatar ? <div className="w-[250px] flex flex-row">
                    <img className=" ml-4 mt-4 w-40 h-40 object-contain" src={URL.createObjectURL(avatar)} alt="" />
                    <div className='flex flex-col'>
                      <svg onClick={handleSubmitUpdateAvatar} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mt-8 ml-4 hover:text-green-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                      </svg>
                      <svg onClick={() => setAvatar(null)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-10 ml-4 hover:text-red-700">
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                        <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                      </svg>
                    </div>

                  </div> : null
                  }
                </div> : null}
            </div>
            <div className='ml-8'>
              {clickProfileEdit ? <ProfileEditForm /> :
                <div className='drop-shadow-2xl bg-white rounded-2xl p-4 mt-4 w-[600px]'>
                  <div className='mx-8 mt-4 flex flex-row'>
                    <span className='text-2xl text-sky-700 font-bold w-[200px]'>User information</span>
                    {currentUser?.userId == user?.userId ?
                      <svg onClick={handleClickProfileEdit} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-3 mt-1 text-amber-400 hover:text-green-700">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg> : null
                    }
                  </div>
                  <div className='flex flex-col mx-8 my-2 justify-between'>
                    <div className='flex flex-row my-2'>
                      <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                      <span className='text-xl w-[200px] text-sky-700 font-bold'>Name</span>
                      <span className='text-xl text-stone-500 w-[300px] font-normal overflow-auto'>{user?.name}</span>
                    </div>
                    <div className='flex flex-row my-2'>
                      <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                      <span className='text-xl w-[200px] text-sky-700 font-bold'>Gender</span>
                      <span className='text-xl text-stone-500 w-[300px] font-normal'>{user?.gender}</span>
                    </div>
                    <div className='flex flex-row my-2'>
                      <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                      <span className='text-xl w-[200px] text-sky-700 font-bold'>Date of Birth</span>
                      <span className='text-xl text-stone-500 w-[300px] font-normal'>{user?.dateOfBirth}</span>
                    </div>
                    <div className='flex flex-row my-2'>
                      <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                      <span className='text-xl w-[200px] text-sky-700 font-bold'>Email</span>
                      <span className='text-xl text-stone-500 w-[300px] font-normal overflow-auto'>{user?.email}</span>
                    </div>
                    <div className='flex flex-row my-2'>
                      <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                      <span className='text-xl w-[200px] text-sky-700 font-bold'>Phone</span>
                      <span className='text-xl text-stone-500 w-[300px] font-normal overflow-auto'>{user?.phone}</span>
                    </div>
                    <div className='flex flex-row my-2'>
                      <span className='w-1 h-8 bg-sky-700 rounded-2xl mr-2'></span>
                      <span className='text-xl w-[200px] text-sky-700 font-bold'>Address</span>
                      <span className='text-xl text-stone-500 font-normal overflow-auto'>{user?.address}</span>
                    </div>
                  </div></div>
              }
            </div>
          </div>
          {userCondition === 'user' ?
            <div onClick={handleClickSendFriendRequest} className='flex flex-row w-40 h-10 bg-green-500 rounded-lg text-white font-bold text-lg pt-[5px] pl-[12px] mt-4 ml-4 hover:bg-green-700'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-1 mr-2">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
              </svg>
              <span>Add Friend</span></div> : null
          }
          {userCondition === 'friendRequest' ?
            <div onClick={handleClickDeleteFriendRequest} className='flex flex-row w-64 h-10 bg-green-500 rounded-lg text-white font-bold text-lg pt-[5px] pl-[12px] mt-4 ml-4 hover:bg-green-700'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-1 mr-2">
                <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
              <span>Waiting for acceptation</span></div> : null
          }
          {userCondition === 'friend' ?
            <div onClick={handleClickDeleteFriend} className='flex flex-row w-44 h-10 bg-red-500 rounded-lg text-white font-bold text-lg pt-[5px] pl-[12px] mt-4 ml-4 hover:bg-red-700'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-1 mr-2">
                <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
              <span>Delete Friend</span></div> : null
          }
        </div>
      </div>
    </div>

  )
}

export default Profile