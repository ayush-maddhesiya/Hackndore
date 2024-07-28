import React from 'react'
import Imc from "../assets/imc.png"
import Profile from './Profile.jsx'

function Navbar2() {
  return (
    <>
    <div  className='bg-blue-950 w-full h-32 flex justify-between items-center roboto-regular capitalize  px-8'>
        <div className='flex justify-center items-center gap-4'>
       <div className=''> <img src={Imc} className='h-24 w-24 rounded-full ' alt="" />
       </div>       
        </div>
        <ul className='text-orange-400 font-bold text-lg flex justify-center items-center gap-20'>
            <li>water tax</li>
            <li>property tax</li>
            <li>garbage tax </li>
        </ul>
        <Profile/>
    </div>
    </>
  )
}

export default Navbar2