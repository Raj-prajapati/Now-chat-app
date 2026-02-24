import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const protectRoute=async (req,res,next) => {
    try {
        const token=req.cookies.token

        if(!token){
            return res.status(401).json({message:"Unauthorizes - invalid user"})
        }

        const veryfiedToken=jwt.verify(token,process.env.JWT_SECRET)

          if(!veryfiedToken){
            return res.status(400).json({message:"Unauthorizes - invalid user"})
        }

       const user = await User.findById(veryfiedToken.userid).select("-password");


        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        req.user=user

        next();
    } catch (error) {
        console.log("error in update middleware");
        
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}