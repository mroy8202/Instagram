// import 
const mongoose = require("mongoose");

// route handler
const followingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

// export 
module.exports = mongoose.model("Following", followingSchema);