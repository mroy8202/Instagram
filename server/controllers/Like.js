const User = require("../models/userModel");
const Post = require("../models/postModel");
const Like = require("../models/likeModel");
const { default: mongoose } = require("mongoose");

exports.likePost = async (req, res) => {
    try {
        // fetch postId and userId
        const postId = req.params.id;
        // const postId = req.body;
        const userId = req.user.id;

        // validation
        if(!postId || !userId) {
            return res.status(401).json({
                success: false,
                message: "validation failed on either userId or post id",
                error: error.message,
            });
        }

        // fetch user and post
        const user = await User.findById(userId);
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User cannot be fetched",
                error: error.message,
            });
        }

        const post = await Post.findById(postId);
        if(!post) {
            return res.status(401).json({
                success: false,
                message: "Post cannot be fetched",
                error: error.message,
            });
        }

        // check if user has already liked the post
        try {
            const isLikedPost = await Like.findOne({user: userId, post: postId});
            if(isLikedPost) {
                return res.status(401).json({
                    success: false,
                    message: "User has already liked the post",
                });
            }
        }
        catch(error) {
            return res.status(401).json({
                success: false,
                message: "Error in knowing whether user has already liked the post or not",
                error: error.message
            });
        }
        

        // create an antry in LikeModel
        const likedPost = await Like.create({
            user: user,
            post: post,
        });

        // update post's likes array with username
        const updatedLikesOnPost = await Post.findByIdAndUpdate(
            postId,
            {
                $push: {likes: user},
            },
            {new: true}
        );

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "Post liked successfully",
            data: updatedLikesOnPost
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error in liking the post",
            error: error.message
        });
    }
}

// unlikePost
exports.unlikePost = async (req, res) => {
    try {
        // fetch postId and userId
        const postId = req.params.id;
        // const postId = req.body;
        const userId = req.user.id;

        // validation
        if(!postId || !userId) {
            return res.status(401).json({
                success: false,
                message: "validation failed on either userId or post id",
                error: error.message,
            });
        }

        // fetch user and post
        const user = await User.findById(userId);
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User cannot be fetched",
                error: error.message,
            });
        }

        const post = await Post.findById(postId);
        if(!post) {
            return res.status(401).json({
                success: false,
                message: "Post cannot be fetched",
                error: error.message,
            });
        }

        // check if user has already liked the post
        let isLikedPost = null;
        try {
            isLikedPost = await Like.findOne({user: userId, post: postId});
            // console.log("ISLIKEDPOST: ", isLikedPost);
            if(!isLikedPost) {
                return res.status(401).json({
                    success: false,
                    message: "User has not liked the post",
                });
            }
        } 
        catch(error) {
            return res.status(401).json({
                success: false,
                message: "Error in knowing whether user has already liked the post or not",
                error: error.message
            });
        }
        

        // update an antry in LikeModel
        const unlikedPost = await Like.findByIdAndDelete(isLikedPost._id);

        // update post's likes array with username
        const updatedLikesOnPost = await Post.findByIdAndUpdate(
            postId,
            {
                $pull: {likes: user._id},
            },
            {new: true}
        );

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "Post unliked successfully",
            data: updatedLikesOnPost
        });
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Cannot unlike post",
            error: error.message,
        });
    }
};
