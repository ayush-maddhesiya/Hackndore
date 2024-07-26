// LoginVideoComponent.js
import React from 'react';
import BgVideo from '../assets/background.mp4';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
     <div className="h-screen w-full relative">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src= {BgVideo} type="video/mp4" />
      </video>

      {/* Login Form with Glassmorphism Effect */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/30 rounded-lg  p-8 w-1/2"
      
      >
        <form>
          <input
            type="email"
            placeholder="Email"
            className="block w-full p-2 mb-4 border border-gray-400 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="block w-full p-2 mb-4 border border-gray-400 rounded-lg"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Login
          </button>
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  
<Footer />
    </>
   
  )
};

export default Home;