const express = require("express");
const router = express.Router();

// import controllers
const { auth } = require("../middlewares/auth");
const { createPost, deletePost } = require("../controllers/Post");
const { likePost } = require("../controllers/Like");

// route handler
router.post("/createPost", auth, createPost);
router.delete("/deletePost/:id", auth, deletePost);
router.post("/likePost", auth, likePost);

// export
module.exports = router;