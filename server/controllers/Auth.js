// import 
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

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
            profilePicture: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
            contactNumber: null,
            gender: null,
        });

        // create user entry in db
        const user = await User.create({
            name, 
            email, 
            username, 
            password: hashedPassword,
            profile: profileDetails,
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
exports.login = async (req, res) => {
    try {
        // fetch data from req.body
        const { email, password } = req.body;

        // data validation
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if user exists or not
        const user = await User.findOne({email}).populate("profile");
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered, please signup first"
            });
        }

        // match password 
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }

        // generate jwt token
        const payload = {
            email: user.email,
            id: user._id,
            username: user.username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

        // save token to user document in database
        user.token = token;
        user.password = undefined;

        // set cookie for token and return successfull response
        const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        console.log("user: ", user);
        return res.cookie("token", token, options).status(200).json({
            success: true,
            Token: token,
            User: user,
            message: "Logged in successfully"
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error while login, please try again"
        });
    }
}

// changePassword
exports.changePassword = async (req, res) => {
    try {
        // fetch user from the token payload from middleware
        const userDetails = await User.findById(req.user.id);

        // fetch data from req.body
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        // validate data
        if(!currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: "New passwords donot match",
            });
        }

        // validate old password
        const isPasswordMatch = await bcrypt.compare(currentPassword, userDetails.password);
        if(!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "current password is incorrect",
            });
        }

        // match new passwrod and confirm new password
        if(newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: "new password and confirm new password donot match",
            });
        }

        // hash the password and update in db
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password: hashedPassword},
            {new: true}
        );

        // return successfull response
        return res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Couldnot change password, please try again",
            error: error.message,
        });
    }
}


