import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Input, Button, Label} from "../../Components/Elements/index"
import authService from '../../Appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
function Signup() {
    const {register,handleSubmit} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [errorMessage,setErrorMessage] = useState("")
    const signup = async (data)=>{
      try{
        setErrorMessage("")
        const newUser =await authService.createAccount(data);
        if(newUser){
          const userData = await authService.getCurrentLoginUser();
          if(userData) dispatch(login(userData))
            navigate('/')
        }

      }catch(error){
        setErrorMessage(error.message)
      }
    }
  return (
    <div className='full'>
        <Label>Create Account</Label>
        <form onSubmit={handleSubmit(signup)}>
            <Input 
            type="text"
            label="Full Name"
            placeholder="Enter Full Name"
            {...register("name",{
                required:true,
            })}
            />
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
            >Create Account</Button>
        </form>
    </div>
  )
}

export default Signup