import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor() {
  const [value, setValue] = useState('');

  return <ReactQuill 
  theme="snow" 
  value={value} 
  onChange={setValue}
  style={{
    width: '98%',
    height: '98%',
    margin: '10px'
  }} />;
}

export default TextEditor