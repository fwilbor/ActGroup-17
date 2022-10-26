import PostMessage from "../models/messageModel"
import mongoose from "mongoose";
import PostImage from "../models/Images";

// get all messages
const getMessages = async (req, res) => {

    const user_id = req.user._id

    try{
        const messages = await PostMessage.find({user_id}).sort({createdAt: -1})
        res.status(200).json(messages)
} catch (error){
    res.status(404).json({ message: error.message});
}
    
}

// get a single message(this works)
const getMessage = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "invalid message id"})

    }

    const message = await PostMessage.findById(id)

    if (!message) {
        return res.status(404).json({error: "Message not found"})
    }

    res.status(200).json(message)
}




// create a new message

const createMessage = async (req, res) => {
    const {title, message, creator} = req.body
// *adds message to data-base
    try {
        const user_id = req.user._id
        const newMessage = await PostMessage.create({title, message, creator, user_id})
        res.status(200).json(newMessage)
    } catch (error) {
        res.status(400).json({error: error.message})

    }
}

// delete a message

const deleteMessage = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "invalid message id"})

    }

    const message = await PostMessage.findOneAndDelete({_id: id})

    if (!message) {
        return res.status(404).json({error: "Message not found"})
    }

    res.status(200).json(message)


}

// update a message

const updateMessage = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "invalid message id"})

    }

    const message = await PostMessage.findOneAndUpdate({_id: id}, {

        ...req.body
    })

    if (!message) {
        return res.status(404).json({error: "Message not found"})
    }

    res.status(200).json(message)

}



export  {createMessage, getMessage, getMessages, deleteMessage, updateMessage} 
