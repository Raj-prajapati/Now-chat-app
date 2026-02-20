import React from 'react'
import { useChatStore } from '../../store/chatStore.js';
import {useSocketStore}from "../../store/scoketStore.js"


const ChatHeader = () => {
   

  const {selectedUser}=useChatStore();
  const onlineUsers = useSocketStore((s) => s.onlineUsers);

  const isOnline=onlineUsers.includes(selectedUser._id)
  
 
  return (
    <div className='bg-base-200  mt-1.5 mx-6 h-17 flex items-center px-4 border-2 border-neutral rounded-xl shadow-sm ml-4'>
     
     <img
        src={selectedUser.profilePic || "/avatar.png"}
        alt={selectedUser.fullname}
        className="w-13 h-13 rounded-full object-cover"
      />
       
       <div className=' flex flex-col ml-8 '>
        <span className='text-lg font-semibold font-stretch-expanded'>{selectedUser.fullname}</span>
        {isOnline? <span className='ml-1 text-green-500'>Online</span>: <span className='ml-1'>Offline</span> }
       </div>

    </div>
  )
}

export default ChatHeader