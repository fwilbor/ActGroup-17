import mongoose from "mongoose";



const imageSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: String,
   creator: String,
   img: {
    data: Buffer,
    contentType: String
   }
//    tags: [String],
//    selectedFile: String,
//    likeCount: {
//     type: Number,
//     default: 0,
//    }

    
}, {timestamps: true})


var PostImage = mongoose.model("PostImage", messageSchema);

export default PostImage