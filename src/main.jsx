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
import {AuthLayout} from "./index.js"
import UpdateProfile from './Components/UpdateProfile.jsx'
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
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path:'/all-posts',
        element:(
          <AuthLayout authentication>
            <AllPost/>
          </AuthLayout>
          
        )
      },
      {
        path:'/add-post',
        element:(
          <AuthLayout authentication>
            <AddPost/>
          </AuthLayout>
        )
      },
      {
       path:'/edit-post/:slug',
       element:(
        <AuthLayout authentication>
          <EditPost/>
        </AuthLayout>
       )
      },
      {
        path: "/post/:slug",
        element:(
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        )
    },
    {
      path:'/update-profile',
      element:(
        <AuthLayout authentication>
          <UpdateProfile/>
        </AuthLayout>
      )
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
