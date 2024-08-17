import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'
function Header() {
    const authStatus = useSelector((state)=>state.auth.loginStatus)
    const userData = useSelector((state)=> state.auth.userData)
    const navItem = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
  return (
    <div className='w-full'>
        <div className='grid grid-cols-2'>
            <div className='col-span-1'>
                {/* Logo */}
            </div>
            <div className='col-span-1'>
                {
                    navItem.map((item)=>(
                        item.active ?
                        (
                            <li key={item.name}>
                                <button
                                onClick={()=>Navigate(item.slug)}
                                >
                                    {item.name}
                                </button>
                            </li>
                        )
                        :null
                    ))
                }
                {
                    authStatus && (
                        <li>
                            <LogoutButton/>
                        </li>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Header