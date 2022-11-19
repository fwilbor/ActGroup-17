import express from "express";
import {createMessage, getMessage, getMessages, deleteMessage, updateMessage, addMessage, getChats} from "../controllers/messageController";
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
router.delete("/:id", deleteMessage)


// UPDATE a message
router.patch("/:id", updateMessage)

//chat routes
router.post("/addmsg/", addMessage);
router.post("/getmsg/", getChats);

export default router

