import { json } from "express";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const singup = async (req, res) => {
  const { email, fullname, password } = req.body;
  try {
    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ Message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullname,
      password: hashPassword,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);

      return res.status(200).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ Error: "invalid User data" });
    }
  } catch (error) {
    console.log("error in signup controller " + error.message);
    res.status(500).json({ error: "internal server error " });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      const isCorrect = await bcrypt.compare(password, user.password);

      if (isCorrect) {
        generateToken(user._id, res);

        return res.status(200).json({
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          profilePic: user.profilePic,
        });
      } else {
        return res.status(400).json({ message: "invalid credentials " });
      }
    } else {
      return res.status(400).json({ message: "invalid credentials " });
    }
  } catch (error) {
    console.log("error in login " + error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    return res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error while logging out " + error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "Profilepic is required" });
    }
    const uploadResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profilePics" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
      stream.end(req.file.buffer);
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("erorr in updating profile backend" + error.message);
  }
};

export const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in checkauth function", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
