import {Header,Footer,authService,Heading} from "./index"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { login, logout } from "./store/authSlice"
import { toggleTheme } from "./store/themeSlice"
import './App.css'

function App() {
  
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
    document.querySelector('#root').classList.remove("light", "dark")
    document.querySelector('#root').classList.add(themeValue)
  },[themeValue])
  
  
  return(
       
    <div className="">
      <Header/>
        <Heading />
        <Outlet/>
        <Footer/>
    </div>
    
  ) 
  
}

export default App
