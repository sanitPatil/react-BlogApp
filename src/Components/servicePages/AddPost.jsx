import { Button, Input, RTE, Select } from '../Elements';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import appwriteService from "../../Appwrite/config"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from "./../container/Container"
function AddPost({post}) {
  const navigate = useNavigate();
  const userData = useSelector((state)=> state.auth.userData);
  const {register,handleSubmit,watch,setValue,getValues,control} = useForm({
    defaultValues:{
        title:post?.title || '',
        slug:post?.$id ||'',
        content:post?.content ||'',
        status:post?.status ||"active",

    }
  });
  const submit = async(data)=>{
    if(post){
      const file = data?.image[0] ? await appwriteService.uploadFile(data?.image[0]):null;

      if(file){
        await appwriteService.deleteFile(post?.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post?.$id,{
        ...data,
        featuredImage:file? file.$id:undefined
      });

      if(dbPost){
        navigate(`/post/${dbPost.$id}`);
      }
    }else{
      const file = data.image[0];
      if(file){
        const resFile = await appwriteService.uploadFile(file);

        if(resFile){
          const fileId = resFile.$id;
          data.featuredImage = fileId;
          const dbPost = await appwriteService.createPost({
            ...data,
            userID:userData.$id
          })

          if(dbPost){
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    }
  }


  const slugTransform = useCallback((value)=>{
    if(value && typeof value === "string")
          return value  
                 .trim()
                 .toLowerCase()
                 .replace(/[^a-zA-Z\d\s]+/g, "-")
                 .replace(/\s/g, "-");
  },[])

  useEffect(()=>{
    const subscription = watch((value,{name})=>{
      if(name === "title")
          setValue("slug", slugTransform(value.title), {shouldValidate:true})
    })

    return ()=> subscription.unsubscribe();
  },[watch,setValue,slugTransform])
  return (
    <Container>
      <h1 className='text-center text-4xl text-bold  dark:bg-slate-900 dark:text-slate-50 font-extrabold rounded p-2 m-2 '>{post ?"Update Post":"Create Post"}</h1>
      <form onSubmit={handleSubmit(submit)}>
      <div className='grid  grid-cols-2 gap-4 '>
        <div className='justify-center'>
        <Input
        type="text"
        label="title"
        placeholder="title for your post"
        {...register("title",{
          required:true
        })}
        />
        <Input
        type="text"
        label="slug"
        disabled="true"
        placeholder="slug id will generated"
        {...register("slug",{
          required:true
        })}
        onInput={
          (e)=>{
            setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate:true})
          }
        }
        />
        <RTE 
        
        control={control} label="content: " name="content" defaultValue={getValues("content")}/>
       
        </div>
        
       <div className='text-center p-12 '>
       
       <Input
          label="Featured Image :"
          type="file"
          className=" text-xl "
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
       <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="text-xl font-bold p-2 m-2"
                    {...register("status", { required: true })}
                />
       <Button
        type='submit'
        bgColor='bg-blue-500'
        className='w-[50%] mt-12 bg-blue-600  text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600'
        >
          {post ?"Update":"Submit"}

        </Button>
    </div>
    
       </div>
       
    </form>
    </Container>
  )
}

export default AddPost