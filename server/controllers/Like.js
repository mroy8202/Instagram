// import 
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// likePost
exports.likePost = async (req, res) => {
    try {
        // fetch post id of post which is going to be liked
        const postId = req.body.postId;

        // fetch user who is going to like the post
        const userId = req.user.id;

        console.log("PostID: ", postId);
        console.log("userID: ", userId);

        // update likes array of post
        const likedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $push: {
                    likes: userId,
                }
            },
            {new: true}
        );
        if(!likedPost) {
            return res.status(400).json({
                success: false,
                message: "cannot like the post",
                // data: req.params
            });
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Post liked successfully"
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Error in liking the post, please try again later"
        });
    }
}