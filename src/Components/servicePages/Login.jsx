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
  const {register,handleSubmit} = useForm();
  const [error,setError] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login =async (data)=>{
    setError("")
    try{
      const session = await appwriteService.login(data);
      
      if(session){
        const userData = await appwriteService.getCurrentLoginUser();
        dispatch(authLogin(userData))
        navigate('/')
      }
    }catch(error){
      setError(error.message)
      console.error(error.message);
      
    }
  }
  return (
    
    <Container>

    <div className=' grid place-items-center z-10'>
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10 border-b ">
        <h2 class="text-2xl font-bold text-center text-gray-800">Sign In</h2>
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
    
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-500"
                    >
                        Sign Up
                    </Link>
        </p>
    </div>
    
  </Container>
  )
}

export default Login