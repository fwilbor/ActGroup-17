import express from "express";

//controller functions
import { loginUser, signupUser } from "../controllers/userController";


const urouter = express.Router()

// login route
urouter.post('/login', loginUser)

// signup route
urouter.post('/signup', signupUser)




export default urouter