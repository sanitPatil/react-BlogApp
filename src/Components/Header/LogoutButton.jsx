import React from 'react'
import {logout} from "../../store/authSlice"
import authService from "../../Appwrite/auth"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function LogoutButton({
  className='',
  props
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    
    const res =await authService.logout();
    
    if(res){
      dispatch(logout())
      navigate('/')
    }
    
  }
  return (
    
      <button
      className={`${className}`}
      {...props}
      onClick={handleLogout}
      >
        Log out
      </button>
  
  )
}

export default LogoutButton