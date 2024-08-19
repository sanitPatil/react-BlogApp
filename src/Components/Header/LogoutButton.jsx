import React from 'react'
import {logout} from "../../store/authSlice"
import authService from "../../Appwrite/auth"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function LogoutButton() {
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
    <div className=''>
      <button className=''
      onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  )
}

export default LogoutButton