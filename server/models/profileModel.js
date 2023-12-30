// import 
const mongoose = require("mongoose");

// route handler
const profileSchema = new mongoose.Schema({
    profilePicture: {
        type: String,
    },
    contactNumber: {
        type: Number,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
    }
});

// export 
module.export = mongoose.model("Profile", profileSchema);