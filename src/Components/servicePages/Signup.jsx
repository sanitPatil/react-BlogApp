import React from 'react'
import { useForm } from 'react-hook-form'
import {Input, Button, Label} from "../../Components/Elements/index"
function Signup() {
    const {register,onSubmit} = useForm();

    const signup = ()=>{

    }
  return (
    <div className='full'>
        <Label>Create Account</Label>
        <form onSubmit={onSubmit(signup)}>
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