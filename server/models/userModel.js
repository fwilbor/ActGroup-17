import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

