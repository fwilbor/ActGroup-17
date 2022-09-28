import mongoose from "mongoose";

//const Schema = mongoose.Schema

const imageSchema = mongoose.Schema({
    //id: mongoose.Types.ObjectId,
    name: String,
    //desc: String,
    image:
    {
        data: Buffer,
        contentType: String
    },
    // selectedFile: {
    //     data: Buffer,
    //     contentType: String
    // }
    //tags: [String],
    //selectedFile: String,
    //likeCount: {
        //type: Number,
        //default: 0,
    //},
    
}, { timestamps: true })

//module.exports = mongoose.model('Message', messageSchema)
var PostImage = mongoose.model('PostImage', imageSchema);

export default PostImage