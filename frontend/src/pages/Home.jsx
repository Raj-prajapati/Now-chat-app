import React from 'react'

import { SideBar } from '../component/SideBar'
import Navbar from '../component/Navbar'
import { useChatStore} from "../store/chatStore.js"
import NoChatSelected from '../component/NoChatSelected'
import ChatContainer from '../component/ChatContainer'

 const Home = () => {

  const {selectedUser}=useChatStore();
  return (

<div className="h-screen w-full bg-base-200">
   <Navbar/>
      <div className="w-full pt-2 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl h-[calc(100vh-5rem)]">
          <div className=" grid grid-cols-[27%_1fr] h-full gap-5 w-full">
            <div className="bg-base-100  rounded-lg h-full overflow-hidden">
              <SideBar />
            </div>

             <div className="bg-base-100 rounded-lg shadow h-full overflow-hidden">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



export default Home
