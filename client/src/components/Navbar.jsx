import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const {logout,userDetails} = useContext(AuthContext)
  const [showAvatarOptions,setShowAvatarOptions] = useState(false)
  const [searchWord,setSearchWord] = useState("")
  const handleSearchSubmit = (e) => {
    e.preventDefault()
  }
  useEffect(()=>{
    //console.log(userDetails)
  },[])
  return (
    <div className="w-screen bg-white border-b drop-shadow sticky top-0 left-0 z-20">
      <div className="w-[1200px] mx-auto py-4 flex items-center justify-between">
        <Link to='/'>
          <h1 className="text-2xl font-bold text-slate-600">Narrato</h1>
        </Link>
        <ul className="flex gap-4 items-center text-sm text-slate-600">
          <li className="border border-slate-300 p-2 rounded-lg flex items-center gap-2">
            <span className="opacity-50">
              <FaSearch />
            </span>
            <form onSubmit={handleSearchSubmit}>
              <input
                placeholder="Search"
                className="bg-transparent focus:outline-none"
                onChange={(e)=>setSearchWord(e.target.value)}
              />
            </form>
          </li>
          <Link to="/">
            <li className="hover:bg-slate-200 rounded-md p-2 font-semibold ">Home</li>
          </Link>
          <Link to="/about">
            <li className=" hover:bg-slate-200 rounded-md p-2 font-semibold">About</li>
          </Link>
          <Link to="/categories">
            <li className="hover:bg-slate-200 rounded-md p-2 font-semibold ">Categories</li>
          </Link>
          <Link to="/create">
            <li className="border border-slate-300 bg-transparent  py-2 px-4 rounded-md hover:bg-slate-200 flex items-center gap-2 font-semibold">
              <FaRegEdit />
              Write
            </li>
          </Link>
          <div className="relative group">
            <li className="text-2xl  hover:bg-slate-200 rounded-full p-2 cursor-pointer" onMouseEnter={()=>setShowAvatarOptions(true)} onMouseLeave={()=>setShowAvatarOptions(false)}>
              <FaRegUserCircle className="opacity-70"/>
              {showAvatarOptions && <div className="absolute top-10 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden flex flex-col text-sm font-semibold opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-transform duration-300 ease-in-out delay-100"><Link to='/profile'><p className="px-8 py-2 border-b hover:bg-slate-200">Profile</p></Link><button onClick={()=>logout()} className="px-8 py-2 border-b hover:bg-slate-200">Logout</button></div>}
            </li>
            </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
