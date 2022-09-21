import PostMessage from "../models/Messages.js";
import mongoose from "mongoose";

// GET all messages
const getMessages = async (req, res) => {
    const Newmessages = await PostMessage.find({}).sort({createdAt: -1})
  
    res.status(200).json(Newmessages)
  }



// Get a single message
const getMessage = async (req, res) => {
    const { id } = req.params

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Invalid message ID'})
}

const singleMessage = await PostMessage.findById(id)

if (!singleMessage) {
    return res.status(404).json({error: "Message not found"})
}

res.status(200).json(singleMessage)
}

// POST a new message
const createMessage = async (req, res) => {
    const { title, message, creator } = req.body;

  //Add message to db

  try {
    const newMessage = await PostMessage.create({title, message, creator})
    res.status(200).json(newMessage)
  } catch (error) {
    res.status(400).json({error: error.message})

  }

}

// DELETE a message
const deleteMessage = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Invalid message ID'})
    }

    const deleteMsg = await PostMessage.findOneAndDelete({_id: id})

    if(!deleteMsg) {
        return res.status(400).json({error: 'No such message'})
      }
    
      res.status(200).json(deleteMsg)

}


// UPDATE a message
const updateMessage = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Invalid message ID'})
    }

    const updateMsg = await PostMessage.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!updateMsg) {
        return res.status(400).json({error: 'No such message'})
      }
    
      res.status(200).json(updateMsg)
}



export { createMessage, getMessages, getMessage, deleteMessage, updateMessage}