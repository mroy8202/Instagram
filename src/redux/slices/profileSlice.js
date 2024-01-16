import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    homepagePosts: [],
    myPosts: [],
    currentPost: [],
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
            state.currentPost = value.payload;
        }
    }
});

export const { setUser, setLoading, setHomePagePosts, setMyPosts, setCurrentPost } = profileSlice.actions;
export default profileSlice.reducer;