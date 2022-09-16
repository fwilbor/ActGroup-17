import express from 'express';
import PostMessage from "../models/Messages.js";

const router = express.Router()

// GET all messages
router.get('/', (req, res) => {
    //res.json({mssg: 'GET all messages'})
    res.send('THIS WORKS');
  });

// GET a single message
router.get('/:id', (req, res) => {
  res.json({mssg: 'GET a single message'})
})

// POST a new message
router.post('/', async (req, res) => {
  const { title, message, creator } = req.body;
  //const { title, message, creator } = req.body;

  //const newPostMessage = new PostMessage({ title, message, creator })

  try {
    const newmessage = await PostMessage.create({title, message, creator})
    res.status(200).json(newmessage)
  } catch (error) {
    res.status(400).json({error: error.message})

  }
})

// DELETE a message
router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE a message'})
})

// UPDATE a message
router.patch('/:id', (req, res) => {
  res.json({mssg: 'UPDATE a message'})
})
  
export default router;