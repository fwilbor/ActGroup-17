import express from "express";

//controller functions
import { loginUser, signupUser, childsignup, getAllUsers, setAvatar, logOut, getAllChildren, addFriend, getAllFriends, checkIfEmailExists, checkIfUsernameExists, checkIfPasswordMatch, getSessionTime, childTimeLimit, checkIfUserLogin, continueSession, getUserInfo } from "../controllers/userController.js";


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
// check if email exists route
urouter.get("/checkemail/:email", checkIfEmailExists);

// check if username exists route
urouter.get("/checkusername/:username", checkIfUsernameExists);

// check if password match in login
urouter.get("/checkpasswordmatch/:username/:password", checkIfPasswordMatch);

// get child session time
urouter.get("/getsession/:id", getSessionTime);

// update time limit for child
urouter.patch("/timelimit/:id", childTimeLimit);

// check if username login
urouter.get("/checkuserlogin/:username", checkIfUserLogin);

// calculate new time limit
urouter.get("/continuesession/:id", continueSession);

// get user info
urouter.get("/userinfo/:id", getUserInfo);




export default urouter