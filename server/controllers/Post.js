// import 
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Cloudinary = require("cloudinary").v2;
const User = require("../models/userModel");
const Post = require("../models/postModel");

function isFileTypeSupported(photoType, supportedTypes) {
    return supportedTypes.includes(photoType);
}

// createPost
// TODO: when deleting the post, delete the likes and comments associated to it
exports.createPost = async (req, res) => {
    try {
        // fetch userid
        const userId = req.user.id;

        // fetch profile
        const user = await User.findById(userId);

        // fetch title
        const {title} = req.body;

        if(!title) {
            return res.status(500).json({
                success: false,
                message: "Title is missing"
            });
        }

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: user
            });
        }

        // fetch image
        const photo = req.files.postPicture;
        // console.log("photo: ", photo);

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
        // console.log("image: ", image);

        // create entry in Post database
        const post = await Post.create({
            postPicture: image.secure_url,
            user: user,
            postedBy: user.username,
            postPicturePublicId: image.public_id,
            title: title
        });
        // console.log("POST DETAILS: ", post);

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
            message: "could not create a post, please try again later",
        });
    }
}

// deletePost
exports.deletePost = async (req, res) => {
    try {
        // fetch post id from req.params
        const postId = req.params.id;
        // console.log("POST ID: ", postId);

        // validation on data
        const post = await Post.findById(postId);
        // console.log("POST: ", post);
        if(!post) {
            return res.status(401).json({
                success: false,
                message: "Post not found with given postID",
            });
        }

        // check if the user id authorized to delete post
        const userId = req.user.id;
        const user = await User.findById(userId);
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not logged in",
            });
        }
        
        console.log("USER ID: ", userId, "  TYPE: ", typeof(userId));
        console.log("POST USER ID: ", post.user._id, "  TYPE: ", typeof(post.user._id.toString()));
        if(userId !== post.user._id.toString()) {
            return res.status(401).json({
                success: false,
                message: "user is not authorized to delete the post",
            });
        }
        
        // delete post picture from cloudinary
        try {
            await Cloudinary.uploader.destroy(post.postPicturePublicId);
        }
        catch(error) {
            return res.status(401).json({
                success: false,
                message: "Error in deleting image from cloudinary",
                error: error.message
            });
        }
        

        // delete the post
        const deletedPost = await Post.findByIdAndDelete(postId);
        // console.log("DELETED POST: ", deletedPost);

        // remove the post from user post array
        const userPost = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    posts: postId,
                }
            },
            {new: true}
        );

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            post: deletedPost
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "cannot delete post"
        });
    }
}

// getMyPost
exports.getMyPost = async (req, res) => {
    try {
        // fetch user id
        const username = req.user.username;
        // console.log("req user: ", req.user);
    
        // validation on data
        if(!username) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // show all post
        const userPost = await Post.find({postedBy: username}).populate("user").exec();

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "User post fetched successfully",
            data: userPost,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Cannot fetch all the posts",
            error: error.message,
        });
    }
}

// getHomepagePost
exports.getHomepagePost = async (req, res) => {
    try {
        // fetch recent posts
        const posts = await Post.find({})
            .limit(10)
            .sort({createdAt: -1})
            .populate("user")
            .populate("likes")
            .populate("comments.user")
            .exec();
        
        // console.log("POSTS :", posts);

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: posts,
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error in fetching homepage posts",
            error: error.message
        });
    }
}