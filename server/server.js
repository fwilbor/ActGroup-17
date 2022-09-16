import dotenv from "dotenv";
import express from "express";
//import messageroute from 'server\routes\messages.js';
//import { router } from '../routes/messages';
import router from "./routes/messages.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config(); 

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));


// const express = require('express')

// express app
const app = express()
//const mongoose = require('mongoose')
//const DiffRoutes = router()
const PORT = process.env.PORT

//app.use('/messages', messageroute);
//app.use(bodyParser.json({ limit: '30mb', extended: true }))
//app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
//app.use(cors());

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

// routes
//app.use('/api/messages/', DiffRoutes)
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
  })

app.use('/api/messages', router)

// listen for requests
//app.listen(process.env.PORT, () => {
  //console.log('listening on port', process.env.PORT)
//})
