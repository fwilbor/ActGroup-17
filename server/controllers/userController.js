import userModel from "../models/userModel"
import jsonwebtoken from "jsonwebtoken"
// mongoDb uses _id for unique id generated
const createToken = (_id) => {
    return jsonwebtoken.sign({_id}, process.env.SECRET, { expiresIn: "3d"})
}

// login user 
const loginUser = async (req, res) => {
    
    const {username, password} = req.body

    try {
        const user = await userModel.login(username, password)
        //console.log(user)
        // create a token
        const token = createToken(user._id)
        // passing back token and not _id here
        res.status(200).json({status: true, user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}


// signup user
const signupUser = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await userModel.signup(username, email, password)
        //console.log(user)

        // create a token
        const token = createToken(user._id)
        // passing back token and not _id here
        res.status(200).json({ status: true, user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

const getAllUsers = async (req, res, next) => {
    try {
      const users = await userModel.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "avatarImage",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };
  
  const setAvatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData = await userModel.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  };
  
  const logOut = (req, res, next) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  };

export {signupUser, loginUser, getAllUsers, setAvatar, logOut}