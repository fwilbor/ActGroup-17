import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import router from "./routes/messages";


dotenv.config()



// ***Old method const express = require("express")*****

// const messageRoutes = require("./routes/messages.js")


const CONNECTION_URL = process.env.MONGO_URI


//express app
const app = express()

const PORT = process.env.PORT 


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false); FIND FIX 

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.get("/", (req, res)=> {
    res.json({msg: "Welcome to KidzSnap Backend Database Support"});
})

app.use("/api/messages", router)


//listen for requests *make change to .env file*
// app.listen(PORT, () => {
//     console.log("listening on port " , process.env.PORT)
// })


