

import {create} from "zustand"
import {io, Socket} from "socket.io-client"

export const useSocketStore= create((set,get)=>({
    socket: null,
   onlineUsers: [],


  connectSocket:(userId)=>{
   if(get().socket) return
    const socket = io("http://localhost:3000", {
      query: { userId},  
      });

    
    socket.on("connect",()=>{
    // console.log("Socket connected:", socket.id);
     set({socket:socket})
     socket.emit("add-user", userId); 
      
    })
    socket.on("online-users",(users)=>{
       
      set({onlineUsers:users})
    })

  },
  
  disconnectSocket:()=>{
    const socket=get().socket
    if(!socket) return

    socket.off("online-users")
    socket.disconnect()

    set({socket:null,onlineUsers:[]})
  }
  
  
})) 