import express from "express"
import { checkAuth, login, logout, singup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import multer from "multer";



const upload = multer({ storage: multer.memoryStorage() });


const router =express.Router();



router.post("/signup",singup)

router.post("/login",login)

router.post("/logout",logout)

router.put("/updateProfile",protectRoute,upload.single("profilePic"), updateProfile)

router.get("/check",protectRoute,checkAuth)


export default router;