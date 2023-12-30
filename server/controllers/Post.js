// import 
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/userModel");
const Post = require("../models/postModel");

function isFileTypeSupported(photoType, supportedTypes) {
    return supportedTypes.includes(fileType);
}

// createPost
exports.createPost = async (req, res) => {
    try {
        // fetch userid
        const userId = req.user.id;
        const username = req.user.username;

        // fetch profile
        const user = await User.findById(userId).populate("profile");

        if(!user || !user.profile) {
            return res.status(404).json({
                success: false,
                message: "User or profile not found",
            });
        }

        // fetch image
        const photo = req.files.postPicture;

        // validation on image
        const supportedTypes = ["jpg", "jpeg", "png"];
        const photoType = photo.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(photoType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        // upload image to cloudinary
        const image = await uploadImageToCloudinary(photo, process.env.FOLDER_NAME);
        console.log("image: ", image);

        // create entry in Post database
        const post = await Post.create({
            userImage: user.profile.profilePicture,
            username: username,
            postPicture: image.secure_url,
        });

        // return successfull response
        return res.status(200).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "could not create a post, please try again later"
        });
    }
}