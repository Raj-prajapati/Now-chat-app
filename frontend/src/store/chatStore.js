import {create} from "zustand";
import toast from "react-hot-toast";
import axiosIntance from "../utils/axios.js";
import axios from "axios";
import { useSocketStore } from "./scoketStore.js";

export const useChatStore=create((set,get)=>({
  messages:[],
  users:[],
  selectedUser: null,
  isUserLoading:false,
  isMessagesLoading:false,


  getUsers: async () => {
    set({isUserLoading:true})
    try {
        const res=await axiosIntance.get("/messages/users")
        // console.log(res.data.length);
        set({users:res.data}); 
        
        
    } catch (error) {
         toast.error(error.response.data.message)
    } finally{
        set({isUserLoading:false})
    }
  }, 

  sendMessages:async (messageData) => {
    const{messages,selectedUser}=get();
    if (!selectedUser) return;

    try {
        const res= await axiosIntance.post(`/messages/send/${selectedUser._id}`,messageData)
        set({messages:[...messages,res.data]})

    } catch (error) {
           toast.error(
      error.response?.data?.message || "Failed to send message"
    );
    }
  },

   getMessages: async (userid) => {
    set({isMessagesLoading:true})
    try {
        const res=await axiosIntance.get(`/messages/${userid}`)
        set({messages:res.data});

       

    } catch (error) {
         toast.error(error.response.data.message)
    } finally{
        set({isMessagesLoading:false})
    }
  },

   addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  
  listenToMessages: () => {
    const socket = useSocketStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (message) => {
       console.log("🔥 RECEIVED:", message);
      const selectedUser = get().selectedUser;

      
      if (!selectedUser) return;

        const isMessageForCurrentChat =
    String(message.senderId) === String(selectedUser._id) ||
    String(message.recieverId) === String(selectedUser._id);

      if (!isMessageForCurrentChat) return;

      get().addMessage(message);
    });
  },

 
  stopListeningToMessages: () => {
    const socket = useSocketStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
  },

    setSelectedUser: (selectedUser) => set({ selectedUser }),


}))
