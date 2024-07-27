import React from "react";
import Navbar2 from "../components/Navbar2";
import avatar from "../assets/avatar.jpg";

function User() {
  return (
    <>
      <Navbar2 />
      <div className="out-container w-11/12 mx-auto bg-slate-300 ">
        <div className="flex py-10">
          <div className="w-3/5">
            <div className="flex justify-between items-center">
              <div >
                    <li>this is a user info</li>
                    <li>this is a user info</li>
                    <li>this is a user info</li>
                    <li>this is a user info</li>
                    <li>this is a user info</li>
              </div>
                    <div>
                         <img src= {avatar} className=" h-40 w-40 rounded-xl" alt="" />
                    </div>
                    
            </div>
                 <div className="flex gap-8 px-4 py-16">
                 <div className="h-24 w-40 text-center flex justify-center items-center rounded-xl   bg-blue-300">water</div>
                 <div className="h-24 w-40 text-center flex justify-center items-center rounded-xl   bg-blue-300">property</div>
                 <div className="h-24 w-40 text-center flex justify-center items-center rounded-xl   bg-blue-300">garbage</div>
                 </div>

                <div className=" w-full mx-2 h-64 bg-black"></div>

          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default User;
