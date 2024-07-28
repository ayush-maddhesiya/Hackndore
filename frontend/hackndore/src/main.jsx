import React from 'react'
import ReactDOM from 'react-dom/client'

import Home from './pages/Home2'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import User from './pages/User'
import Admin from './pages/Admin'
import ReportIrregularities from './pages/ReportIrregularities'
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
  {
    path: "/admin/report",
    element: <ReportIrregularities/>,
   
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router}/>

)