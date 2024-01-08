// import 
const mongoose = require("mongoose");

// route handler
const likeSchema = new mongoose.Schema({
    user: { // user who liked the comment
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    post: { // post which is liked
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }
});

// export 
module.exports = mongoose.model("Like", likeSchema);