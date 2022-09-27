import userModel from "../models/userModel"
import jsonwebtoken from "jsonwebtoken"
// mongoDb uses _id for unique id generated
const createToken = (_id) => {
    return jsonwebtoken.sign({_id}, process.env.SECRET, { expiresIn: "3d"})
}

// login user 
const loginUser = async (req, res) => {
    res.json({msg: "login user"})
//     const {email, password} = req.body
// // *adds existing user  to data-base
//     try {
//         const existingUser = await userModel.create({email, password})
//         res.status(200).json(existingUser)
//     } catch (error) {
//         res.status(400).json({error: error.message})

//     }
}


// signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await userModel.signup(email, password)

        // create a token
        const token = createToken(user._id)
        // passing back token and not _id here
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

export {signupUser, loginUser}