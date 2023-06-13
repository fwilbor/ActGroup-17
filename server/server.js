


import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/uploadimage.js";

import router from "./routes/messages.js";
import multer from "multer";

import urouter from "./routes/user.js";

//import socket from "socket.io";
import http from "http";
import { Server, Socket } from "socket.io";
//import socket from "socket.io";//check this
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//express app
const app = express()
// code for hiding global variables in .env file
dotenv.config()
app.use(cors({ credentials: true }));





const CONNECTION_URL = process.env.MONGO_URI


const PORT = process.env.PORT


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => httpServer.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

//Chat Socket IO Template
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin:["http://localhost:3000"],
        credentials: true,
    },
});
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log("User added:", userId, "Socket ID:", socket.id);
      console.log("Online Users Map:", onlineUsers);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      console.log("Recipient User:", data.to);
      console.log("Online Users Map:", onlineUsers);
  
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg, data.capturedImage);
      console.log("Message sent to recipient:", data.msg, data.capturedImage);
      } else {
        console.log("Recipient user not found in onlineUsers map");
      }
    });
  });

//  const httpServer = http.createServer(app);
//   const io = new Server(httpServer, {
//     cors: {
//         origin:["http://localhost:3000"],
//     },
// });

  // io.on('connection', (socket) => {
//     console.log("on connection", socket.id);
//     socket.on('ding', (ding) => {
//         console.log(ding);
//         socket.emit("update_user", {key: "value"});
//     });

//     socket.on('chat', function(data){
//         // console.log(data);
//         io.sockets.emit('chat', data);
//     });

//     socket.on('disconnect', () => {

//         console.log("disconnected");
//     });

//     socket.on('userChat', (data) => {

//         console.log(data);
//     });
// })

// mongoose.set("useFindAndModify", false); FIND FIX 

//middleware
app.use(express.json({ limit: '2MB' }))
app.use((req, res, next) => {
    //console.log("asad test")
    //console.log(req.path, req.method)
    next()
})

//Routes
app.get("/", (req, res)=> {
    //res.json({msg: "Welcome to KidzSnap Backend Database Support"});
    res.sendFile(__dirname + '/index.html');
})

app.use("/api/messages", router)
app.use("/api/uploads", userRouter)
app.use("/api/user", urouter)

// app.listen(APP_PORT, () => {
//   console.log(`App running on port ${APP_PORT}`);
// });

// httpServer.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
//listen for requests 
// app.listen(PORT, () => {
//     console.log("listening on port " , process.env.PORT)
// })




