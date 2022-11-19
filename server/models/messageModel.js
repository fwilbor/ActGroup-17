import mongoose from "mongoose";


// const Schema = mongoose.Schema

const messageSchema = mongoose.Schema({
   email: String,
   message: {
      text: { type: String, required: true },
    },
   //creator: String,
   //sendTo: String,
   user_id: {
      type: String,
   },
   users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
//    tags: [String],
//    selectedFile: String,
//    likeCount: {
//     type: Number,
//     default: 0,
//    }

    
}, {timestamps: true})


var PostMessage = mongoose.model("PostMessage", messageSchema);

export default PostMessage
