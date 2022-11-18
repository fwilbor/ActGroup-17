import express from "express";

//controller functions
import { loginUser, signupUser, getAllUsers, setAvatar, logOut } from "../controllers/userController";


const urouter = express.Router()

// login route
urouter.post('/login', loginUser)

// signup route
urouter.post('/signup', signupUser)
urouter.get("/allusers/:id", getAllUsers);
urouter.post("/setavatar/:id", setAvatar);
urouter.get("/logout/:id", logOut);




export default urouter