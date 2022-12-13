import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"
//import childModel from "./childModel"

// const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    parentLink: {
        type: String,

    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
      },
    email: {
        type: String,
        index: {
            unique: true,
            partialFilterExpression: {email: {$type: 'string'}},
          },

    },
    password: {
        type: String,
        required: true
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
      },
      avatarImage: {
        type: String,
        default: "",
      },

    //   friends: Array,
    //   friend: {
    //     type: String,
    //     ref: "User",
    //   },
      friends: {
        type: Array,
        default: [],
      },

})

// static signup method
userSchema.statics.signup = async function (username, email, password) {

    // validation
    if (!username || !password) {
        throw Error("All fields must be filled Signup")
    }

    // if (!validator.isEmail(email)) {
    //     throw Error("Email is not valid")
    // }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough Parent signup")
    }

    const exists = await this.findOne({email})

    if (exists) {
        throw Error("Email alredy exists")
    }

    const exists_username = await this.findOne({username})
    
    if (exists_username) {
        throw Error("Username alredy exists")
    }
    //used to add hash code to value can increase value but slows system
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // creates new user with hashed password
    const user = await this.create({ username, email, password: hash })

    return user
}

// child signup method
userSchema.statics.childsignup = async function (username, password, parentLink) {

    // validation
    if (!username || !password) {
        throw Error("All fields must be filled Signup")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough")
    }

    const exists_username = await this.findOne({username})
    
    if (exists_username) {
        throw Error("Username alredy exists")
    }
    //used to add hash code to value can increase value but slows system
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // creates new user with hashed password
    const user = await this.create({ username, parentLink, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function (username, password) {
    
    if (!username || !password) {
        throw Error("All fields must be filled Login")
    }

    const user = await this.findOne({username})
    

    if (!user) {
        throw Error("Invalid Username")
    }

    const match = await bcrypt.compare(password, user.password)
    

    if (!match) {
        throw Error("Invalid Password")
    }

    return user
}

// static login method
userSchema.statics.addFriend = async function (username) {
    
    if (!username) {
        throw Error("You must add a username!")
    }

    const user = await this.findOne({username})
    

    if (!user) {
        throw Error("Invalid Username")
    }

    return user
}

// userSchema.statics.getAllChildren = async function (username, avatarImage, _id, parentLink) => {
//     try {
//       const users = await userModel.find({ parentLink: { $eq: parent_data.id } }).select([
//         "username",
//         "avatarImage",
//         "_id",
//       ]);
//       return res.json(users);
//     } catch (ex) {
//       next(ex);
//     }
//   };

var userModel = mongoose.model("Users", userSchema);

export default userModel
//export default mongoose.models['Users'] || mongoose.model('Users', childSchema);
