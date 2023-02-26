import express from "express";
import {createMessage, getMessage, getMessages, deleteMessage, updateMessage, addMessage, getChats, getChildMessages} from "../controllers/messageController";
//import requireAuth from "../middleware/requireauth";

const router = express.Router()
// require Authorization for all message routes
//router.use(requireAuth)

// GET all messages
router.get("/", getMessages)

// GET a single message
router.get("/:creator", getMessage)


// POST a new message
    router.post("/", createMessage)
    
    
// DELETE a message
router.delete("/deleteMsg", deleteMessage)


// UPDATE a message
router.patch("/:id", updateMessage)

//chat routes
router.post("/addmsg/", addMessage);
router.post("/getmsg/", getChats);
router.get('/getmsg/:username', getChildMessages)

export default router

