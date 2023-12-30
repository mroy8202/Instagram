// import 
const mongoose = require("mongoose");

// route handler
const likeSchema = new mongoose.Schema({
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
    }
});

// export 
module.export = mongoose.model("Like", likeSchema);