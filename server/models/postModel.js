// import 
const mongoose = require("mongoose");

// route handler
const postSchema = new mongoose.Schema({
    postPicture: {
        type: String,
        required: true,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }]
}, { timestamps: true });

// export 
module.export = mongoose.model("Post", postSchema);