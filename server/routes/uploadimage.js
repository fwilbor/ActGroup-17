import express from "express";
// Controller functions
import { getImage, createImage} from "../Controllers/imageController.js";

const userRouter = express.Router()

// Get image route
userRouter.get("/", getImage)

// Post image route
userRouter.post("/uploads", createImage)



export default userRouter
