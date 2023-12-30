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
    password: {
        type: String,
        required: true,
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
});

// export 
module.export = mongoose.model("User", userSchema);