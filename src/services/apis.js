const BASE_URL = process.env.REACT_APP_BASE_URL

// Auth Endpoints
export const authEndpoints = {
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
}

// Post Endpoints
export const postEndpoints = {
    CREATE_POST_API: BASE_URL + "/post/createPost",
    DELETE_POST_API: BASE_URL + "/post/deletePost", // id in params
    MY_POST_API: BASE_URL + "/post/getMyPost",
    HOMEPAGE_POST_API: BASE_URL + "/post/getHomepagePost",
    LIKE_POST_API: BASE_URL + "/post/likePost",
    UNLIKE_POST_API: BASE_URL + "/post/unlikePost",
    VIEW_POST_API: BASE_URL + "/post/viewLikes",
    CREATE_COMMENT_API: BASE_URL + "/post/createComment", // id in params
}