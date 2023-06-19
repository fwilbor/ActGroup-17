
import userModel from "../models/userModel.js"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt"

let start_time 
let sessionTimes = [];
// mongoDb uses _id for unique id generated
const createToken = (_id) => {
    return jsonwebtoken.sign({_id}, process.env.SECRET, { expiresIn: "3d"})
}


// login user 
const loginUser = async (req, res) => {
    
    const {username, password} = req.body

    try {
      const user = await userModel.login(username, password)
      console.log(user)
      
      // if (user.isLogin === true) {
      //   // User is already logged in
      //   return res.status(400).json({ error: "You are already logged in on another tab5" });
      // }
      
      // Check if it's a new day
      const today = new Date().toDateString();
      const lastLoginDate = user.totalSession.length > 0 ? user.totalSession[user.totalSession.length - 1].login : null;
      if (!lastLoginDate || new Date(lastLoginDate).toDateString() !== today) {
       // Reset timeLimit to original value
      user.timeLimit = user.dailyTimeLimit;
      }

      // Set isLogin to true
    user.isLogin = true;
    await user.save();

      const token = createToken(user._id)
      // passing back token and not _id here
      res.status(200).json({status: true, user, token})
      let currentTimestamp = Date.now()
        console.log(currentTimestamp); // get current timestamp
        let login_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
        //console.log(login_date)
        start_time = new Date(login_date)
        sessionTimes.push({login: start_time, logout: null, duration: null, lastSessionDuration: null}) // add new login/logout event to array
        console.log('array', sessionTimes)

  } catch (error) {
    console.error(error);
      res.status(403).json({error: error.message})
  }

}


// signup user
const signupUser = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await userModel.signup(username, email, password)
        //console.log(user)

        // set user as logged in
        user.isLogin = true;
        await user.save();

        // create a token
        const token = createToken(user._id)
        // passing back token and not _id here
        res.status(200).json({ status: true, user, token})
        let currentTimestamp = Date.now()
        console.log(currentTimestamp); // get current timestamp
        let login_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
        start_time = new Date(login_date)
        sessionTimes.push({login: start_time, logout: null, duration: null, lastSessionDuration: null}) // add new login/logout event to array
    } catch (error) {
        res.status(401).json({error: error.message})
    }
    
}

// signup user
const childsignup = async (req, res) => {
  const {username, password, parentLink, timeLimit, dailyTimeLimit} = req.body
  console.log(typeof req.body.dailyTimeLimit, req.body.dailyTimeLimit);

  try {
    const user = await userModel.childsignup(username, password, parentLink, timeLimit, dailyTimeLimit);

    // create a token
    //const token = createToken(user._id)
    // passing back token and not _id here
    res.status(200).json({ status: true, user });
    let currentTimestamp = Date.now()
        console.log(currentTimestamp); // get current timestamp
        let login_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
        start_time = new Date(login_date)
        sessionTimes.push({login: start_time, logout: null, duration: null, lastSessionDuration: null}) // add new login/logout event to array
  } catch (error) {
    if (error.message === "Username already exists Signup") {
      // Display toast message for invalid username
      const toastOptions = { type: "error", duration: 5000 };
      toast("Invalid username.", toastOptions);
    } else if (error.message === "Password is not strong enough Signup") {
      // Display toast message for invalid password
      const toastOptions = { type: "error", duration: 5000 };
      toast("Invalid password.", toastOptions);
    } else {
      // Display toast message for other errors
      const toastOptions = { type: "error", duration: 5000 };
      toast("An error occurred.", toastOptions);
    }
    res.status(400).json({ error: error.message });
  }
};

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
  
  const logOut = async  (req, res, next) => {
    const { id } = req.params
    const { timeLimit } = req.query; // get timeLimit query parameter

    const user = await userModel.findById(id)
    console.log('isLogin:', user.isLogin);
    
    if (!user.isLogin) {
      console.log('this is running')
      return res.json({ msg: "User is already logged out" });
    }

   const timeRemaining = Number(timeLimit);
   console.log(timeRemaining)

    try {
      const currentTimestamp = Date.now()
      const logout_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
      const end_time = new Date(logout_date)
  
      const lastSession = sessionTimes.length > 0 ? sessionTimes[sessionTimes.length - 1] : { login: start_time }; // get the last login/logout event from array, or use start_time if there are no events
      console.log('start time', lastSession.login)
      lastSession.logout = end_time; // update the logout time
      lastSession.duration = (lastSession.logout - lastSession.login) / 1000; // calculate session duration


      const userTimeIn = (lastSession.logout - lastSession.login );
      console.log(userTimeIn)

      
      // Set user isLogin field to false
    user.isLogin = false;
    console.log('isLogin:', user.isLogin);

    // Calculate remaining time and put it in user.timeLimit
    const remainingTime = Math.max(0, user.timeLimit + lastSession.lastSessionDuration - userTimeIn);
    console.log(user.timeLimit)
    console.log(userTimeIn)
    user.timeLimit = remainingTime;

      const newSession = [];
if (sessionTimes.length > 0) {
  if (user.totalSession && user.totalSession.length > 0) {
    const lastLogin = new Date(user.totalSession[user.totalSession.length - 1].login);
    console.log('last login', lastLogin);
    if (lastLogin && lastLogin.getMinutes() === lastSession.logout.getMinutes() && lastLogin.getHours() === lastSession.logout.getHours() && lastLogin.getDate() === lastSession.logout.getDate() && lastLogin.getMonth() === lastSession.logout.getMonth()) {
      //console.log(lastSession.login);
      lastSession.login.setMinutes(lastSession.login.getMinutes() + 1); // add a minute to login time
      lastSession.loginStr = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(lastSession.login); // create readable login date string
      //console.log(lastSession.loginStr);
    } else {
      lastSession.loginStr = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(lastSession.login); // create readable login date string
      console.log('lastSession.loginStr', lastSession.loginStr);
    }
  }
    
}
console.log('what is it', lastSession.loginStr)
if (lastSession.loginStr === undefined) {
  console.log('confirm this run once')
  const loginTime = new Date(lastSession.login);
  const loginStr = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).format(loginTime);

  newSession.push({
    login: loginStr,
    duration: lastSession.duration
  });
} else {
  newSession.push({
    login: lastSession.loginStr,
    duration: lastSession.duration
  });
}

// You if we need to limit on objects in array
// if (user.totalSession && user.totalSession.length >= 12) {
//   user.totalSession.shift(); // remove the first element of the array
// }

user.totalSession.push(newSession[0]); // add new object with newSession data

const updatedUser = { ...user.toObject(), totalSession: user.totalSession };

//console.log(user.totalSession)

userModel.findByIdAndUpdate(req.params.id, updatedUser, { new: true }, function(err, user) {
  if (err) return next(err);
  onlineUsers.delete(req.params.id);
  console.log('onlineUsers.delete:', req.params.id);
  return res.status(200).send();
});
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
        "timeLimit",
        "totalSession",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };

    // Add Friend 
    const addFriend = async (req, res) => {
    
      const { username } = req.body;
try {
    const friendToAdd = await userModel.findOne({ username: { $eq: username }});
    if (!friendToAdd) {
        throw new Error("User not found");
    }
    
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (user.friends.includes(friendToAdd.id)) {
        return res.status(400).json({ error: "You are already friends" });
    }

    user.friends.push(friendToAdd.id);
    await user.save();

    friendToAdd.friends.push(user.id);
    await friendToAdd.save();

    res.status(200).json({ status: true });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not add friend" });
}
};

const checkIfEmailExists = async (req, res) => {
  const { email } = req.body
      const email_exists = await userModel.exists({email: { $eq: req.params.email }})
return res.json(Boolean(email_exists));
  }
  
  const checkIfUsernameExists = async (req, res) => {
    const { username } = req.body
        const username_exists = await userModel.exists({username: { $eq: req.params.username }})
        return res.json(Boolean(username_exists));
  }

  // This will check if user has login
  const checkIfUserLogin = async (req, res) => {
    const { username } = req.params
    const username_login = await userModel.findOne({ username })
         return res.json(Boolean(username_login.isLogin));
  }

  const checkIfPasswordMatch = async (req, res) => {
    const { username, password } = req.params;
    console.log(req.params)
        const username_exists = await userModel.findOne({ username })
        //console.log(username_exists)
        if (!username_exists) {
          return res.json({ error: "User not found" });
        }

        const match = await bcrypt.compare(req.params.password, username_exists.password)
        //return res.json(Boolean(match));
        return res.json(match);
  }

  const getSessionTime = async (req, res) => {
      const user = await userModel.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const sessionTime = user.sessionTime;
      return res.status(200).json({ sessionTime });

  };

  const childTimeLimit = async (req, res) => {
    //const user = await userModel.findOne({ _id: req.params.id });
    const { timeLimit } = req.body; // extract numRecentMessages from request body
  console.log(timeLimit);
    try {
      // Retrieve user from the database
      const user = await userModel.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user's recent messages
      user.timeLimit = timeLimit;
      user.dailyTimeLimit = timeLimit;
      //console.log(user.recentMessages)
  
      // Save updated user to the database
      await user.save();
  
      // Return success response
      return res.status(200).json({ message: 'Child time limit updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error updating child time limit' });
    }

};

//Calculate new timeLimit when user continue session
const continueSession = async  (req, res, next) => {
  console.log("Backend - continueSession function called");
  const { id } = req.params
  const { timeLimit } = req.query; // get timeLimit query parameter

  const user = await userModel.findById(id)
  
  if (!user.isLogin) {
    return res.json({ msg: "User is already logged out" });
  }

  const timeRemaining = Number(timeLimit);
  console.log("Backend - Time remaining:", timeRemaining)

   try {
     const currentTimestamp = Date.now()
     const logout_date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(currentTimestamp)
     const end_time = new Date(logout_date)
 
     const lastSession = sessionTimes[sessionTimes.length-1]; // get the last login/logout event from array
     console.log("Backend - Last login time:", lastSession.login)
     lastSession.logout = end_time; // update the logout time
     lastSession.duration = (lastSession.logout - lastSession.login) / 1000; // calculate session duration

     const userTimeIn = (lastSession.logout - lastSession.login);
     console.log("Backend - User time in:", userTimeIn)
     
   // Calculate remaining time and put it in user.timeLimit
   const remainingTime = Math.max(0, user.timeLimit - userTimeIn);
   user.timeLimit = remainingTime;
   console.log("Backend - User remaining time:", user.timeLimit)

   lastSession.lastSessionDuration += userTimeIn

  await user.save(); // save the changes to the database
  } catch (ex) {
    next(ex);
  }
};

const getUserInfo = async (req, res, next) => {
  console.log("Backend - getUserInfo function called");
  const { id } = req.params;

  const user = await userModel.findById(id).select([
    "username",
    "timeLimit",
  ]);

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  console.log(user);
  return res.json(user);
};
    

//}

export {signupUser, childsignup, loginUser, getAllUsers, setAvatar, logOut, getAllChildren, addFriend, getAllFriends, checkIfEmailExists, checkIfUsernameExists, checkIfPasswordMatch, getSessionTime, childTimeLimit, checkIfUserLogin, continueSession, getUserInfo}