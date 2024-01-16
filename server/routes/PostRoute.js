const express = require("express");
const router = express.Router();

// import controllers
const { auth } = require("../middlewares/auth");
const { createPost, deletePost, getMyPost, getHomepagePost } = require("../controllers/Post");
const { likePost, unlikePost, viewLikes } = require("../controllers/Like");
const { createComment } = require("../controllers/Comment");

// route handler
router.post("/createPost", auth, createPost);
router.delete("/deletePost/:id", auth, deletePost);
router.get("/getMyPost", auth, getMyPost);
router.get("/getHomepagePost", auth, getHomepagePost);

// Like routes
router.put("/likePost", auth, likePost);
router.put("/unlikePost", auth, unlikePost);
router.get("/viewLikes", auth, viewLikes);

// Comment routes
router.post("/createComment", auth, createComment);

// export
module.exports = router;