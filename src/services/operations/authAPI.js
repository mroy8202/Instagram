// import 
import toast from "react-hot-toast";
import { authEndpoints } from "../apis";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice";
import { apiConnector } from "../apiconnector";


// endpoints
const { SIGNUP_API, LOGIN_API, CHANGE_PASSWORD_API } = authEndpoints;

export function signUp({name, email, username, password}, navigate) {
    return async (dispatch) => {
        // const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, { name, email, username, password });

            console.log("SIGNUP_API RESPONSE -> ", response);
            if (!response.data.success) { 
                throw new Error(response.data.message); // if response if false, an error is thrown with the server's error message.
            }
            toast.success("Signup successfull");
            navigate("/login");
        }
        catch(error) {
            console.log("SIGNUP_API error... ", error);
            toast.error("Signup failed");
            navigate("/");
        }
        dispatch(setLoading(false));
        // toast.dismiss(toastId);
    }
}

export function login(email, password, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password });

            console.log("LOGIN_API RESPONSE -> ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login successfull");

            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            navigate("/"); // TODO: define where should we navigate after user is logged in
        }
        catch(error) {
            console.log("LOGIN_API ERROR -> ", error);
            toast.error("Login failed");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/"); // TODO: define where should we navigate after user is logged out
    };
}

export function changePassword(currentPassword, newPassword, confirmNewPassword,  navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", CHANGE_PASSWORD_API, { currentPassword, newPassword, confirmNewPassword });

            console.log("CHANGE PASSWORD RESPONSE -> ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password changed successfully");

            // user should be logged out
            dispatch(setToken(null));
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // toast.success("Logged Out");
            navigate("/"); // TODO: define where should we navigate after user is logged out
        }
        catch(error) {
            console.log("CHANGE_PASSWORD_ERROR -> ", error);
            toast.error("Cannot change password");
            navigate("/"); // TODO: 
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}