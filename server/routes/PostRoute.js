const express = require("express");
const router = express.Router();

// import controllers
const { auth } = require("../middlewares/auth");
const { createPost, deletePost, getMyPost, getHomepagePost } = require("../controllers/Post");
const { likePost, unlikePost } = require("../controllers/Like");
const { createComment } = require("../controllers/Comment");

// route handler
router.post("/createPost", auth, createPost);
router.delete("/deletePost/:id", auth, deletePost);
router.post("/likePost", auth, likePost);
router.get("/getMyPost", auth, getMyPost);
router.get("/getHomepagePost", auth, getHomepagePost);

// Like routes
router.post("/likePost/:id", auth, likePost);
router.post("/unlikePost/:id", auth, unlikePost);

// Comment routes
router.post("/createComment/:id", auth, createComment);

// export
module.exports = router;