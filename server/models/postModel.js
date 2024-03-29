// import 
const mongoose = require("mongoose");

// route handler
const postSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    postPicture: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [{
        text: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postedBy: {
        type: String,
    },
    postPicturePublicId: {
        type: String,
    },
}, { timestamps: true });

// export 
module.exports = mongoose.model("Post", postSchema);