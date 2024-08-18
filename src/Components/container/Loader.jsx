import React from 'react';
import LoadingImg from "/images/LoadingImage.png"
function Loader() {
  return (
    
        <div className='w-full bg-slate-200 grid grid-cols-2 pt-1'>
            <div className='w-full h-[100%]'>
                <div className='grid place-items-center h-screen pr-8 text-blue-400'>
                    <h1 className='pl-28 mt-20 text-blue-700 text-7xl font-extrabold'>THE BLOG - PERSONAL BLOG </h1>
                    <h3>@SANIT PATIL</h3>
                </div>
            </div>
            <div className='w-full h-[100%]'>
                <img src={LoadingImg} alt="loader-image"
                className=' '
                />
            </div>
            
        </div>
    
  )
}

export default Loader