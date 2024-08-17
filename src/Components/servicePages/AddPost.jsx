import { Button, Input, RTE, Select } from '../Elements';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import appwriteService from "../../Appwrite/config"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
    <form onSubmit={handleSubmit(submit)}>
      <div>
        <Input
        type="text"
        label="title"
        {...register("title",{
          required:true
        })}
        />
        <Input
        type="text"
        label="slug"
        {...register("slug",{
          required:true
        })}
        onInput={
          (e)=>{
            setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate:true})
          }
        }
        />
        <RTE control={control} label="content: " name="content" defaultValue={getValues("content")}/>
        <Input
        type="file"
        className=''
        accept="image/png, image/jpeg image/gif"  
        />
        
        <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
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
                    className="mb-4"
                    {...register("status", { required: true })}
                />
        <Button
        type='submit'
        bgColor='bg-blue-500'
        className=''
        >
          {post ?"Update":"Save"}

        </Button>
    </div>
    </form>
  )
}

export default AddPost