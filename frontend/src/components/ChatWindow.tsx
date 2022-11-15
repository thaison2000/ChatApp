import React, { useContext, useEffect, useRef, useState } from 'react'
import { APIaddMemberIntoGroup, APIgetAllMemberByGroupId, APIgetGroupByGroupId, APIupdateGroupAvatar } from '../API/Group';
import { APIgetAllPostByGroupId } from '../API/Post';
import { APIfindUserByName } from '../API/User';
import { Context } from '../context/Context';
import ChatBox from './ChatBox'
import Editor from './Editor'

const ChatWindow = (props: any) => {

  const [posts, setPosts] = useState([])
  const [avatar, setAvatar] = useState<any>()
  const [updateAvatarAlert, setUpdateAvatarAlert] = useState<boolean>(false)
  const [settingAlert, setSettingAlert] = useState<boolean>(false)
  const [addMemberAlert, setAddMemberAlert] = useState<boolean>(false)
  const [searchingUsers, setSearchingUsers] = useState<any>([])
  const [group, setGroup] = useState<any>()
  const [members, setMembers] = useState<any>([])
  const [newPostCount, setNewPostCount] = useState<number>(0)

  const addMemberName = useRef<any>()
  const scrollRef = useRef<any>();

  const { user } = useContext(Context)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }, [posts]);

  useEffect(() => {
    props.socket?.current?.on("getMessage", () =>{
      if(members.some((member: any)=> member.userId == user.userId) ){
        setNewPostCount((prev: number)=> prev + 1)
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
  }, [props.groupId, newPostCount]);

  useEffect(() =>{
    const fetchGroupByGroupId = async () => {
      const { status, data } = await APIgetGroupByGroupId(props.groupId)
      if (status) {
        setGroup(data)
      }
    };
    fetchGroupByGroupId();
  },[props.groupId])

  useEffect(() => {
    const fetchAllGroupMembers = async () => {
      const { status, data } = await APIgetAllMemberByGroupId(props.groupId)
      if (status) {
        setMembers(data)
      }
    };
    fetchAllGroupMembers();

  }, [props.groupId]);

  const handleUpdateNewPostCount = () => {
    setNewPostCount((prev: any) => prev + 1)
  }

  const handleSubmitUpdateGroupAvatar = async () => {
    let fileName = ''
    if (avatar) {
      const { status, data }: any = await APIupdateGroupAvatar(avatar, group.groupId)
      if (status) {
        fileName = data
        setAvatar(fileName)
      }
    }
  };

  const handleClickUpdateAvatarAlert = () => {
    setUpdateAvatarAlert(!updateAvatarAlert)
  }

  const handleClickAddMemberAlert = () => {
    setAddMemberAlert(!addMemberAlert)
  }

  const handleClickSearchUserByName = async (name: string) => {
    const { status, data } = await APIfindUserByName(name)
    if (status) {
      setSearchingUsers(data)
    }
  }

  const handleClickAddMemberIntoGroup = async (user: any) => {
    const { status } = await APIaddMemberIntoGroup(group.groupId, user.userId)
    if (status) {
      setMembers((prev: any) => [...prev, user]);
    }
  }


  const UpdateAvatarAlert = () => {
    return (
      <div className='fixed top-[120px] left-[520px] z-20 w-[500px] bg-white drop-shadow-xl rounded-lg'>
        <div className='w-full h-[50px] bg-sky-900 rounded-t-lg'>
          <h1 className='text-center text-white text-2xl font-medium p-2'>Change Group Avatar</h1>
        </div>
        <div className='flex flex-col items-center'>
          <div className='bg-white rounded-full my-4'>
            <img className='w-36 h-36 rounded-full' src={'http://localhost:3001/images/' + group?.avatar} alt="" />
          </div>
          <input className="block w-[240px] text-sm text-slate-500 ml-3 mb-4
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
              <svg onClick={handleSubmitUpdateGroupAvatar} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mt-8 ml-4 hover:text-green-700" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
              </svg>
              <svg onClick={() => setAvatar(null)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-10 ml-4 hover:text-red-700">
                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.133 2.845a.75.75 0 011.06 0l1.72 1.72 1.72-1.72a.75.75 0 111.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 11-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 11-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div> : null
          }
          <div className='w-full flex flex-row justify-center '>
            <button onClick={handleClickUpdateAvatarAlert} className="rounded-full text-white py-2 px-8 font-medium text-xl bg-red-600 hover:bg-sky-900 hover:text-white my-4">Cancel</button>
          </div>
        </div>
      </div>

    )
  }

  const AddMemberAlert = () => {
    return (
      <div className='fixed top-[120px] left-[520px] z-10 w-[500px] bg-white drop-shadow-xl rounded-lg'>
        <div className='w-full h-[50px] bg-sky-900 rounded-t-lg'>
          <h1 className='text-center text-white text-2xl font-medium p-2'>Add Member</h1>
        </div>
        <div className='flex flex-row'>
          <div className='w-full px-12'>
            <input ref={addMemberName} defaultValue={addMemberName.current?.value} className='w-full my-4 py-4 focus:outline-none' type="text" placeholder='name ...' />
          </div>
          <div className='mt-9 mr-12'>
            <svg onClick={() => handleClickSearchUserByName(addMemberName.current.value)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>


          </div>
        </div>
        <div className='w-full'>
          {searchingUsers.map((searchingUser: any) => (
            <div className='flex flex-row justify-between'>
              <div className='flex flex-row'>
                <div className='my-2 mr-4 ml-12'>
                  <img className='rounded-full w-10 h-10' src={'http://localhost:3001/images/' + searchingUser?.avatar} alt="" />
                </div>
                <div className='font-bold text-[18px] mt-3'>{searchingUser.name}</div>
              </div>
              {members.some((member: any) => member.userId == searchingUser.userId) ?
                <div className='mr-8 mt-2'>
                  <button className="rounded-xl text-white py-2 px-2 font-medium text-xl bg-sky-900">In</button>
                </div> :
                <div className='mr-8 mt-2'>
                  <button onClick={() => handleClickAddMemberIntoGroup(searchingUser)} className="rounded-xl text-white py-2 px-2 font-medium text-xl bg-green-600 hover:bg-sky-900 hover:text-white">Add</button>
                </div>}
            </div>
          ))}
        </div>
        <div className='w-full flex flex-row justify-center '>
          <button onClick={handleClickAddMemberAlert} className="rounded-full text-white py-2 px-8 font-medium text-xl bg-red-600 hover:bg-sky-900 hover:text-white my-4">Cancel</button>
        </div>
      </div>

    )
  }

  return (
    <div className='w-[calc(100%-250px)]'>
      {updateAvatarAlert ? <UpdateAvatarAlert /> : null}
      {addMemberAlert ? <AddMemberAlert /> : null}
      <div className='h-full'>
        <div className='flex flex-row justify-between bg-gray-200 shadow-2xl'>
          <div className='flex flex-row'>
            <div className='p-2 ml-2'>
              <img className='w-8 h-8 mt-2 rounded-full' src={'http://localhost:3001/images/' + group?.avatar} alt="" />
            </div>
            <div className='flex flex-col p-2'>
              <div>{group?.name}</div>
              <div>{group?.desc}</div>
            </div>
          </div>
          <div className='flex flex-row '>
            <svg onClick={handleClickUpdateAvatarAlert} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-green-600">
              <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
            </svg>

            <svg onClick={handleClickAddMemberAlert} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-blue-600">
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-gray-600">
              <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className='h-[440px] flex flex-col overflow-auto divide-y relative z-0 divide-y'>
          {posts?.map((post: any) => {
            return (
              <div key={post.postId} ref={scrollRef}>
                <ChatBox post={post} />
              </div>
            )
          })}
        </div>
        <div className=''>
          <Editor socket={props.socket} groupId={props.groupId} handleUpdateNewPostCount={handleUpdateNewPostCount} />
        </div>
      </div>
    </div>
  )
}

export default ChatWindow

