import React from 'react'
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from "../Components/Elements/Input";
import authService from '../Appwrite/auth';
import { login } from '../store/authSlice';
function UpdateProfile() {

  const [activeComponent, setActiveComponent] = useState('Home');
  const handleNavClick = (componentName) => {
    setActiveComponent(componentName);
  };
  const renderComponent = ()=>{
    switch(activeComponent){
      case 'Update Name':return <UpdateName/>;
      case 'Update Email':return <UpdateEmail/>;
      case 'Update Password':return <UpdatePassword/>;
      case 'Update Account':return <UpdateAccount/>
    }
  }

  const navItem = ['Update Name','Update Email','Update Password','Update Account']
  return (
    <div className="flex h-[40vh]">
      <nav className="w-1/5 dark:bg-gray-700 p-2 text-center  bg-neutral-300 text-black dark:text-white">
        <ul>
          {
            navItem && navItem.map((nav)=>(
              <li
              className='w-full p-2 font-bold hover:bg-orange-600 dark:text-white  text-gray-900'
              onClick={() => handleNavClick(nav)}
              >{nav}</li>
            ))
          }
        </ul>
      </nav>
      
      <main className="w-4/5 dark:bg-gray-800 bg-neutral-200 p-4 pl-8">
        <div className='p-5 text-center'>
        {renderComponent()}
        </div>
      </main>
    </div>
  )
}



function UpdateName(){
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.auth.userData)
  const navigate = useNavigate();
  const {register,handleSubmit,setValue} = useForm({
    defaultValues:{
      name:userData.name
    }
  })
  const updateName = async(data) =>{
      try{
          if(data){
              const userData = await authService.updateName(data);
              if(userData){
               //   console.log("reached");
                  dispatch(login(userData))
                  navigate('/')
              } 
          }

      }catch(error){
          console.log(`Error::updateProfile ${error}`);
      }
  }
  return(
    <div>
    <form onSubmit={handleSubmit(updateName)}
         className=''>
            <Input
            className="rounded-lg dark:bg-blue-950 text-2xl w-[80%] p-2 font-bold "
            type="name"
            label="Name" 
            placeholder="Enter new name"
            {...register("name",{
              required:true,
              
            })}
            onChange = {(e)=> setValue('name',e.target.value)}

            />
            
            <button type="submit"
            className='hover:dark:bg-blue-950 p-2 rounded-full w-[20%] text-xl font-bold bg-purple-900 shadow'
            >save</button>
        </form>
    </div>
  )
}


function UpdateEmail(){
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.auth.userData)
  const navigate = useNavigate();
  const {register,handleSubmit,setValue} = useForm({
    defaultValues:{
      email:userData.email
    }
  })
  const updateEmail = async(data) =>{
    try{
        if(data){
            const userData = await authService.updateEmail(data);
            if(userData){
                dispatch(login(userData))
                navigate('/')
            } 
        }
    }catch(error){
        console.log(`Error::updateProfile${error.message}`);
    }
}
  return (
    <div>
    <form onSubmit={handleSubmit(updateEmail)}
         className=''>
            <Input
            className="rounded-lg dark:bg-blue-950 text-2xl w-[80%] p-2 font-bold "
            type="email"
            label="email" 
            placeholder="Enter Your email"
            {...register("email",{
              required:true,
              validate:{
                matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
              }
            })}
            onChange = {(e)=> setValue('email',e.target.value)}

            />
            <Input 
            className="rounded-lg dark:bg-blue-950 text-2xl w-[80%] p-2 font-bold "
            type="password"
            label="password"
            placeholder="Enter Password"
            {...register("password",{
                required:true,
            })}
            />
            <button type="submit"
           className='hover:dark:bg-blue-950 p-2 rounded-full w-[20%] text-xl font-bold bg-purple-900 shadow'
            >save</button>
    </form>
    </div>
  )
}

function UpdatePassword(){
  const dispatch = useDispatch();
  const userData = useSelector(state=>state.auth.userData)
  const navigate = useNavigate();
  const {register,handleSubmit,setValue} = useForm();
  const updatePassword = async(data) =>{
    try{
        if(data){
            const userData = await authService.updatePassowrd(data);
            if(userData){
                dispatch(login(userData))
                navigate('/')
            } 
        }
    }catch(error){
        console.log(`Error::updateProfile${error.message}`);
    }
}
return (
  <div><form onSubmit={handleSubmit(updatePassword)}
         className=''>
            <Input
            className="rounded-lg dark:bg-blue-950 text-2xl w-[80%] p-2 font-bold "
            type="password"
            label="old password" 
            placeholder="Enter Your old password"
            {...register("old password",{
              required:true,
              validate:{
                matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
              }
            })}
            
            />
            <Input 
            type="password"
            className="rounded-lg dark:bg-blue-950 text-2xl w-[80%] p-2 font-bold "
            label="new password"
            placeholder="Enter new Password"
            {...register("new password",{
                required:true,
                validate:{
                    matchPattern:(value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                  }
            })}
            />
            <button type="submit"
            className='hover:dark:bg-blue-950 p-2 rounded-full w-[20%] text-xl font-bold bg-purple-900 shadow'
            >save</button>
</form></div>
)
}

function UpdateAccount(){
  return <div>account</div>
}
export default UpdateProfile