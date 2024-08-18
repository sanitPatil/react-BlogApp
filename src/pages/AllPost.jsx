import React, { useEffect, useState } from 'react'
import appwriteService from '../Appwrite/config'
import PostCard from '../Components/servicePages/PostCard'
function AllPost() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{},[])
    appwriteService.getAllPost([]).then((post)=>{
        if(post){
            setPosts(post.documents)
        }
    });

  return (
    <div>
        <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
    </div>
  )
}

export default AllPost