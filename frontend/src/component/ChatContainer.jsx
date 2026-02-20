import React, { useEffect } from 'react'
import ChatHeader from './chat/ChatHeader'
import MessageInput from './chat/MessageInput'
import ChatMessage from './chat/ChatMessage'
import { useChatStore } from '../store/chatStore'



const ChatContainer = () => {
const {selectedUser,getMessages}=useChatStore();

useEffect(()=>{
  if(selectedUser) {
    getMessages(selectedUser._id)}
    
},[selectedUser])


  return (
    <div className='flex flex-col h-full bg-base-100'>
     <ChatHeader/>
      <ChatMessage/>
      <MessageInput/>
    </div>
  )
}

export default ChatContainer