import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import Store from "./store/Store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  AddPost, AllPost, Post, Login, Signup, EditPost, Home
} from "./pages/index.js"


const router = createBrowserRouter(
  [{
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:'/all-post',
        element:<AllPost/>
      },
      {
        path:'/add-post',
        element:<AddPost/>
      },
      {
       path:'/edit-post/:slug',
       element:<EditPost/>
      },
      {
        path:'/post-edit/:slug',
        element:<EditPost/>

      },
      {
        path: "/post/:slug",
        element: <Post />,
    },
      
    ]
    }
  ]
)





createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <RouterProvider router={router} />
    
  </Provider>,
)
