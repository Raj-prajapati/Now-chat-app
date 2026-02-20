import { Server } from "socket.io";

let io;
const onlineUsers = new Map();

export const setupSocket = (server) => {
   io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  

  io.on("connection", (socket) => { 
    // console.log("Socket connected:", socket.id);

     socket.on("add-user", (userId) => {
    onlineUsers.set(String(userId), socket.id);
   

    console.log("ONLINE USERS AFTER ADD:", [...onlineUsers.entries()]);
    io.emit("online-users", [...onlineUsers.keys()]);
     
  });
      
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);

      
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("online-users", [...onlineUsers.keys()]);
      // console.log(onlineUsers.keys())
    });

    
  });
   
  return io;
};

export const getReceiverSocketId = (userId) => {
 
  return onlineUsers.get(String(userId));
};

export { io };


