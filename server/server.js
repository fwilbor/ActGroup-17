import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


// import { createRequire } from 'module';


//(**NOTE hide environment variable in .env file) require("dotenv").config()

dotenv.config()



// ***Old method const express = require("express")*****



// const messageRoutes = require("./routes/messages")


//express app
const app = express()

const PORT = process.env.PORT 

//middleware
// app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.get("/", (req, res)=> {
    res.json({msg: "Welcome to KidzSnap Backend Database Support"});
})

// app.use("/api/messages", messageRoutes)

//listen for requests *make change to .env file*
app.listen(PORT, () => {
    console.log("listening on port " , process.env.PORT)
})



