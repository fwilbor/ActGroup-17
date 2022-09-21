import express from 'express';
import { createMessage, getMessages, getMessage, deleteMessage, updateMessage } from '../Controllers/MessageController.js';
import PostMessage from "../models/Messages.js";


const router = express.Router()

// GET all messages
router.get('/', getMessages)

// GET a single message
router.get('/:id', getMessage)

// POST a new message
router.post('/', createMessage)

// DELETE a message
router.delete('/:id', deleteMessage)

// UPDATE a message
router.patch('/:id', updateMessage)
  
export default router;
