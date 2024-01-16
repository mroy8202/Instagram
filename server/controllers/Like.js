const Post = require("../models/postModel");

// likePost
exports.likePost = async (req, res) => {
    try {
        // fetch post id and user id
        const {postId} = req.body;
        const userId = req.user.id;

        console.log("POSTid: ", postId);
        console.log("USERid: ", userId);

        // data validation
        if(!postId || !userId) {
            return res.status(400).json({
                success: false,
                message: "cannot fetch either postId ot userId",
            });
        }

        // update post's likes array with user details
        const updatedDetails = await Post.findByIdAndUpdate(
            postId, 
            {
                $push: { likes: userId }
            },
            {new: true}
        ).populate("likes").exec();

        // console.log("Updated post: ", updatedDetails);

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "Post liked successfully",
            data: updatedDetails
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error in liking the post from server side",
            error: error.message
        });
    }
}

// unlikePost
exports.unlikePost = async (req, res) => {
    try {
        // fetch post id and user id
        const {postId} = req.body;
        const userId = req.user.id;

        console.log("POSTid: ", postId);
        console.log("USERid: ", userId);

        // data validation
        if(!postId || !userId) {
            return res.status(400).json({
                success: false,
                message: "cannot fetch either postId ot userId",
            });
        }

        // update post's likes array with user details
        const updatedDetails = await Post.findByIdAndUpdate(
            postId, 
            {
                $pull: { likes: userId }
            },
            {new: true}
        ).populate("likes").exec();

        console.log("Updated post: ", updatedDetails);

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "Post unliked successfully",
            data: updatedDetails
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error in unliking the post from server side",
            error: error.message
        });
    }
}

// viewLikes
exports.viewLikes = async (req, res) => {
    try {
        // fetch postId
        const postId = req.query.postId;
        // console.log("POST ID: ", postId);

        if(!postId) {
            return res.status(500).json({
                success: false,
                message: "cannot fetch postId",
            });
        }

        const post = await Post.findById(postId).populate("likes").exec();
        if(!post) {
            return res.status(500).json({
                success: false,
                message: "cannot fetch post",
            });
        }

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "post fetched successfully",
            data: post.likes
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error in viewing likes on a post form server side",
            error: error.message,
        });
    }
}
