import mongoose from "mongoose"
import bcrypt from "bcrypt"
import validator from "validator"

// const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    creator: {
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
        unique: true

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

})

// static signup method
userSchema.statics.signup = async function (username, email, password) {

    // validation
    if (!username || !password) {
        throw Error("All fields must be filled Signup")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough")
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


// static login method
userSchema.statics.login = async function (username, password) {
    
    if (!username || !password) {
        throw Error("All fields must be filled Login")
    }

    const user_exist = await this.findOne({username})

    if (!user) {
        throw Error("Invalid Username")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Invalid Password")
    }

    return user


}

var userModel = mongoose.model("User", userSchema);

export default userModel

