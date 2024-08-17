import React, { useEffect, useState } from 'react'
import AddPost from "../Components/servicePages/AddPost"
import { useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../Appwrite/config'
function AddPost() {
  const [post,setPosts] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()


  useEffect(()=>{
    if(slug){
      appwriteService.getPost(slug).then((post)=>{
        if(post){
          setPosts(post)
        }
      })
    }else{
      navigate('/')
    }
  },[slug,navigate])
  
  return post ?(
    <div>
      <AddPost post={post}/>
    </div>
  ):null
}

export default AddPost