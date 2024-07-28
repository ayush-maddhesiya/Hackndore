import React from 'react'
import ReactDOM from 'react-dom/client'

import Home from './pages/Home2'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import User from './pages/User'
import Admin from './pages/Admin'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
   
  },
  {
    path: "/user",
    element: <User/>,
   
  },
  {
    path: "/admin",
    element: <Admin/>,
   
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router}/>

)