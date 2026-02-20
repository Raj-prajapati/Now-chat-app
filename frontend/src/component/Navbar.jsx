import React, { Profiler, useState } from "react";

import { Link } from "react-router-dom";
import { CircleUser, Settings, LogOut } from "lucide-react";
import useAuthStore from "../store/authStore.js";

import { Search, Send, CircleUserRound, LogIn } from "lucide-react";
import LogoutButton from "./LogoutButton.jsx";
import { useChatStore } from "../store/chatStore.js";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  

 
  



  return (
    <div className="navbarmain    h-[10vh] w-full flex items-center px-5 rounded-2xl bg-base-300 text-base-content border border-base-content">
      <div className="navcontent h-full w-1/5 flex items-center gap-1">
        <Link to={"/"}>
          <Send className="h-[30px] w-[30px] text-base-content" id="logo" />
        </Link>
        <h2 className=" text-lg text-base-content font-bold">NowChat</h2>
      </div>
      {!authUser && (
        <Link to="/login" className="ml-auto">
          <span className="flex items-center gap-2 cursor-pointer bg-base-100 px-4 py-2 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-base-300 border border-primary">
            <LogIn size={18} />
            Login
          </span>
        </Link>
      )}

      {authUser && (
        <>
        

          <div className="flex items-center ml-auto gap-8">
            <Link
              to={"/profile"}
              className="flex justify-center items-center gap-1 shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-base-300 border border-primary px-3 py-1.5 rounded-xl"
            >
              <CircleUser size={28} className=" text-base-content " id="logo" />
              Profile
            </Link>

            <Link
              to={"/settings"}
              className="flex justify-center items-center gap-1 shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-base-300 border border-primary px-4 py-1.5 rounded-xl"
            >
              <Settings className="size-7" />
              Settings
            </Link>

            <LogoutButton />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
