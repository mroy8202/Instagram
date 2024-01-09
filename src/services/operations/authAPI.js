// import 
import toast from "react-hot-toast";
import {endpoints} from "../apis";
import { setLoading, setToken } from "../../redux/slices/authSlice";
import { apiConnector } from "../apiconnector";


// endpoints
const { SIGNUP_API, LOGIN_API, CHANGE_PASSWORD_API } = endpoints;

export function signUp(name, email, username, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, { name, email, username, password });

            console.log("SIGNUP_API RESPONSE -> ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Signup successfull");
            navigate("/login");
        }
        catch(error) {
            console.log("SIGNUP_API error... ", error);
            toast.error("Signup failed");
            navigate("/signup");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
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
            localStorage.setItem("token", JSON.stringify(response.data.token));
            navigate("/");
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
        navigate("/");
    };
}