import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

// const Schema = mongoose.Schema

const childSchema = mongoose.Schema({
    parentLink: {
        type: String,
        default: ""

    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
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

      friend: Array,
      friends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

})

// static signup method
childSchema.statics.childsignup = async function (username, password, parentLink) {

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
childSchema.statics.login = async function (username, password) {
    
    if (!username || !password) {
        throw Error("All fields must be filled Login")
    }

    const user = await this.findOne({username})
    

    if (!user) {
        throw Error("Invalid Child Username")
    }

    const match = await bcrypt.compare(password, user.password)
    

    if (!match) {
        throw Error("Invalid Password")
    }

    return user
}

var childModel = mongoose.model("Childs", childSchema);

export default childModel