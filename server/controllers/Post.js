// import 
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const User = require("../models/userModel");
const Post = require("../models/postModel");

function isFileTypeSupported(photoType, supportedTypes) {
    return supportedTypes.includes(photoType);
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
                data: user
            });
        }

        // fetch image
        const photo = req.files.postPicture;
        console.log("photo: ", photo);

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

        // add the new post to the user schema
        await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    posts: post._id,
                }
            },
        );

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

// deletePost
exports.deletePost = async (req, res) => {
    try {
        // fetch post id
        const postId = req.params.id;

        // const post = await Post.findById(postId);

        // delete post picture from Cloudinary
        

        // delete post
        const postToBeDeleted = await Post.findByIdAndDelete(postId);

        // return successfull response
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            data: postToBeDeleted,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "cannot delete post"
        });
    }
}
