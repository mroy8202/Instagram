// import 
const mongoose = require("mongoose");

// route handler
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Following",
    }],
    follower: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Follower",
    }]
}, { timestamps: true });

// export 
module.exports = mongoose.model("User", userSchema);