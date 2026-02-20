
import "./App.css"
import{BrowserRouter,Routes,Route, Navigate}from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import SettingsPage from "./pages/SettingsPage"
import SignupPage from "./pages/SignupPage"
import  useAuthStore  from './store/authStore'
import React, { useEffect } from "react";
import { Loader } from "lucide-react"
import {Toaster} from "react-hot-toast"
import { useThemeStore } from "./store/themeStore"
import  socket  from "./socket.js"
// import { useOnlineUsers } from "./store/onlineUsers";
import { useSocketStore } from "./store/scoketStore.js" 




const App = () => {

  const {connectSocket, disconnectSocket,onlineUsers}=useSocketStore();

   const theme=useThemeStore((state)=>{
       return state.theme;
  })
  
  useEffect(()=>{
       document.documentElement.setAttribute("data-theme", theme);
  },[theme])

  const {checkAuth,authUser,isCheckingAuth,}=useAuthStore();

  useEffect(() => {
    checkAuth();
     
  }, [checkAuth])


useEffect(() => {
  if (authUser?._id) {
    connectSocket(authUser._id);
  }
  return () => {
    disconnectSocket();
  };
}, [authUser]);

  
  if(isCheckingAuth ){
      return (
        <div className="flex items-center justify-center">
          <Loader className="size-10  animate-spin"/>
        </div>
      )
  }
  
 
  return (
    <div className=' appmain' >
    
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path="/login" element={<Login />} />
     <Route path="/Profile" element={authUser ?<Profile /> : <Navigate to={"/login"}/>} />
     <Route path='/settings' element={<SettingsPage/>}/>
     <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to={"/"}/>}/>
        <Route path='/another' element={!authUser?<SignupPage/>:<Navigate to={"/"}/>}/>
     
    </Routes>
    </BrowserRouter>
    
     <Toaster/>

     
    
    </div>

  )
}

export default App