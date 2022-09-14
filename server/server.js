import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//(**NOTE hide environment variable in .env file) require("dotenv").config()



// ***Old method const express = require("express")*****


//express app
const app = express()

const PORT = process.env.PORT || 3000

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.get("/", (req, res)=> {
    res.json({msg: "Welcome to KidzSnap Backend Database Support"});
})

//listen for requests *make change to .env file*
app.listen(3000, () => {
    console.log("listening on port 3000")
})

