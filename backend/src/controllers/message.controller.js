import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "cloudinary"
import { io, getReceiverSocketId } from "../socket.js";


export const  getUsersSidebar=async (req,res) => {
    try {
        const loggedinUser=req.user._id;

    const users=await User.find({_id: {$ne:loggedinUser}}).select("-password")
    // console.log(users.length);
    
    res.status(200).json(users)

    } catch (error) {
        console.log("error in finding users for sidebar "+error.message);
        res.status(500).json({message:"internal server error "})
        
    }
}



export const getMessages = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, recieverId: id },
        { senderId: id, recieverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getting messages " + error.message);
    res.status(500).json({ message: "internal server error" });
  }
};


export const sendMessage=async (req,res) => {
   try {
     const{text,image}=req.body
    const senderId=req.user._id
    const {id}=req.params

    let imageUrl;
    if(image){
        const uploadResponse= await cloudinary.uploader.upload(image)
        imageUrl=uploadResponse.secure_url;
        

    }

    const newMessage=new Message({
        senderId:senderId,
        recieverId:id,
        text:text,
        image:imageUrl
    })
    
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(String(id));

    //  console.log(" receiverSocketId:", receiverSocketId);


if (receiverSocketId) {
  io.to(receiverSocketId).emit("newMessage", newMessage);
}
    res.status(200).json(newMessage)
   } catch (error) {
    console.log("error in new message "+error.message);
    res.status(500).json({message:"internal server error"})
    
   }
}