import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import authService from "./Appwrite/auth"
import { login, logout } from "./store/authSlice"
import Heading from "./Components/Header/Heading"
import { toggleTheme } from "./store/themeSlice"
import './App.css'
function App() {
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  const themeValue = useSelector(state=> state.theme.mode);

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

  // THEME 
  useEffect(()=>{
    const storedTheme = localStorage.getItem("theme");
    if(storedTheme){
      dispatch(toggleTheme(storedTheme))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("theme",themeValue)
  },[themeValue])
  
    
  useEffect(()=>{
    document.querySelector('#root').classList.remove("light", "dark")
    document.querySelector('#root').classList.add(themeValue)
    
   console.log(themeValue);
   
  },[themeValue])
  
  return(
    <div className="">
    {loading ? (
      <div>
        <Header/>
        
        <Footer/>
      </div>
    ):
    <div className="">
      <Header/>
        <Heading />
        <Outlet/>
        <Footer/>
    </div>
    }
    </div>
  ) 
  
}

export default App
