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
      type: String,
      ref: "User",
      required: true,
    },
    deleteAfter: {
      type: Number,
      default: 30 // Default to deleting messages after 30 days if no value is provided
    }

    
}, {timestamps: true})


var PostMessage = mongoose.model("Messages", messageSchema);

export default PostMessage
