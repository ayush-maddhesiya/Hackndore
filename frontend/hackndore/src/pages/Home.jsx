// LoginVideoComponent.js
import React, { useState } from "react";
import BgVideo from "../assets/background3.mp4";
import Footer from "../components/Footer";
import Login from "./Login";
import Signup  from "./Signup";
import Adminsignup from "./Adminsignup";

const Home = () => {
    const [login, setLogin] = useState(1);
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
          <source src={BgVideo} type="video/mp4" />
        </video>

        {/* Login Form with Glassmorphism Effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/40 shadow-2xl text-white text-shadow font-extrabold rounded-lg py-5 my-10  w-1/2">
          <ul className="flex gap-5 justify-center w-10/12 mx-auto text-2xl">
            <li className=" active:text-orange-200 hover:text-orange-500  text-shadow cursor-pointer " onClick={() => setLogin(1)}> user login</li>
            <li className=" active:text-orange-200 hover:text-orange-500  text-shadow cursor-pointer " onClick={() => setLogin(2)}>  user sign up </li>
            <li className=" active:text-orange-200 hover:text-orange-500  text-shadow cursor-pointer " onClick={() => setLogin(3)}>  admin login </li>
          </ul>
          {/* form container starts here  */}
          {login === 1 ? <Login /> : login === 2 ? <Signup /> : <Adminsignup />}

          {/* form container ends here */}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
