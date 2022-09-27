import userModel from "../models/userModel"

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
        res.status(200).json({email, user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

export {signupUser, loginUser}