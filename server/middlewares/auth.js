const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        // validate token
        if(!token || token === undefined) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        // verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded token: ", decoded);
            req.user = decoded;
        }
        catch(err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }

        next();
    }
    catch(error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
            error: error.message
        });
    }
}