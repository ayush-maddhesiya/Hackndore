import React from 'react'
import indoreImg from '../assets/indore.jpeg'

export default function Signup() {
  return (
    <div className="flex items-center justify-center  ">
    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
      <form action="#" method="POST" className="mt-8">
        <div className="space-y-5">
          <div>
            <label htmlFor="name" className="text-base ">
              {" "}
              Full Name{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border-2 border-black bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Full Name"
                id="name"
              ></input>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-base  text-white font-bold"
            >
              {" "}
              Email address{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-white   focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
                id="email"
              ></input>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-base "
              >
                {" "}
                create Password{" "}
              </label>
            </div>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-white   focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="password"
                placeholder="Password"
                id="password"
              ></input>
            </div>
          </div>
          <div>
            <label htmlFor="name" className="text-base ">
              {" "}
              PAN CARD / AADHAR CARD NO{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="PAN CARD / AADHAR CARD NO"
                id="pan/adhar"
              ></input>
            </div>
          </div>
          <div>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Create Account
            </button>
          </div>
        </div>
      </form>
      
    </div>
  </div>
  )
}
