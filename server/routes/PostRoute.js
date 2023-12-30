const express = require("express");
const router = express.Router();

// import controllers
import { createPost } from "../controllers/Post";

// route handler
router.post("/createPost", auth, createPost);

// export
module.exports = router;