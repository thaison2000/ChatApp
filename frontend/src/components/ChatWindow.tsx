import React, { useEffect, useState } from 'react'
import { APIgetGroupByGroupId } from '../API/Group';
import { APIgetAllPostByGroupId } from '../API/Post';
import ChatBox from './ChatBox'
import Editor from './Editor'

const ChatWindow = (props: any) => {

  const [posts, setPosts] = useState([])
  const [updateAvatarAlert, setUpdateAvatarAlert] = useState<boolean>(false)
  const [settingAlert, setSettingAlert] = useState<boolean>(false)
  const [addMemberAlert, setAddMemberAlert] = useState<boolean>(false)
  const [group, setGroup] = useState<any>()

  useEffect(() => {
    const fetchAllPosts = async () => {
      const { status, data } = await APIgetAllPostByGroupId(props.groupId)
      if (status) {
        setPosts(data)
      }
    };
    fetchAllPosts();

    const handleSubmitUpdateAvatar = async () => {
      let fileName = ''
      // if (avatar) {
      //   const { status, data }: any = await APIupdategGroupAvatar(avatar)
      //   if (status) {
      //     fileName = data
      //     setAvatar(null)
      //     window.location.reload()
      //   }
      // }
    };

    const fetchGroupByGroupId = async () => {
      const { status, data } = await APIgetGroupByGroupId(props.groupId)
      if (status) {
        setGroup(data)
      }
    };
    fetchGroupByGroupId();
  }, [props.groupId]);

  const UpdateAvatarAlert = () =>{
    return (
      <div>
        
      </div>
    )
  }

  return (
    <div className='w-[calc(100%-250px)]'>
      <div className='h-full'>
        <div className='h-[520px] flex flex-col overflow-auto divide-y relative z-0 divide-y'>
          <div className='flex flex-row justify-between bg-gray-200 shadow-2xl'>
            <div className='flex flex-row'>
              <div className='p-2'>
                <img className='w-8 h-8 mt-2' src={'http://localhost:3001/images/' + group?.avatar} alt="" />
              </div>
              <div className='flex flex-col p-2'>
                <div>{group?.name}</div>
                <div>{group?.desc}</div>
              </div>
            </div>
            <div className='flex flex-row '>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-green-600">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-blue-600">
                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-2 mt-5 hover:text-gray-600">
                <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
              </svg>


            </div>
          </div>
          {posts?.map((post: any) => {
            return (
              <div key={post.postId}>
                <ChatBox post={post} />
              </div>
            )
          })}
        </div>
        <div className=''>
          <Editor groupId={props.groupId} />
        </div>
      </div>
    </div>
  )
}

export default ChatWindow