import { useContext, useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { APIcreatePost, APIupdateAllUnreadPostByGroupId, APIuploadDocs } from '../API/Post';
import { Context } from '../context/Context';
import { APIcommentUploadDocs, APIcreateComment } from '../API/Comment';
import { useParams } from 'react-router-dom';
import { APIfindUserByName } from '../API/User';
import { APIgetAllMemberByGroupId } from '../API/Group';
import { APIcreateNotification } from '../API/Notification';

const Editor = (props: any) => {

  const groupId = useParams().groupId

  const { user } = useContext(Context)
  const [state, setState] = useState<string>('')
  const [files, setFiles] = useState<any>()
  const [mentionBox, setMentionBox] = useState<boolean>(false)
  const [mentionUsers, setMentionUsers] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });
  const [editorHeight, setEditorHeight] = useState<any>()

  useEffect(() => {
    if (props.content) {
      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(props.content);
        //quillRef.current.firstChild.innerHTML = props.content
      }
    }
  }, [quill]);

  useEffect(() => {
    if (groupId == props.groupId && groupId != undefined) {
      const handleClickUpdateUnreadPostsToReadPosts = async () => {
        const { status } = await APIupdateAllUnreadPostByGroupId(props.groupId)
      }
      handleClickUpdateUnreadPostsToReadPosts()
    }

  }, [state]);

  const handleClickMentionBox = () => {
    setMentionBox(!mentionBox)
  }

  //xu ly khi click dang bai viet
  const handleClickSend = async () => {
    setIsLoading(true)
    if (props.type == 'post') {
      const { status, data } = await APIcreatePost({
        groupId: props.groupId,
        content: state
      })
      console.log(data)
      if (status) {
        quillRef.current.firstChild.innerHTML = ''
        props.socket?.current?.emit("sendMessage", {
          sendUserName: user.name,
          sendUserId: user.userId,
          groupId: props.groupId,
          content: state,
          type: 8
        });
        if (files) {
          const { status }: any = await APIuploadDocs(files,data.postId, user.userId)
          if (status) {
            setFiles(null)
          }
        }
        setIsLoading(false)
      }
    }

    if (props.type == 'comment') {
      const { status, data } = await APIcreateComment({
        groupId: props.groupId,
        userId: user.userId,
        postId: props.postId,
        content: state
      })
      if (status) {
        quillRef.current.firstChild.innerHTML = ''
        props.socket?.current?.emit("sendNotification", {
          sendUserName: user.name,
          sendUserId: user.userId,
          groupId: props.groupId,
          content: state,
          type: 2
        });
        if (files) {
          const { status }: any = await APIcommentUploadDocs(files,data.commentId, user.userId)
          if (status) {
            setFiles(null)
          }
        }
        setIsLoading(false)
      }
    }

    if (props.type == 'draftPost') {
      props.handleClickSaveDraftPost(state)
      quillRef.current.firstChild.innerHTML = ''
      setIsLoading(false)
    }

    if (props.type == 'updateDraftPost') {
      props.handleClickSaveDraftPost(state)
      quillRef.current.firstChild.innerHTML = ''
      setIsLoading(false)
    }

    if (props.type == 'updatePost') {
      props.handleClickSavePost(state)
      quillRef.current.firstChild.innerHTML = ''
      setIsLoading(false)
    }

  }

  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldContents) => {
        let data = quillRef.current.firstChild.innerHTML
        setState(data)
      });
    }
  }, [quill, Quill]);

  useEffect(() => {

    if (state?.indexOf('@') != -1) {
      const findUser = async () => {
        if (props.type == 'post' || props.type == 'comment') {
          const { status, data } = await APIgetAllMemberByGroupId(props.groupId)
          if (status) {
            setMentionUsers(data)
            setMentionBox(true)
          }
        }
      }
      findUser()
    }
  }, [state]);

  const MentionBox = () => (
    <div className='fixed bg-white pb-4 shadow-2xl sm:w-[500px] sm:h-[400px] overflow-auto sm:right-0 sm:left-0 sm:top-0 sm:bottom-0 sm:m-auto z-30'>
      <div className='bg-sky-700 p-4 text-xl font-bold text-white flex flex-row justify-between'>
        <div>Mention Users</div>
        <div onClick={handleClickMentionBox}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white hover:text-red-600">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
          </svg>

        </div>
      </div>
      <div>
        {
          mentionUsers.map((mentionUser: any) => (
            <div onClick={async () => {
              let data = state.replace('@', `<a href="http://localhost:3000/profile/${mentionUser.userId}" style="text-decoration: underline; color: blue; font-size: 14px;">${mentionUser.name}</a> `)
              quillRef.current.firstChild.innerHTML = data
              setMentionBox(false)
              props.socket?.current?.emit("sendNotification", {
                sendUserName: user.name,
                sendUserId: user.userId,
                groupName: props.group.name,
                groupId: props.groupId,
                receiveUserId: mentionUser.userId,
                content: state,
                type: 19
              });
              await APIcreateNotification({
                sendUserName: user.name,
                sendUserId: user.userId,
                groupName: props.group.name,
                groupId: props.group.groupId,
                receiveUserId: mentionUser.userId,
                content: state,
                type: 19
              })
            }
            } className='p-4 flex flex-row hover:bg-neutral-100'>
              <div>
                <img className='w-6 h-6' src={mentionUser?.avatar ? (`${process.env.REACT_APP_SERVER1_URL}` + '/images/' + mentionUser?.avatar) : `${process.env.REACT_APP_SERVER1_URL}` + '/images/nullAvatar.png'} alt="" />
              </div>
              <div className='ml-4'>{mentionUser.name}</div>
            </div>
          ))
        }
      </div>
    </div>
  )

  return (
    <div className='h-fit'>
      {mentionBox ? <MentionBox /> : null}
      <div className='h-[40px] relative'>
        <div onClick={() => setEditorHeight({ height: '300px' })} className='absolute top-2 right-8 flex flex-row'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
          </svg>
        </div>
        <div onClick={() => setEditorHeight({ height: '100px' })} className='absolute top-2 right-8 flex flex-row mx-2'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 9a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9zm0 6.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>

        </div>
        <div onClick={() => setEditorHeight({ height: '40px' })} className='absolute top-2 right-16 flex flex-row mx-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
      <div style={editorHeight} className='w-[100%] z-100 h-[100px] bg-white relative'>
        <div ref={quillRef} className='relative z-100 bg-white' />
        <div className='absolute bottom-[-40px]'>
          <input className="block w-[240px] text-sm text-slate-500 ml-3
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-neutral-200 file:text-neutral-700
                  hover:file:bg-neutral-400"
            type="file"
            id="avatar"
            multiple
            name='files'
            onChange={(e: any) => setFiles(e.target.files)}
          ></input>
        </div>
        <div className='absolute bottom-[-40px] right-2'>
          {isLoading ?
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-sky-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
            :
            <svg onClick={handleClickSend} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-6 h-6 hover:text-green-700">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          }
        </div>
      </div>
    </div>
  );
};

export default Editor;
