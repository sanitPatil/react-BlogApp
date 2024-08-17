import React from 'react'
import {logout} from "../../store/authSlice"
import authService from "../../Appwrite/auth"
import { useDispatch } from 'react-redux'
function LogoutButton() {
  const dispatch = useDispatch();
  const handleLogout =  ()=>{
    const res = authService.logout();
    if(res){
      dispatch(logout())
    }
  }
  return (
    <div>
      <button className=''
      onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  )
}

export default LogoutButton