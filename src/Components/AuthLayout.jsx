import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function AuthLayout({children, authentication=true}) {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true)
    const authStatus = useSelector(state => state.auth.loginStatus)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate('/login')
        }else if(!authentication && authStatus !== authentication){
            navigate('/')
        }
        setLoading(false)
    },[authentication,navigate,authStatus])
  return loading ?
    <h1>Loading</h1>
  :<div>
  {children}
</div>
}

export default AuthLayout