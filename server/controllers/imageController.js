import PostImage from "../models/imageModel"
import mongoose from "mongoose";
import multer from "multer";

// set up multer for storing uploaded files

// Step 4 - set up EJS
  
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
  
// // Set EJS as templating engine 
// app.set("view engine", "ejs");

// Step 5 - set up multer for storing uploaded files
  
var multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });


// Step 6 - load the mongoose model for Image





// get all images
const getMessages = async (req, res) => {

    try{
        const images = await PostImage.find({}).sort({createdAt: -1})
        res.status(200).json(images)
} catch (error){
    res.status(404).json({ message: error.message});
}
    
}


// get a single image

const getImage = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "invalid image id"})

    }

    const image = await PostImage.findById(id)

    if (!image) {
        return res.status(404).json({error: "image not found"})
    }

    res.status(200).json(message)
}


// post a new image

const createMessage = async (req, res) => {
    const {title, creator} = req.body
// *adds image to data-base
    try {
        const newImage = await PostImage.create({title, creator})
        res.status(200).json(newMessage)
    } catch (error) {
        res.status(400).json({error: error.message})

    }
}

// delete an image

const deleteMessage = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "invalid message id"})

    }

    const image = await PostImage.findOneAndDelete({_id: id})

    if (!image) {
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