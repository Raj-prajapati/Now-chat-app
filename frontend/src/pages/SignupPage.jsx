import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuthStore from "../store/authStore";
import { MessageSquare, Send, User,Lock,Eye,EyeOff, Loader2,  } from "lucide-react";
import { Link } from "react-router-dom";
import ChatAnimation from "../component/ChatAnimation";
import toast from "react-hot-toast";
import React, { useState } from 'react'


 const signupSchema=z.object({
     fullname:z.string().min(2,("Fullname is required")),
     email:z.string().email(("Plases enter a valid email")),
     password:z.string().min(8,("Password must be at least 8 charecters"))
 });

const SignupPage = () => {


  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { signUp, isSigningUp } = useAuthStore();
  
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullname: "", email: "", password: "" },
  });

  


  const onSubmit = async (data) => {
   await signUp({
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    });
};

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex justify-center items-start  ">
        <div className="w-full max-w-md space-y-8 mt-10">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group ">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Send className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started With Your Free Account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="form-control group">
              <label className="label mb-1 ml-3">
                <span className="text-sm font-medium text-white">
                  Full Name
                </span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                  <User className="size-5 text-gray-400 group-focus-within:text-green-500 group-hover:text-green-600 transition-colors duration-200" />
                </div>

                <input
                  {...register("fullname")}
                  type="text"
                  placeholder="John Doe"
                  className="
        w-full pl-10 pr-3 py-3
        bg-zinc-800 text-white
        border-2 border-white 
        rounded-lg
        focus:ring-2 focus:ring-green-300
        hover:ring-1 hover:ring-white
       

        hover:bg-zinc-800 
        focus:bg-zinc-800

        transition-all duration-200
      "
                />
                 {errors.fullname && (
            <p className="text-sm text-red-400 mt-1">{errors.fullname.message}</p>
          )}
              </div>
            </div>


            <div className="form-control group">
              <label className="label mb-1 ml-3">
                <span className="text-sm font-medium text-white">
                  Email
                </span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                  <User className="size-5 text-gray-400 group-focus-within:text-green-500 group-hover:text-green-600 transition-colors duration-200" />
                </div>

                <input
                  {...register("email")}
                  type="email"
                  placeholder="example@gmail.com"
                  
                  className="
        w-full pl-10 pr-3 py-3
        bg-zinc-800 text-white
        border-2 border-white 
        rounded-lg
        focus:ring-2 focus:ring-green-300
        hover:ring-1 hover:ring-white
       

        hover:bg-zinc-800 
        focus:bg-zinc-800

        transition-all duration-200
      "
                />
                 {errors.email && (
            <p className="text-sm text-red-400 mt-1">{errors.fullName.message}</p>
          )}
              </div>
            </div>

         

            <div className="form-control group">
              <label className="label mb-1 ml-3">
                <span className="text-sm font-medium text-white">
                  Password
                </span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                  <Lock className="size-5 text-gray-400 group-focus-within:text-green-500 group-hover:text-green-600 transition-colors duration-200" />
                </div>

                <input
                {...register("password")}
                  type={showPassword?"text" :"password"}
                  placeholder="*********"
                  
                  className="
        w-full pl-10 pr-3 py-3
        bg-zinc-800 text-white
        border-2 border-white 
        rounded-lg
        focus:ring-2 focus:ring-green-300
        hover:ring-1 hover:ring-white
       

        hover:bg-zinc-800 
        focus:bg-zinc-800

        transition-all duration-200
      "
                />
                       {errors.password && (
            <p className="text-sm text-red-400 mt-1">{errors.fullName.message}</p>
          )}

                 <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

             <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
                  
          </form>

          <div className="text-center ">
             <p>
              Already have an account ?

                <span className="ml-3 font-bold text-blue-500 hover:text-green-500">
              <Link to="/login">
              Sign In
              </Link>
              </span>
             </p>
           
          </div>

        </div>
      </div>

      <div className="hidden lg:block">
         <ChatAnimation/>
      </div>
    </div>
  );
};

export default SignupPage;
