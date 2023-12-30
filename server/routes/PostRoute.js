const express = require("express");
const router = express.Router();

// import controllers
const { createPost, deletePost } = require("../controllers/Post");
const { auth } = require("../middlewares/auth");

// route handler
router.post("/createPost", auth, createPost);
router.post("/deletePost/:id", auth, deletePost);

// export
module.exports = router;