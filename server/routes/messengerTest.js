import express from "express";

const mrouter = express.Router()

// send a new message to a friend
// mrouter.post("/:id", createMessage)

mrouter.get("/")

export default mrouter 