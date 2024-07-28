import React, { useState } from "react";
import BgVideo from "../assets/background3.mp4";
import Footer from "../components/Footer";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "../components/Navbar";
import Adminsignup from "./Adminsignup";
import ImcLogo from '../assets/imc.png'

function Home2() {
    const [login, setLogin] = useState(1);
  return (
    <>
      <div className="flex ">
        <div className="w-3/5 h-screen">
          <video
            autoPlay
            loop
            muted
            className=" h-full object-cover"
          >
            <source src={BgVideo} type="video/mp4" />
          </video>
        </div>
        <div className="w-2/5 bg-blue-950 h-screen text-orange-500">
        <div className="flex justify-center py-10 items-center">
        <img src={ImcLogo} alt="Indore Municipal Corporation Logo" className="h-16 w-16" />
          <span className="text-2xl font-bold text-orange-400 ml-4">
            INDORE MUNICIPAL CORPORATION
          </span>
        </div>
          <div className="py-2 capitalize">
            <ul className= " flex justify-center divide-x-2 divide-orange-200 gap-5">
              <li className="px-2 roboto font-bold text-xl cursor-pointer" onClick={() => setLogin(1)} >user login</li>
              <li className="px-2 roboto font-bold text-xl cursor-pointer" onClick={() => setLogin(2)} >user registration </li>
              <li className="px-2 roboto font-bold text-xl cursor-pointer" onClick={() => setLogin(3)} >admin login </li>
            </ul>
          </div>

                <div>
                {login === 1 ? <Login /> : login === 2 ? <Signup /> : <Adminsignup />}
                </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home2;
