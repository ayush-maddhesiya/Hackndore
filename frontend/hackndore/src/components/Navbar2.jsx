import React from 'react'
import Imc from "../assets/imc.png"
import Profile from './Profile.jsx'

function Navbar2() {
  return (
    <>
    <div  className='bg-blue-500 w-full h-32 flex justify-between items-center roboto-regular  px-8'>
        <div className='flex justify-center items-center gap-4'>
        <img src={Imc} className='h-24 w-24 p-' alt="" />
        <ul className='text-white font-bold text-2xl flex justify-center items-center gap-4'>
            <li>water tax</li>
            <li>property tax</li>
            <li>garbage tax </li>
        </ul>
        </div>
        <Profile/>
    </div>
    </>
  )
}

export default Navbar2