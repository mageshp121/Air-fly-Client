import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const userData = useSelector((store) => {
    return store.user.userData;
  });
 console.log("user Dasta",userData);
return (
<>
 <header className="">
    <div className="px-4  p-12 mx-auto sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 lg:h-20">
        <div className="flex-shrink-0">
          <a href="#" title="" className="flex">
            <img
              className="w-auto h-8"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/2/logo.svg"
              alt=""
            />
          </a>
        </div>
        <button
          type="button"
          className="inline-flex p-1 text-black transition-all duration-200 border border-black lg:hidden focus:bg-gray-100 hover:bg-gray-100"
        >
          {/* Menu open: "hidden", Menu closed: "block" */}
          <svg
            className="block w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
          {
            userData?._id ? (<span className="items-center hover:-translate-y-1 transition-all duration-500 justify-center hidden px-2 py-3 w-36 ml-10 text-base font-semibold text-white  shadow-lg bg-black border border-transparent rounded-lg lg:inline-flex">Your live now</span>):(<Link to={"/register"}  className="items-center hover:-translate-y-1 transition-all duration-500 justify-center hidden px-2 py-3 w-36 ml-10 text-base font-semibold text-white  shadow-lg bg-black border border-transparent rounded-lg lg:inline-flex">Register</Link>
            )
          }
        </div>
      </div>
    </div>
  </header>

    
    </>
  );
};
export default Navbar