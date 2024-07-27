import React from 'react'
import ReactDOM from 'react-dom/client'

import Home from './pages/Home'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import User from './pages/User'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
   
  },
  {
    path: "/user",
    element: <User/>,
   
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router}/>

)