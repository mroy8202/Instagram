const Post = require("../models/postModel");

// createComment
exports.createComment = async (req, res) => {
    try {
        // fetch postId and userId and commentText
        const { postId }= req.body;
        const userId = req.user.id;
        const { text } = req.body;

        console.log("POST ID: ", postId);
        console.log("USER ID: ", userId);
        console.log("COMMENT TEXT: ", text);

        // validation
        if(!postId || !userId) {
            return res.status(401).json({
                success: false,
                message: "cannot fetch either postId or userId",
            });
        }

        // update comments in postModel
        const updatedCommentInPost = await Post.findByIdAndUpdate(
            postId,
            {
                $push: {
                    comments: {
                        text,
                        user: userId
                    },
                },
            },
            {new: true},
        ).populate("comments.user").exec();

        console.log("UpdatedPost: ", updatedCommentInPost.comments);

        // return a successfull response
        return res.status(200).json({
            success: true,
            message: "Comment created successfully",
            data: updatedCommentInPost.comments,
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
