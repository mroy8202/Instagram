const express = require("express");
const router = express.Router();

// import controllers and middleware
import { signup, login, changePassword } from "../controllers/Auth";
import { auth } from "../middlewares/auth";

// route handlers
router.post("/signup", signup);
router.post("/login", login);

router.post("/changePassword", auth, changePassword);


// export 
module.exports = router;