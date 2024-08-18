import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import Container from '../container/Container'
function Header() {
    const authStatus = useSelector((state)=>state.auth.loginStatus)
    const userData = useSelector((state)=> state.auth.userData)
    const navigate = useNavigate();
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
       <div className='grid grid-cols-2 gap-2'>
            <div>
                <div className=''>
                    <span className='hover:hover:text-black/50 p-2 rounded-2xl pt-1 text-xl font-bold'>{
                    authStatus &&
                    userData.name}</span>
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
                            className='hover:text-black/50  border-b-2  '
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
                        <li>
                            <LogoutButton/>
                        </li>
                    )
                }
                <button>
                    Dark:Light
                </button>
                </ul>
            </div>
            </div>
       </div>
    </Container>
  )
}

export default Header