import jsonwebtoken from "jsonwebtoken"
import userModel from "../models/userModel"
const  requireAuth = async (req, res, next) => {

    // verify user authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }
    // grabs token from header and splits on space
    const token = authorization.split(" ")[1]

    try {
      const {_id} = jsonwebtoken.verify(token, process.env.SECRET)
      // finds user by id and only shows their messages and images
      req.user = await userModel.findOne({ _id }).select("_id") 
      next() 

    } catch (error) {
        console.log(error)
        res.status(401).json({error: "Request is not authorized"})
    }



}

export default requireAuth