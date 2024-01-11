import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    searchUsers: [],
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
        setSearchUsers(state, value) {
            state.searchUsers = value.payload;
        }
    }
});

export const { setUser, setLoading, setSearchUsers } = profileSlice.actions;
export default profileSlice.reducer;