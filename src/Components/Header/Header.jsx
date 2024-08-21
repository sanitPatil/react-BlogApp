import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import Container from '../container/Container'
import { toggleTheme } from '../../store/themeSlice'
import day from '/images/day-mode.png'
import night from '/images/night.png'

function Header() {
    const authStatus = useSelector((state)=>state.auth.loginStatus)
    const userData = useSelector((state)=> state.auth.userData)
    const navigate = useNavigate();
    const [isLight,setIsLight] = useState(false);
    const theme = useDispatch()
    
    const updateTheme = ()=>{
        setIsLight((prev)=>!prev)
        isLight ? theme(toggleTheme("light")):theme(toggleTheme("dark"))
    }

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
        }
    ]
  return (
    <Container>
       <div className='grid grid-cols-2 gap-2 dark:bg-slate-900 dark:text-slate-50 ' >
            <div>
                <div className=''>
                    {authStatus &&
                    <span className='text-xl font-bold p-2 w-24 border-b-2  outline-none hover:bg-gray-900 dark:hover:bg-slate-100 rounded-xl text-blue-500'>
                    {userData.name}
                    </span>
                    }
                </div>
            </div>
            <div>
            <div className='p-2 font-bold text-center '>
                <ul className='flex flex-wrap justify-between '>
                {
                    navItem.map((item)=>(
                        item.active ?
                        (
                            <li key={item.name}
                            className='dark:hover:text-blue-500 duration-75 text-blue-600  border-b-2  '
                            >
                                <button
                                onClick={()=>navigate(item.slug)}
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
                        <li className='rounded-xl p-1 hover:bg-neutral-950 text-blue-600'>
                            <LogoutButton/>
                        </li>
                    )
                }
                <button className='w-10 rounded-full border p-3'
                onClick={updateTheme}
                >
                {
                    isLight ?<div className='text-slate-200'>
                        <img src={day} />
                    </div>:<div className='text-black'>
                    <img src={night} />
                    </div>
                }
                </button>
                </ul>
            </div>
            </div>
       </div>
    </Container>
  )
}

export default Header