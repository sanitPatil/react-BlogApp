import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../../Appwrite/config'
function PostCard({
    $id,
    title,
    featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='m-2 max-w-sm dark:bg-slate-950 bg-white border border-gray-200 rounded-lg shadow hover:bg-slate-100 transition '>
            <div className='rounded-t-lg '>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl dark:text-natural-950 font-bold text-center p-4'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard