import React from 'react'
import ImcLogo from '../assets/imc.png'

function Navbar() {
  return (
    <div className='z-50 absolute w-full bg-blue-950/50 text-white'><header className="" >
    <div className=" px-4 py-6">
      <div className="flex items-center justify-evenly">
        <a href="/" className="flex items-center">
          <img src={ImcLogo} alt="Indore Municipal Corporation Logo" className="h-16 w-16" />
          <span className="text-2xl font-bold text-orange-400 ml-4">
            INDORE MUNICIPAL CORPORATION
          </span>
        </a>
        <nav className="flex space-x-6  font-bold">
          <a href="#" className="active:text-orange-200 hover:text-orange-500  text-shadow ">About</a>
          <a href="#" className="active:text-orange-200 hover:text-orange-500  text-shadow ">Online Services</a>
          <a href="#" className="active:text-orange-200 hover:text-orange-500  text-shadow ">Schemes</a>
          <a href="#" className="active:text-orange-200 hover:text-orange-500  text-shadow ">Explore the City</a>
          <a href="#" className="active:text-orange-200 hover:text-orange-500  text-shadow ">Information</a>
          <a href="#" className="active:text-orange-200 hover:text-orange-500  text-shadow ">Contacts / Helplines</a>
         
        </nav>
      </div>
    </div>
  </header>
</div>
  )
}

export default Navbar