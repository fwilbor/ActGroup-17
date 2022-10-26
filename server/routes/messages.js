import express from "express";
import {createMessage, getMessage, getMessages, deleteMessage, updateMessage} from "../controllers/messageController";
import requireAuth from "../middleware/requireauth";

const router = express.Router()
// require Authorization for all message routes
router.use(requireAuth)

// GET all messages
router.get("/", getMessages)

// GET a single message
router.get("/:id", getMessage)


// POST a new message
    router.post("/", createMessage)
    
    
// DELETE a message
router.delete("/:id", deleteMessage)


// UPDATE a message
router.patch("/:id", updateMessage)

export default router

