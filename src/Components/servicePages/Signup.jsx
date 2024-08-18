import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Input, Button, Label} from "../../Components/Elements/index"
import authService from '../../Appwrite/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import Container from "./../container/Container";
import { Link } from 'react-router-dom';
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
    <Container>
      <div className=' grid place-items-center z-10'>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10 border-b ">
          <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
  
        <form onSubmit={handleSubmit(signup)} className='mt-6'>
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
            label="Email" 
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
            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600'
            >Create Account</Button>
        </form>
      </div>
      <p className="mt-2 text-center text-black/60 text-xl">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline text-blue-600 "
                    >
                        Login
                    </Link>
        </p>
        
      </div>
      
    </Container>
    


  )
}

export default Signup

