// import React, {useEffect, useState} from 'react'
// import appwriteService from '../Appwrite/config';
// import PostCard from "../Components/servicePages/PostCard";
// import { useSelector } from 'react-redux';

// function Home() {
//     const [posts, setPosts] = useState([])
//     const isLogin = useSelector(state=> state.auth.loginStatus)
//     useEffect(() => {
//         appwriteService.getAllPost().then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     }, [])
  
//     if (posts.length === 0) {
//         return (
//             <div className="w-full py-8 mt-4 text-center">
                
//                     <div className="flex flex-wrap">
//                         <div className="p-2 w-full">
//                             <h1 className="text-2xl font-bold hover:text-gray-500">
//                                 {
//                                     isLogin ?"No post! Add Post":"Login to read posts"
//                                 }
//                             </h1>
//                         </div>
//                     </div>
                    
//             </div>
//         )
//     }
//     return (
//         <div className='w-full py-8'>
            
//                 <div className='flex flex-wrap'>
//                     {posts && posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>
//                     ))}
//                 </div>
                
//         </div>
//     )
// }

// export default Home


import React from 'react'
import LoadingImg from "/images/LoadingImage.png"
function Home() {
  return (
    <div className='w-full bg-slate-200 grid grid-cols-2 pt-1 dark:bg-slate-900 dark:text-slate-50 '>
            <div className='w-full h-[100%]'>
                <div className='grid place-items-center h-screen pr-8 text-blue-500'>
                    <h1 className='pl-28 mt-20  text-blue-700 text-7xl font-extrabold'>THE BLOG - PERSONAL BLOG </h1>
                    <h3>@SANIT PATIL</h3>
                </div>
            </div>
            <div className='w-full h-[100%] '>
                <img src={LoadingImg} alt="loader-image"
                className=' '
                />
            </div>
            
        </div>
  )
}

export default Home