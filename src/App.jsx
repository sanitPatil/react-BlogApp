import Header from "./Components/Header/Header"
import Footer from "./Components/Footer/Footer"
import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import authService from "./Appwrite/auth"
import { login, logout } from "./store/authSlice"
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
  return loading ?
   <div> ...loading</div>
  : 
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  
}

export default App
