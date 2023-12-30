// import 
const User = require("../models/userModel");
const Profile = require("../models/profileModel");

// signup
exports.signup = async (req, res) => {
    try {
        // fetch data from req.body
        const { name, email, username, password } = req.body;

        // validate data
        if(!name || !email || !username || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            });
        }

        // check if username already exists
        const existingUsername = await User.findOne({username});
        if(existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Username is already taken"
            });
        }

        // hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // create profile entry in db
        const profileDetails = await Profile.create({
            profilePicture: "https://api.dicebear.com/5.x/initials/svg?seed=${name}",
            contactNumber: null,
            gender: null,
        });

        // create user entry in db
        const user = await User.create({
            name, 
            email, 
            username, 
            password: hashedPassword
        });

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            data: user
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, please try again later"
        });
    }
}


// login


