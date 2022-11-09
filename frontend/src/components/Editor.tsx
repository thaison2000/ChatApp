import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { APIcreatePost } from '../API/Post';

const Editor = (props: any) => {



  const [state, setState] = useState<any>()
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  //xu ly khi click dang bai viet
  const handleClickSend = async () => {
    await APIcreatePost({
      groupId: props.groupId,
      content: state
    })
    window.location.reload()
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
    <div className='w-[1250px] h-[90px] hover:h-[300px] fixed bottom-12 z-10 bg-white ml-4'>
      <div ref={quillRef} />
      <div className='fixed bottom-4 right-8'>
        <svg onClick={handleClickSend} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:text-green-500">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>

      </div>
    </div>
  );
};

export default Editor;
