import React, { useState } from 'react'
import { Button, Input } from '../Elements'
import { useForm } from 'react-hook-form'
import appwriteService from "../../Appwrite/auth"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login as authLogin} from "../../store/authSlice"
import { Link } from 'react-router-dom';
import Container from "./../container/Container"
function Login() {
  const {register,handleSubmit,reset} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const login =async (data)=>{
    try{
      const session = await appwriteService.login(data);
      
      if(session){
        const userData = await appwriteService.getCurrentLoginUser();
        dispatch(authLogin(userData))
        navigate('/')
      }
    }catch(error){
      console.log(error.message);
    }
    reset();
  }
  
  
  return (
    
    <Container>

    <div className=' grid place-items-center z-10 dark:bg-slate-900 dark:text-slate-50'>
    <div className="bg-slate-100 dark:bg-slate-900 dark:text-slate-50 p-14 rounded-lg shadow-lg w-full max-w-md z-10 border-4 dark:border-purple-800 ">
    <p className="mt-2 text-center text-base text-black/60 dark:bg-slate-900 dark:text-slate-50">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500"
                    >
                        Sign Up
                    </Link>
        </p>
        <h2 className="text-2xl font-bold text-center dark:bg-slate-900 dark:text-slate-50 text-gray-900">Sign In</h2>
        <form onSubmit={handleSubmit(login)}>
            <Input
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

            />
            <Input
            type="password"
            label="password"
            placeholder="Enter Your Password"
            {...register("password",{
              required:true,
            })}
            />
            <Button
            type='submit'
            className='pt-4 mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600'

            >Sign In</Button>
        </form>
      
    </div>
    
        
    </div>
    
  </Container>
  )
}

export default Login