const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: [3, "Username must be at least 3 characters"],
        required: "Please enter a valid username"
    },
    email: {
        type: String,
        unique: true,
        required: "Please enter a valid email",
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters"], // Fixed the length requirement here
        trim: true,
        required: "Please enter a valid Password"
    },
    isAuthorised: {
        type: Boolean,
        default: false,
    }
})

const User = mongoose.model("User", userSchema)
module.exports = User;
