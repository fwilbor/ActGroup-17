
import userModel from "../models/userModel"
import jsonwebtoken from "jsonwebtoken"
//import childModel from "../models/childModel"
//import childModel from "../models/childModel"
let start_time 
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
        let currentTimestamp = Date.now()
          console.log(currentTimestamp); // get current timestamp
          let login_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
          //console.log(login_date)
          start_time = login_date
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
        res.status(401).json({error: error.message})
    }
    
}

// signup user
const childsignup = async (req, res) => {
  const {username, password, parentLink} = req.body

  try {
      const user = await userModel.childsignup(username, password, parentLink)
      //console.log(user)

      // create a token
      //const token = createToken(user._id)
      // passing back token and not _id here
      res.status(200).json({ status: true, user})
  } catch (error) {
      res.status(402).json({error: error.message})
  }
  
}

const getAllUsers = async (req, res, next) => {
  const { id } = req.params

  const link = await userModel.findById(id)
  
  try {
    const users = await userModel.find({ _id: { $nin: link.friends } }).select([
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

const getAllFriends = async (req, res, next) => {
  const { id } = req.params

  const link = await userModel.findById(id)

    try {
      const users = await userModel.find({ _id: { $in: link.friends } }).select([
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
      console.log(start_time)

      let currentTimestamp = Date.now()
          console.log(currentTimestamp); // get current timestamp
          let logout_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
          var convert_logout = new Date(logout_date);
          var convert_login = new Date(start_time);
          console.log(convert_login)
          console.log(convert_logout)

      let session = (convert_logout - convert_login);
      console.log(session)
      session += session
      console.log(session)
          
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (ex) {
      next(ex);
    }
  };

  const getAllChildren = async (req, res, next) => {

    //const {username, avatarImage, parentLink} = req.body

    try {
      const users = await userModel.find({ parentLink: { $eq: req.params.id } }).select([
        "username",
        "avatarImage",
        "friends",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };

    // Add Friend 
    const addFriend = async (req, res) => {
    
      const { username } = req.body
      const friend_add = await userModel.findOne({username: { $eq: username }})
      //console.log(friend_add)

      const { id } = req.params;

      const user = await userModel.findById(id)
      //console.log(user)
      

   try {

      const results = user.friends.push(friend_add.id)
      
      
      await user.save()
      console.log(user.friends)

      const connect_friend = friend_add.friends.push(user.id)
      
      
      await friend_add.save()
      console.log(connect_friend)

      // create a token
      //const token = createToken(user._id)
      // passing back token and not _id here
            
      

      res.status(200).json({ status: true})
    } catch (error) {
      res.status(403).json({error: error.message})
  }

};
    

//}

export {signupUser, childsignup, loginUser, getAllUsers, setAvatar, logOut, getAllChildren, addFriend, getAllFriends}