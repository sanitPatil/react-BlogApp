import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import authService from "./Appwrite/auth"
import { login, logout } from "./store/authSlice"
import './App.css'
import Heading from "./Components/Header/Heading"
function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    authService.getCurrentLoginUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    }).finally(()=>{
      setLoading(false)
    })
  },[])
  
  return(
    <div>
    {loading ? (
      <div>
        <Header/>
        
        <Footer/>
      </div>
    ):
    <div>
      <Header/>
        <Heading/>
        <Outlet/>
        <Footer/>
    </div>
    
    }
    </div>
  ) 
  
}

export default App
