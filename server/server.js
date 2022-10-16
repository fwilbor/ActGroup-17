// code for hiding global variables in .env file
dotenv.config()


import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/messages";

import urouter from "./routes/user";

import mrouter from "./routes/messengerTest";


//express app
const app = express()




const CONNECTION_URL = process.env.MONGO_URI


const PORT = process.env.PORT 


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false); FIND FIX 

//middleware
app.use(express.json())
app.use((req, res, next) => {
    //console.log("asad test")
    //console.log(req.path, req.method)
    next()
})

//Routes
app.get("/", (req, res)=> {
    res.json({msg: "Welcome to KidzSnap Backend Database Support"});
})

app.use("/api/messages", router )
app.use("/api/user", urouter)
app.use("/api/messenger", mrouter)



//listen for requests 
// app.listen(PORT, () => {
//     console.log("listening on port " , process.env.PORT)
// })




