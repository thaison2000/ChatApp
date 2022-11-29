import { useContext, useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { APIcreatePost } from '../API/Post';
import { Context } from '../context/Context';
import { APIcreateComment } from '../API/Comment';

const Editor = (props: any) => {

  const { user } = useContext(Context)
  const [state, setState] = useState<any>()
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });
  const [editorHeight, setEditorHeight] = useState<any>()

  //xu ly khi click dang bai viet
  const handleClickSend = async () => {
    if(props.type == 'post'){
      const { status } = await APIcreatePost({
        groupId: props.groupId,
        content: state
      })
      if(status){
        quillRef.current.firstChild.innerHTML = ''
  
        props.socket?.current?.emit("sendMessage", {
          sendUserName: user.name,
          sendUserId: user.userId,
          groupId: props.groupId,
          content: state,
        });
      }
    }

    if(props.type == 'comment'){
      const { status } = await APIcreateComment({
        groupId: props.groupId,
        userId: user.userId,
        postId: props.postId,
        content: state
      })
      if(status){
        quillRef.current.firstChild.innerHTML = ''
  
        props.socket?.current?.emit("sendNotification", {
          sendUserName: user.name,
          sendUserId: user.userId,
          groupId: props.groupId,
          content: state,
          type: 2
        });
      }
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

  return (
    <div style={editorHeight} className='w-[98%] h-[90px] z-10 bg-white absolute bottom-0'>
      <div ref={quillRef} className='relative'/>
      <div onClick={() => setEditorHeight({ height: '300px' })} className='absolute top-2 right-8 flex flex-row'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
        </svg>
      </div>
      <div onClick={() => setEditorHeight({ height: '90px' })} className='absolute top-2 right-8 flex flex-row mx-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      <div className='absolute bottom-[-35px] right-2'>
        <svg onClick={handleClickSend} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" w-6 h-6 hover:text-green-500">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>

      </div>
    </div>
  );
};

export default Editor;
