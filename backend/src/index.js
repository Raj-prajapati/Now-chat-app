import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js";
import  messageRoutes from "./routes/message.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import http from "http"
import {setupSocket} from "./socket.js";
import path from "path";


const app=express();
const server = http.createServer(app);

setupSocket(server)

app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
))

dotenv.config();
const port =process.env.PORT
const __dirname=path.resolve()
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit:"10mb",extended:true}));
app.use(cookieParser());


app.use("/api/auth",authRoutes)

app.use("/api/messages",messageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(port,()=>{
    connectDB();
    console.log("server is running on PORT " + port);
    
})