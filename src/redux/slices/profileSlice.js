import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    homepagePosts: [],
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
        }
    }
});

export const { setUser, setLoading, setHomePagePosts } = profileSlice.actions;
export default profileSlice.reducer;