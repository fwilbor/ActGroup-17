import mongoose from "mongoose";

//const Schema = mongoose.Schema

const messageSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    //tags: [String],
    //selectedFile: String,
    //likeCount: {
        //type: Number,
        //default: 0,
    //},
    
}, { timestamps: true })

//module.exports = mongoose.model('Message', messageSchema)
var PostMessage = mongoose.model('PostMessage', messageSchema);

export default PostMessage