import { createSlice } from "@reduxjs/toolkit";

const storedCurrentPost = localStorage.getItem("currentPost");

// initial state
const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    homepagePosts: [],
    myPosts: [],
    currentPost: storedCurrentPost ? JSON.parse(storedCurrentPost) : null,
    likes: [],
}

// create slice
const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setHomePagePosts(state, value) {
            state.homepagePosts = value.payload;
        },
        setMyPosts(state, value) {
            state.myPosts = value.payload;
        },
        setCurrentPost(state, value) {
            localStorage.setItem("currentPost", JSON.stringify(value.payload));
            state.currentPost = value.payload;
        },
        setLikes(state, value) {
            state.likes = value.payload;
        }
    }
});

export const { setUser, setLoading, setHomePagePosts, setMyPosts, setCurrentPost, setLikes } = profileSlice.actions;
export default profileSlice.reducer;