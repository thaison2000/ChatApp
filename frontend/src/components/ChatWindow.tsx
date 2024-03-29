import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIgetCommentsByPostId } from '../API/Comment';
import { APIaddMemberIntoGroup, APIdeleteGroup, APIdeleteMemberInGroup, APIgetAllMemberByGroupId, APIgetGroupByGroupId, APIpromoteAdminInGroup, APIupdateGroupAvatar, APIupdateGroupDesc, APIupdateGroupName } from '../API/Group';
import { APIcreateNotification } from '../API/Notification';
import { APIdeletePost, APIdeletePostByGroupId, APIgetAllImportantPostByGroupId, APIgetAllPostByGroupId, APIupdatePost, APIuploadDocs } from '../API/Post';
import { APIfindUserByName, APIfindUserInGroupByName } from '../API/User';
import { Context } from '../context/Context';
import ChatBox from './ChatBox'
import CommentWindow from './CommentWindow';
import Editor from './Editor'

const ChatWindow = (props: any) => {

  const [posts, setPosts] = useState([])
  const [importantPosts, setImportantPosts] = useState([])
  const [importantPostsWindow, setImportantPostsWindow] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<any>()
  const [updateAvatarAlert, setUpdateAvatarAlert] = useState<boolean>(false)
  const [settingAlert, setSettingAlert] = useState<boolean>(false)
  const [addMemberAlert, setAddMemberAlert] = useState<boolean>(false)
  const [memberAlert, setMemberAlert] = useState<boolean>(false)
  const [searchingUsers, setSearchingUsers] = useState<any>([])
  const [group, setGroup] = useState<any>()
  const [members, setMembers] = useState<Array<any>>([])
  const [newPostCount, setNewPostCount] = useState<number>(0)
  const [commentWindow, setCommentWindow] = useState<boolean>(false)
  const [postThread, setPostThread] = useState<any>({})
  const [newCommentCount, setNewCommentCount] = useState<number>(0)
  const [newLikeCount, setNewLikeCount] = useState<number>(0)
  const [addMemberLoading, setAddMemberLoading] = useState<boolean>(false)
  const [deleteGroupLoading, setDeleteGroupLoading] = useState<boolean>(false)
  const [changeAvatarLoading, setChangeAvatarLoading] = useState<boolean>(false)
  const [promoteAdminLoading, setPromoteAdminLoading] = useState<boolean>(false)
  const [deleteMemberLoading, setDeleteMemberLoading] = useState<boolean>(false)
  const [searchMembers, setSearchMembers] = useState<Array<any>>([])
  const [updateGroup, setUpdateGroup] = useState<boolean>(false)

  const addMemberName = useRef<any>()
  const deleteGroupName = useRef<any>()
  const newGroupName = useRef<any>()
  const newGroupDesc = useRef<any>()

  const scrollRef = useRef<any>();

  const nameSearch = useRef<any>();

  const { user } = useContext(Context)

  const navigate = useNavigate()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }, [posts.length, importantPostsWindow, commentWindow]);

  useEffect(() => {
    props.socket?.current?.on("getMessage", (data: any) => {
      setNewPostCount((prev: number) => prev + 1)
    });
  }, [props.socket?.current]);

  useEffect(() => {
    setSearchMembers(members)
  }, [members]);

  useEffect(() => {
    props.socket?.current?.on("getNotification", (data: any) => {

      if (data.type == 2) {
        setNewCommentCount((prev: number) => prev + 1)
      }
      if (data.type == 1) {
        setNewLikeCount((prev: number) => prev + 1)
      }

      if (data.type == 13) {
        setNewLikeCount((prev: number) => prev - 1)
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
    const fetchAllPosts = async () => {
      const { status, data } = await APIgetAllPostByGroupId(props.groupId)
      if (status) {
        setPosts(data)
      }
    };
    fetchAllPosts();
  }, [props.groupId, newPostCount, newCommentCount, newLikeCount]);

  useEffect(() => {
    const fetchAllImportantPosts = async () => {
      const { status, data } = await APIgetAllImportantPostByGroupId(props.groupId)
      if (status) {
        setImportantPosts(data)
      }
    };
    fetchAllImportantPosts();
  }, [props.groupId, newPostCount, newCommentCount, newLikeCount]);

  useEffect(() => {
    const fetchGroupByGroupId = async () => {
      const { status, data } = await APIgetGroupByGroupId(props.groupId)
      if (status) {
        setGroup(data)
      }
    };
    fetchGroupByGroupId();
  }, [props.groupId, avatar, updateGroup])

  useEffect(() => {
    const fetchAllGroupMembers = async () => {
      const { status, data } = await APIgetAllMemberByGroupId(props.groupId)
      if (status) {
        setMembers(data)
      }
    };
    fetchAllGroupMembers();

  }, [props.groupId, addMemberAlert, props.socket?.current]);

  const handleClickCommentWindow = (postThread: any) => {
    setPostThread(postThread)
    setCommentWindow(!commentWindow)
  }

  const handleSubmitUpdateGroupAvatar = async () => {
    setChangeAvatarLoading(true)
    if (avatar) {
      const { status, data }: any = await APIupdateGroupAvatar(avatar, group.groupId)
      if (status) {
        setAvatar(null)
        setChangeAvatarLoading(false)
        // window.location.reload()
      }
    }
  };

  const handleSubmitUpdateGroupName = async () => {
    if (newGroupName.current.value) {
      if (window.confirm('Are you sure you want to change group name ?')) {
      const { status, data }: any = await APIupdateGroupName(group.groupId, newGroupName.current.value)
      if (status) {
        setUpdateGroup(!updateGroup)

        // window.location.reload()
      }
    }
  }
  };

  const handleSubmitUpdateGroupDesc = async () => {
    if (newGroupDesc.current.value) {
      if (window.confirm('Are you sure you want to change group description ?')) {
      const { status, data }: any = await APIupdateGroupDesc(group.groupId, newGroupDesc.current.value)
      if (status) {
        setUpdateGroup(!updateGroup)

        // window.location.reload()
      }
    }
  }
  };

  const handleSubmitDeleteGroup = async () => {
    setDeleteGroupLoading(true)
    if (deleteGroupName.current.value != group.name) {
      setDeleteGroupLoading(false)
      window.alert('Wrong group name !')

    }
    else {
      if (window.confirm('Are you sure you want to delete the group ?')) {

        const { status: status1 }: any = await APIdeleteGroup(group.groupId)
        const { status: status2 }: any = await APIdeletePostByGroupId(group.groupId)
        if (status1 && status2) {
          props.socket?.current?.emit("sendNotification", {
            sendUserName: user.name,
            sendUserId: user.userId,
            groupName: group.name,
            groupId: group.groupId,
            type: 12
          });

          await APIcreateNotification({
            sendUserName: user.name,
            sendUserId: user.userId,
            groupName: group.name,
            groupId: group.groupId,
            type: 12
          })
          setDeleteGroupLoading(false)
          navigate('/')
        }
      }
    }
  };

  const handleClickImportantPostsWindow = () => {
    setImportantPostsWindow(!importantPostsWindow)
  }

  const handleClickUpdateAvatarAlert = () => {
    setUpdateAvatarAlert(!updateAvatarAlert)
  }

  const handleClickAddMemberAlert = () => {
    setAddMemberAlert(!addMemberAlert)
  }

  const handleClickSettingAlert = () => {
    setSettingAlert(!settingAlert)
  }

  const handleClickMemberAlert = () => {
    setMemberAlert(!memberAlert)
  }

  const handleClickSearchUserByName = async (name: string) => {
    const { status, data } = await APIfindUserByName(name)
    if (status) {
      setSearchingUsers(data)
    }
  }

  const handleClickSearchUserByNameInGroup = async (name: string) => {
    const { status, data } = await APIfindUserInGroupByName(name, group.groupId)
    if (status) {
      setSearchMembers(data)
    }
  }

  const handleClickAddMemberIntoGroup = async (addUser: any) => {
    setAddMemberLoading(true)
    const { status } = await APIaddMemberIntoGroup(group.groupId, addUser.userId)
    if (status) {
      props.socket?.current?.emit("sendNotification", {
        sendUserName: user.name,
        sendUserId: user.userId,
        groupName: group.name,
        groupId: group.groupId,
        affectedUserName: addUser.name,
        type: 9
      });

      await APIcreateNotification({
        sendUserName: user.name,
        sendUserId: user.userId,
        groupName: group.name,
        groupId: group.groupId,
        affectedUserName: addUser.name,
        type: 9
      })

      setMembers((prev: any) => [...prev,
      {
        userId: addUser.userId,
        groupId: group.groupId,
        name: '',
        type: 'user',
        avatar: ''
      }
      ]);
      setAddMemberLoading(false)
    }
  }

  const handleClickDeleteMemberInGroup = async (deleteUser: any) => {
    setDeleteMemberLoading(true)
    if (window.confirm('Are you sure you want to remove this user from the group ?')) {
      const { status } = await APIdeleteMemberInGroup(group.groupId, deleteUser.userId)
      if (status) {
        props.socket?.current?.emit("sendNotification", {
          sendUserName: user.name,
          sendUserId: user.userId,
          groupName: group.name,
          groupId: group.groupId,
          receiveUserId: deleteUser.userId,
          affectedUserName: deleteUser.name,
          type: 10
        });

        await APIcreateNotification({
          sendUserName: user.name,
          sendUserId: user.userId,
          groupName: group.name,
          groupId: group.groupId,
          receiveUserId: deleteUser.userId,
          affectedUserName: deleteUser.name,
          type: 10
        })
        setMembers(() => members.filter((member: any) => member.userId != deleteUser.userId));
        setDeleteMemberLoading(false)
      }

    }
    setDeleteMemberLoading(false)
  }

  const handleClickPromoteAdminInGroup = async (promoteUser: any) => {
    setPromoteAdminLoading(true)
    const { status } = await APIpromoteAdminInGroup(group.groupId, promoteUser.userId)
    if (status) {
      props.socket?.current?.emit("sendNotification", {
        sendUserName: user.name,
        sendUserId: user.userId,
        groupName: group.name,
        groupId: group.groupId,
        affectedUserName: promoteUser.name,
        type: 11
      });

      await APIcreateNotification({
        sendUserName: user.name,
        sendUserId: user.userId,
        groupName: group.name,
        groupId: group.groupId,
        affectedUserName: promoteUser.name,
        type: 11
      })
      let data: any = []
      for (let i = 0; i < members.length; i++) {
        if (members[i].userId == promoteUser.userId) {
          data.push({
            userId: members[i].userId,
            groupId: members[i].groupId,
            name: members[i].name,
            type: 'admin',
            avatar: members[i].avatar

          })
        }
        else {
          data.push({
            userId: members[i].userId,
            groupId: members[i].groupId,
            name: members[i].name,
            type: members[i].type,
            avatar: members[i].avatar

          })
        }
      }
      setMembers(data);
      setPromoteAdminLoading(false)
    }
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

  const handleClickUpdatePost = async (postId: string, content: string, files: any) => {
    if (window.confirm('Are you sure you want to update this post in group ?')) {
      const { status, data } = await APIupdatePost(postId, content)
      if (status) {
        if (files) {
          let type = 'post'

          const { status }: any = await APIuploadDocs(files, postId, user.userId, type)
        }
        props.socket?.current?.emit("sendNotification", {
          type: 16
        });
        setNewPostCount((prev: number) => prev + 1)
      }
    }
  }

  const UpdateAvatarAlert = () => {
    return (
      <div className='fixed w-full sm:w-[500px] sm:h-fit sm:right-0 sm:left-0 sm:top-0 sm:bottom-0 sm:m-auto z-20 bg-white drop-shadow-xl '>
        <div className='w-full h-[50px] bg-sky-900 '>
          <h1 className='text-center text-white text-2xl font-medium p-2'>Change Group Avatar</h1>
        </div>
        <div className='flex flex-col items-center bg-neutral-200 mx-8 mt-8 mb-4  p-4'>
          <div className='bg-white rounded-full my-4'>
            <img className='w-36 h-36 rounded-full' src={group?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + group?.avatar) : `${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png'} alt="" />
          </div>
          <input className="block w-[240px] text-sm text-slate-500 ml-3
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
            type="file"
            id="uploadFile"
            onChange={(e: any) => setAvatar(e.target.files[0])}
          ></input>
          {avatar ? <div className="w-[250px] flex flex-row">
            <img className=" ml-4 mt-4 w-40 h-40 object-contain" src={URL.createObjectURL(avatar)} alt="" />
            <div className='flex flex-col'>
              {
                changeAvatarLoading ?
                  <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-sky-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  :
                  <div>
                    <svg onClick={handleSubmitUpdateGroupAvatar} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mt-8 ml-4 hover:text-green-700" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                    </svg>
                    <svg onClick={() => setAvatar(null)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-10 ml-4 hover:text-red-700">
                      <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                      <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
              }
            </div>
          </div> : null
          }
        </div>
        <div className='w-full flex flex-row justify-center mb-4'>
          <button onClick={handleClickUpdateAvatarAlert} className="text-white py-1 px-6 font-medium text-xl bg-red-600 hover:bg-sky-900 hover:text-white">Cancel</button>
        </div>
      </div>

    )
  }

  const AddMemberAlert = () => {
    return (
      <div className='fixed w-full sm:w-[500px] sm:h-fit sm:right-0 sm:left-0 sm:top-0 sm:bottom-0 sm:m-auto z-20 bg-white drop-shadow-xl '>
        <div className='w-full h-[50px] bg-sky-900 '>
          <h1 className='text-center text-white text-2xl font-medium p-2'>Add Member</h1>
        </div>
        <div className='mx-8 mt-8 bg-neutral-200  p-4'>
          <div className='flex flex-row text-yellow-700'>
            <div className='pl-2 mt-2 text-xl font-bold'>Add member</div>
          </div>
          <div className='flex flex-row '>
            <div className='w-full px-2'>
              <input ref={addMemberName} defaultValue={addMemberName.current?.value} className='w-full my-4 py-4 focus:outline-none bg-neutral-200' type="text" placeholder='name ...' />
            </div>
            <div className='mt-9 mr-4'>
              <svg onClick={() => handleClickSearchUserByName(addMemberName.current.value)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className='max-h-[200px] overflow-auto'>
            {searchingUsers.map((searchingUser: any) => (
              <div className='flex flex-row justify-between hover:bg-neutral-300 p-2 '>
                <div className='flex flex-row'>
                  <div onClick={() => {
                    navigate('/profile/' + searchingUser.userId)
                  }}
                    className='my-2'>
                    <img className='rounded-full w-10 h-10' src={searchingUser?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + searchingUser?.avatar) : 'https://chatapp-server1-y5cc.onrender.com/images/nullAvatar.png'} alt="" />
                  </div>
                  <div className='font-bold text-[18px] mt-3 ml-4'>{searchingUser.name}</div>
                </div>
                <div className=''>
                  {members.some((member: any) => member.userId == searchingUser.userId) ?
                    <div className=' mt-2'>
                      <button className="rounded-xl text-white py-2 px-2 font-medium text-xl bg-sky-900">In</button>
                    </div> :
                    <div className=' mt-2'>
                      {
                        addMemberLoading ?
                          <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-sky-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                          :
                          <button onClick={() => handleClickAddMemberIntoGroup(searchingUser)} className="rounded-xl text-white py-2 px-2 font-medium text-xl bg-green-600 hover:bg-sky-900 hover:text-white">Add</button>
                      }
                    </div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full flex flex-row justify-center '>
          <button onClick={handleClickAddMemberAlert} className="text-white py-1 px-6 font-medium text-xl bg-red-600 hover:bg-sky-900 hover:text-white my-4">Cancel</button>
        </div>
      </div>

    )
  }

  const SettingAlert = () => {
    return (
      <div className='fixed w-full sm:w-[500px] sm:h-fit sm:right-0 sm:left-0 sm:top-0 sm:bottom-0 sm:m-auto z-20 bg-white drop-shadow-xl '>
        <div className='w-full h-[50px] bg-sky-900'>
          <h1 className='text-center text-white text-2xl font-medium p-2'>Setting</h1>
        </div>
        {
          members.some((member: any) => member.userId == user.userId && member.type == 'admin') ?
            <div className='mx-8 mt-8 bg-neutral-200  p-4'>
              <div className='flex flex-row text-green-600'>
                <div className=' mt-2 text-xl font-bold ml-2'>Change Group Name</div>
              </div>
              <div className='flex flex-row'>
                <div className='w-full px-2'>
                  <input ref={newGroupName} defaultValue={newGroupName.current?.value} className='w-full my-4 py-4 focus:outline-none bg-neutral-200' type="text" placeholder='New name ...' />
                </div>
                <div onClick={handleSubmitUpdateGroupName} className='mt-8 mr-4'>
                  <div className='hover:bg-green-600 p-2 rounded-xl bg-sky-900'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>

                  </div>
                </div>


              </div>
              <div className='flex flex-row text-yellow-600'>
                <div className=' mt-2 text-xl font-bold ml-2'>Change Group Description</div>
              </div>
              <div className='flex flex-row'>
                <div className='w-full px-2'>
                  <input ref={newGroupDesc} defaultValue={newGroupDesc.current?.value} className='w-full my-4 py-4 focus:outline-none bg-neutral-200' type="text" placeholder='New desc ...' />
                </div>
                <div onClick={handleSubmitUpdateGroupDesc} className='mt-8 mr-4'>
                  <div className='hover:bg-yellow-600 p-2 rounded-xl bg-sky-900'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>

                  </div>
                </div>
              </div>


              <div className='flex flex-row text-red-600'>
                <div className=' mt-2 text-xl font-bold ml-2'>Delete Group</div>
              </div>
              <div className='flex flex-row'>
                <div className='w-full px-2'>
                  <input ref={deleteGroupName} defaultValue={deleteGroupName.current?.value} className='w-full my-4 py-4 focus:outline-none bg-neutral-200' type="text" placeholder='Rewrite group name ...' />
                </div>
                {
                  deleteGroupLoading ?
                    <div role="status">
                      <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-sky-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    :
                    <div onClick={handleSubmitDeleteGroup} className='mt-8 mr-4'>
                      <div className='hover:bg-red-600 p-2 rounded-xl bg-sky-900'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ">
                          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                        </svg>
                      </div>

                    </div>

                }
              </div>
            </div> : null
        }
        <div className='w-full flex flex-row justify-center '>
          <button onClick={handleClickSettingAlert} className="text-white py-1 px-6 font-medium text-xl bg-red-600 hover:bg-sky-900 hover:text-white my-4">Cancel</button>
        </div>
      </div>

    )
  }

  const MemberAlert = () => {
    return (
      <div className='fixed w-full sm:w-[500px] sm:h-[500px] sm:right-0 sm:left-0 sm:top-0 sm:bottom-0 sm:m-auto z-20 bg-white drop-shadow-xl '>
        <div className='w-full h-[50px] bg-sky-900 '>
          <h1 className='text-center text-white text-2xl font-medium p-2'>Member</h1>
        </div>
        <div className='mx-8 mt-8 bg-neutral-200 p-4'>
          <div className='flex flex-row text-yellow-700 ml-2'>
            <div className=' mt-2 text-xl font-bold'>Member</div>
          </div>
          <div className='flex flex-row '>
            <div className='w-full px-2'>
              <input ref={nameSearch} className='w-full my-4 py-4 focus:outline-none bg-neutral-200' type="text" placeholder='name ...' />
            </div>
            <div className='mt-9 mr-4'>
              <svg onClick={() => handleClickSearchUserByNameInGroup(nameSearch.current.value)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className='max-h-[200px] overflow-auto'>
            {searchMembers?.map((member: any) => (
              <div className='flex flex-row justify-between hover:bg-neutral-300 p-2 '>
                <div className='flex flex-row'>
                  <div onClick={() => {
                    navigate('/profile/' + member.userId)
                  }}
                    className='my-2' >
                    <img className='rounded-full w-10 h-10' src={member?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + member?.avatar) : 'https://chatapp-server1-y5cc.onrender.com/images/nullAvatar.png'} alt="" />
                  </div>
                  <div>
                    <div className='font-bold text-[18px] mt-2 ml-4'>{member.name}</div>
                    <div className='font-sm text-[12px] ml-4'>{member.type}</div>
                  </div>
                </div>
                {members.some((member: any) => member.userId == user.userId && member.type == 'admin') && member.type == 'user' ?
                  <div className=' mt-2 flex flex-row'>
                    {
                      promoteAdminLoading || deleteMemberLoading ?
                        <div role="status">
                          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-sky-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                        :
                        <div>
                          <button onClick={() => handleClickPromoteAdminInGroup(member)} title='Promote to Admin' className=" rounded-xl text-neutral-500 font-medium text-medium text-center hover:text-green-600 mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                              <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                              <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                              <path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z" />
                            </svg>

                          </button>
                          <button onClick={() => handleClickDeleteMemberInGroup(member)} title='Delete User' className=" rounded-xl text-neutral-500 font-medium text-medium text-center hover:text-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                    }
                  </div>
                  : null}
              </div>
            ))}
          </div>
        </div>
        <div className='w-full flex flex-row justify-center '>
          <button onClick={handleClickMemberAlert} className="text-white py-1 px-6 font-medium text-xl bg-red-600 hover:bg-sky-900 hover:text-white my-4">Cancel</button>
        </div>
      </div>

    )
  }

  return (
    <div className='sm:h-[calc(100%-100px)] sm:h-full sm:w-full lg:w-[calc(100%-250px)] h-[calc(100%-65px)] p-0 bg-white relative z-10 sm:overflow-auto'>
      {commentWindow ?

        <div className='h-[calc(100%-70px)] sm:h-full'>
          <CommentWindow socket={props.socket} postThread={postThread} groupId={props.groupId} handleClickCommentWindow={handleClickCommentWindow} members={members} group={group} />

        </div> :
        <div className='w-[100%] h-full sm:h-[calc(100%-100px)] sm:relative'>
          {updateAvatarAlert ? <UpdateAvatarAlert /> : null}
          {addMemberAlert ? <AddMemberAlert /> : null}
          {settingAlert ? <SettingAlert /> : null}
          {memberAlert ? <MemberAlert /> : null}
          <div className='w-[100%] relative h-full'>
            <div
              className='flex flex-row justify-between bg-neutral-200 h-[55px]'>
              <div>
                <div className='flex flex-row'>
                  <div className='p-2 pl-4'>
                    <img className='w-8 h-8 mt-2 rounded-full' src={group?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + group?.avatar) : `${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png'} alt="" />
                  </div>
                  <div className='flex flex-col p-2'>
                    <div className='font-bold'>{group?.name}</div>
                    <div className='font-md text-sm'>{group?.desc}</div>
                  </div>
                </div>

              </div>
              <div className='flex flex-row h-[50px]'>
                {
                  importantPostsWindow ?
                    <svg onClick={handleClickImportantPostsWindow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-blue-500">
                      <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                      <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                    </svg>
                    :
                    <svg onClick={handleClickImportantPostsWindow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-red-500 ">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                }

                <svg onClick={handleClickUpdateAvatarAlert} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-green-600">
                  <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                </svg>
                <svg onClick={handleClickAddMemberAlert} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-blue-600">
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                </svg>
                <svg onClick={handleClickMemberAlert} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-orange-600">
                  <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                  <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                </svg>
                <svg onClick={handleClickSettingAlert} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-gray-600">
                  <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className='flex flex-col justify-between h-[calc(100%-150px)] sm:h-full divide-y'>
              <div className='flex flex-col overflow-auto divide-y relative z-0'>

                {importantPostsWindow ?
                  importantPosts?.map((post: any) => {
                    return (
                      <div key={post.postId} ref={scrollRef}>
                        <ChatBox groupId={props.groupId} handleClickUpdatePost={handleClickUpdatePost} handleClickDeletePost={handleClickDeletePost} post={post} handleClickCommentWindow={handleClickCommentWindow} socket={props.socket} members={members} postThread={postThread} />
                      </div>
                    )
                  }) :
                  posts?.map((post: any) => {
                    return (
                      <div key={post.postId} id={post.postId} ref={scrollRef}>
                        <ChatBox groupId={props.groupId} handleClickUpdatePost={handleClickUpdatePost} handleClickDeletePost={handleClickDeletePost} post={post} handleClickCommentWindow={handleClickCommentWindow} socket={props.socket} members={members} postThread={postThread} />
                      </div>
                    )
                  })}
              </div>
              <div className='relative p-1'>
                <Editor type={'post'} socket={props.socket} groupId={props.groupId} group={group} />
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default ChatWindow

