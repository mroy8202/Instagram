// import 
const mongoose = require("mongoose");

// route handler
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }
});

// export 
module.exports = mongoose.model("Like", likeSchema);