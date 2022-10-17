import mongoose from "mongoose";



const imageSchema = mongoose.Schema({
    //id: mongoose.Types.ObjectId,
    //title: String,
   name: String,
   image: {
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


var PostImage = mongoose.model("PostImage", imageSchema);

export default PostImage