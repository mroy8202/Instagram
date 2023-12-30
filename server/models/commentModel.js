// import 
const mongoose = require("mongoose");

// route handler
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    commentText: {
        type: String,
        required: true,
    }
});

// export 
module.exports = mongoose.model("Comment", commentSchema);