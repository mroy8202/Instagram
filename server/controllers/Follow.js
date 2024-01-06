// import 

// followUser
exports.followUser = async (req, res) => {
    try {
        // fetch id of user whom the loggedIn user wants to follow
        const userToBeFollowedId = req.params.id;

        // fetch if of the logged in user
        const userId = req.user.id;

        // send a follow request by the current user to the user
        

        // return successfull response
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: "error in following user, please try again later"
        });
    }
}