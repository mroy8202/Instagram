// import
import { apiConnector } from "../apiconnector";
import { postEndpoints } from "../apis";
import toast from "react-hot-toast";
import { setHomePagePosts, setMyPosts } from "../../redux/slices/profileSlice";



// endpoints
const {
    // CREATE_POST_API,
    // DELETE_POST_API,
    MY_POST_API,
    HOMEPAGE_POST_API,
    LIKE_POST_API,
    UNLIKE_POST_API,
    // CREATE_COMMENT_API,
} = postEndpoints;

// homepage post api
export function homepagePost(token) {
    return async(dispatch) => {
        try {
            const response = await apiConnector("GET", HOMEPAGE_POST_API, null, {
                Authorization: `Bearer ${token}`
            });

            // console.log("HOMEPAGE POST API RESPONSE: ", response.data.data[0].user.name);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            
            const allPosts = [];
            const posts = response.data.data;
            posts.map(post => (allPosts.push(post)));

            // console.log("ALL POSTS: ", allPosts);

            await dispatch(setHomePagePosts(allPosts));
            toast.success("homepage");
        }
        catch(error) {
            console.log('ERROR IN GETTING POST: ', error);
            toast.error("cannot get posts");
        }
    }
}

// my post api
export function myPost(token) {
    return async(dispatch) => {
        try {
            const response = await apiConnector("GET", MY_POST_API, null, {
                Authorization: `Bearer ${token}`
            })
            // console.log("MY POST API RESPONSE: ", response.data.data);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const myAllPosts = [];
            const posts = response.data.data;
            posts.map((post) => (myAllPosts.push(post)));
            console.log("ALL POSTS: ", myAllPosts);

            await dispatch(setMyPosts(myAllPosts));
            toast.success("profile");
        }
        catch(error) {
            console.log("errorrrr....", error);
            toast.error("failed");
        }
    }
}

// like post api
export function likePost(postId, token) {
    return async(dispatch) => {
        try {
            // console.log('POST ID: ', postId);
            // console.log('TOKEN: ', token);

            const response = await apiConnector("POST", LIKE_POST_API, {postId}, {
                Authorization: `Bearer ${token}`
            });

            console.log("RESPONSE: ", response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Post liked");

        }
        catch(error) {
            console.log("Error in liking post...", error);
            toast.error("like failed");
        }
    }
}

// unlike post api
export function unlikePost(postId, token) {
    return async(dispatch) => {
        try {
            console.log('POST ID: ', postId);
            console.log('TOKEN: ', token);

            const response = await apiConnector("POST", UNLIKE_POST_API, { postId }, {
                Authorization: `Bearer ${token}`
            });

            console.log("RESPONSE: ", response);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Post unliked");
        }
        catch(error) {
            console.log("Error in liking post...", error);
            toast.error("like failed");
        }
    }
}