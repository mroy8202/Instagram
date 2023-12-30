const express = require("express");
const router = express.Router();

// import controllers
const { createPost } = require("../controllers/Post");
const { auth } = require("../middlewares/auth");

// route handler
router.post("/createPost", auth, createPost);

// export
module.exports = router;