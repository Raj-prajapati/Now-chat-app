import { create } from "zustand";
import axiosInstance from "../utils/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";
import { set } from "zod";
import { persist } from "zustand/middleware";


baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/";

const useAuthStore = create( persist(
  (set, get)=>{
  
     return {
    
    isSigningUp: false,
    isLogingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    authUser:null,

    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
       
        set({ authUser: res.data });
      } catch (error) {
        console.log("error in checkauth react " + error.message);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    signUp: async (data) => {
      set({ isSigningUp: true });
      try {
        const res = await axiosInstance.post("/auth/signup", data);
        set({ authUser: res.data });
        toast.success("Account created successfully");
      } catch (error) {
        const message = error?.response?.data?.message || "Signup failed";
        toast.error(message);
      } finally {
        set({ isSigningUp: false });
      }
    },

    logOut: async () => {
  try {
     await axiosInstance.post("/auth/logout")
    set({authUser:null})
    toast.success("Logout successfull")
  } catch (error) {
    console.log("error in logout react")
    toast.error(error?.response?.data?.message || "Logout failed"
)
  }
},


login: async (formData) => {

 
  try {
    
    const res = await axiosInstance.post("/auth/login", formData);
    set({ authUser: res.data });
    toast.success("Login successful!");
    return true;
  } catch (error) {
    console.log("Error in login:", error.message);
    toast.error(error?.response?.data?.message || "Login failed");
  }
},

 updateProfile :async (data) => {
 try {
     set({isUpdatingProfile:true})
     const res=await axiosInstance.put("/auth/updateProfile",data,{
  headers: { "Content-Type": "multipart/form-data" },})
  
     set({authUser:res.data})
     toast.success("Profile updated successfully")
 } catch (error) {
    console.log("error in updateprofile function frontend authstore"+error.message)
    toast.error(error.response.data.message)
 } finally{
  set({isUpdatingProfile:false})
 }
  
 }
  }},
    {
      name: "auth-storage",

      partialize: (state) => ({
        authUser: state.authUser, 
      }),
    }

))

export default useAuthStore;