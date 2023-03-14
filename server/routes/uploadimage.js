import express from "express";
// Controller functions
import { getImage, createImage} from "../Controllers/ImageController.js";

const userRouter = express.Router()

// Get image route
userRouter.get("/", getImage)

// Post image route
<<<<<<< HEAD
userRouter.post("/addimage", createImage)
=======
userRouter.post("/uploads", createImage)
>>>>>>> 791ac4096 (Image Upload)



export default userRouter
