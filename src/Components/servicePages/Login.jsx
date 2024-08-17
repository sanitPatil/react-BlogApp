import React, { useState } from 'react'
import { Button, Input } from '../Elements'
import { useForm } from 'react-hook-form'
import appwriteService from "../../Appwrite/auth"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {login as authLogin} from "../../store/authSlice"
function Login() {
  const {register,onSubmit} = useForm();
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
    <div>
        <h2>Sign In to Account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <label>{error}</label>}
        <form onSubmit={onSubmit(login)}>
            <Input
            type="email"
            label="email" 
            paceholder="Enter Your email"
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
            className='w-full'
            >Sign In</Button>
        </form>
    </div>
  )
}

export default Login