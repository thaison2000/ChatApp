import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import axios from 'axios';

const Editor = (props:any) => {

  

  const [state, setState] = useState<any>()
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  const handleClickSend = async () =>{
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': JSON.parse(`${localStorage.getItem("user")}`).jwt
        },
      }
      await axios.post("http://localhost:3002/api/post/", {
        group_id: props.group_id,
        content: state
      },
        config);
      window.location.reload()

    }
    catch (err) {
      console.log(err)
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
    <div className='w-[1250px] h-[90px] hover:h-[300px] fixed bottom-12 z-10 bg-white ml-4'>
      <div ref={quillRef}/>
      <div className='fixed bottom-4 right-8'>
        <svg onClick={handleClickSend} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:text-green-500">
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>

      </div>
    </div>
  );
};

export default Editor;
