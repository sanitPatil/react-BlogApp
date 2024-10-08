import React from 'react'
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Controller } from 'react-hook-form';

function RTE({
  label,
  control,
  name,
  defaultValue=""
}) {
      const modules = {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean']  // remove formatting button
        ]
      };
  
      const formats = [
        'header', 'font',
        'list', 'bullet',
        'bold', 'italic', 'underline',
        'color', 'background',
        'align',
        'link', 'image'
      ];
  return (
    <div className='
    w-full mt-4
    '>
      {label && <label className='text-2xl font-bold p-2' >{label}</label>}
      <Controller
      name={name || "content"} 
      control={control}
      render={
        ({field})=>(
          <QuillEditor
          theme="snow" 
          value={defaultValue} 
          className='bg-white text-black'
          modules={modules}
          formats={formats} 
          
          
          
          />
        )
      }
      >

      </Controller>
    </div>
  )
}

export default RTE