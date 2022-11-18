import PostMessage from "../models/messageModel"
import mongoose from "mongoose";
import PostImage from "../models/Images";
import userModel from "../models/userModel"

const getChats = async (req, res, next) => {
    try {
      const { from, to } = req.body;
  
      const messages = await PostMessage.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: 1 });
  
      const projectedMessages = messages.map((msg) => {
        return {
          fromSelf: msg.sender.toString() === from,
          message: msg.message.text,
        };
      });
      res.json(projectedMessages);
    } catch (ex) {
      next(ex);
    }
  };
  
  const addMessage = async (req, res, next) => {
    try {
      const { from, to, message } = req.body;
      const data = await PostMessage.create({
        message: { text: message },
        users: [from, to],
        sender: from,
      });
  
      if (data) return res.json({ msg: "Message added successfully." });
      else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
      next(ex);
    }
  };

// get all messages
const getMessages = async (req, res) => {

    // const {email} = req.params
    

    // const does_email_exist = await userModel.findOne({email})

    // if (!does_email_exist) {
    //     throw Error("Email does not exist")
    // }

    // try {
    //     const childmessages = await PostMessage.find({email: { $eq: email }}).sort({createdAt: -1})
    //     res.status(200).json(childmessages)
    // } catch (error){
    //     res.status(404).json({ message: error.message});
    // }

    const user_id = req.user._id

    try{
        const messages = await PostMessage.find({user_id}).sort({createdAt: -1})
        res.status(200).json(messages)
} catch (error){
    res.status(404).json({ message: error.message});
}
    
}

// get a single message(this works)
// const getChildMessages = async (req, res) => {
//     const creator = req.user.creator

//     if (!mongoose.Types.ObjectId.isValid(creator)) {
//         return res.status(404).json({error: "invalid creator"})

//     }

//     try {
//     const childmessages = await PostMessage.find({creator}).sort({createdAt: -1})
//     res.status(200).json(childmessages)
// } catch (error){
//     res.status(404).json({ message: error.message});
// }
// }

// get a single message(this works)
const getMessage = async (req, res) => {

    const {creator} = req.params
    //const childname = req.user.creator


    if (!PostMessage.find({creator})) {
        return res.status(404).json({error: "invalid creator"})

    }

    try {
    const childmessages = await PostMessage.find({creator: { $eq: creator }}).sort({createdAt: -1})
    res.status(200).json(childmessages)
} catch (error){
    res.status(404).json({ message: error.message});
}
}

// get a single message(this works)
// const getMessage = async (req, res) => {
//     const {id} = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: "invalid mess id"})

//     }

//     const message = await PostMessage.findById(id)

//     if (!message) {
//         return res.status(404).json({error: "Message not found"})
//     }

//     res.status(200).json(message)
// }




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
    
//     const {message, creator, sendTo} = req.body

//     const if_user_exist = await userModel.findOne({creator})
//     console.log(if_user_exist)

//     //Find better error messaging that wont stop server
//     if (!if_user_exist) {
//         throw Error("Invalid Username")
//     }

// // *adds message to data-base
//     try {
//         const user_id = req.user._id
//         const newMessage = await PostMessage.create({message, sendTo, creator, user_id})
//         res.status(200).json(newMessage)
//     } catch (error) {
//         res.status(400).json({error: error.message})

//     }
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



export  {createMessage, getMessage, getMessages, deleteMessage, updateMessage, getChats, addMessage} 
