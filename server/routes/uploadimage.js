import express from "express";
// Controller functions
import { getImage, createImage } from "../controllers/imageController.js";

const userRouter = express.Router()

// Get image route
userRouter.get("/", getImage)

// Post image route
userRouter.post("/addimage", createImage)



export default userRouter
