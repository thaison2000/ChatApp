import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';

const Editor = () => {

  const [state,setState] = useState()
  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  if (Quill && !quill) {
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldContents) => {
        setState(quillRef.current.firstChild.innerHTML)
        console.log(quillRef.current.firstChild.innerHTML)
      });
    }
  }, [quill, Quill]);

  return (
    <div className='w-[1250px] h-[90px] hover:h-[300px] fixed bottom-12 z-10 bg-white ml-4'>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
