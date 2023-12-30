const express = require("express");
const router = express.Router();

// import controllers and middleware
const { signup, login, changePassword } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");

// route handlers
router.post("/signup", signup);
router.post("/login", login);

router.post("/changePassword", auth, changePassword);


// export 
module.exports = router;