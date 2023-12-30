// import 
const mongoose = require("mongoose");

// route handler
const followerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

// export 
module.export = mongoose.model("Follower", followerSchema);