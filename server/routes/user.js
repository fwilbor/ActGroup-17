import express from "express";

//controller functions
import { loginUser, signupUser, childsignup, getAllUsers, setAvatar, logOut, getAllChildren, addFriend, getAllFriends } from "../Controllers/userController";


const urouter = express.Router()

// login route
urouter.post('/login', loginUser)

// signup route
urouter.get("/children/:id", getAllChildren)
urouter.post('/signup', signupUser);
urouter.post('/child', childsignup);
urouter.get("/allusers/:id", getAllUsers);
urouter.get("/allfriends/:id", getAllFriends);
urouter.post("/setavatar/:id", setAvatar);
urouter.get("/logout/:id", logOut);
urouter.patch("/addfriend/:id", addFriend);




export default urouter