import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import Container from '../container/Container'
import { toggleTheme } from '../../store/themeSlice'
import day from '/images/day-mode.png'
import night from '/images/night.png'

function Header() {
    const authStatus = useSelector((state)=>state.auth.loginStatus)
    const userData = useSelector((state)=> state.auth.userData)
    const [light,setLight] = useState(true)
    const navigate = useNavigate();
    const theme = useDispatch()
    //console.log(light);
    
     
    const updateTheme = ()=>{
        if(light){
            theme(toggleTheme('light'))
        }else{
            theme(toggleTheme('dark'))
        }
    }
    useEffect(()=>{
        updateTheme();
    },[light])
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
      <div className='font-bold flex justify-between'>
        <span className=' rounded border-blue-800 relative group'>
            {authStatus && 
        <h1 className=' cursor-pointer rounded-full border-2 p-2 border-purple-900'>
        {userData.name }  
        <div className='absolute hidden group-hover:block w-28 text-white  rounded'>
        {
        authStatus && (
            <div className=' bg-neutral-200 border-none rounded text-center'>
                <button
                onClick={()=> navigate('/update-profile')}
                 className='p-1 w-full text-blue-900 font-bold hover:text-red-900 hover:bg-gray-900 '>Profile</button>
               <LogoutButton className='p-1 w-full text-blue-900 font-bold hover:text-red-900  hover:bg-gray-900 '/>
            </div>
            )
        }
           
        </div>
        

        </h1> 
        
        }
        </span>
        <div className=''>
            <ul className='flex'>
                {navItem.map((nav)=>(
                    nav.active ? (
                        <li 
                        key={nav.name}
                        className='p-2 pr-4  rounded hover:border-b-2 border-blue-800'><Link to={nav.slug}>{nav.name}</Link></li>
                    ):null
                ))}
                
                <div className='flex justify-center rounded-full w-12 hover:border bottom-b-2'>
                <button
                onClick={()=>setLight((prev)=> !prev)}
                >   {light ? 
                    
                   <img src={night}  className='w-6 text-center'/>:
                    <img src={day}  className='w-6'/>
                    }
                    
        
                </button>
                </div>
            </ul>
        </div>
      </div>
    </Container>
  )
}

export default Header