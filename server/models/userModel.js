import mongoose from "mongoose"
// import bcrypt from "bcrypt"
// import validator from "validator"

// const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    }

})

// static signup method
userSchema.statics.signup = async function ( email, password) {

    // validation
    if (!email || !password) {
        throw Error("All fields must be filled")
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
    //used to add hash code to value can increase value but slows system
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // creates new user with hashed password
    const user = await this.create({ email, password: hash })

    return user
}

var userModel = mongoose.model("User", userSchema);

export default userModel

