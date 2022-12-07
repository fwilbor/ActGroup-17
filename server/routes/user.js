import express from "express";

//controller functions
import { loginUser, signupUser, childsignup, getAllUsers, setAvatar, logOut, getAllChildren } from "../Controllers/userController";


const urouter = express.Router()

// login route
urouter.post('/login', loginUser)

// signup route
urouter.get("/children/:id", getAllChildren)
urouter.post('/signup', signupUser);
urouter.post('/child', childsignup);
urouter.get("/allusers/:id", getAllUsers);
urouter.post("/setavatar/:id", setAvatar);
urouter.get("/logout/:id", logOut);




export default urouter