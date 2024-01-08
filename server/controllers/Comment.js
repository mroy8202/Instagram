const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// createComment
exports.createComment = async (req, res) => {
    try {
        // fetch postId and userId and commentText
        // const { postId }= req.body;
        const postId = req.params.id;
        const userId = req.user.id;
        const { commentText } = req.body;

        console.log("POST ID: ", postId);
        console.log("USER ID: ", userId);
        console.log("COMMENT TEXT: ", commentText);
        console.log("COMMENT TEXT KA TYPE: ", typeof(commentText));

        // validation
        if(!postId || !userId) {
            return res.status(401).json({
                success: false,
                message: "cannot fetch either postId or userId",
                error: error.message,
            });
        }

        // fetch user and post
        const user = await User.findById(userId);
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
                error: error.message,
            });
        };

        const post = await Post.findById(postId);
        if(!post)  {
            return res.status(401).json({
                success: false,
                message: "Post not found",
                error: error.message,
            });
        }

        // create a comment 
        const newComment = await Comment.create({
            user: user,
            post: post, 
            commentText: commentText,
        });

        // update comments in postModel
        const updatedCommentInPost = await Post.findByIdAndUpdate(
            postId,
            {
                $push: {comments: user},
            },
            {new: true},
        );

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "Comment created successfully",
            data: updatedCommentInPost,
        });

    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "Cannot create a comment",
            error: error.message,
        });
    }
}
