import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, VALIDATION_ERROR, CLEAR_ERROR } from "./types";


// Register User
export const registerUser = (userData, history) => dispatch =>
{
    axios
        .put("/user/register", userData)
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
                   dispatch({
                                type: GET_ERRORS,
                                payload: err.response.data
                            })
        );
};

// clear error 
export const clearError = (input) => dispatch => {
    dispatch({
        type: CLEAR_ERROR,
        payload: input
    })
}

// Validate email
export const validateEmail = value => dispatch => {
    // Empty fields handled by registerUser
    if(value.length === 0) return null;

    const isValid = !!value.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)
    if(!isValid){
        return dispatch({
            type: VALIDATION_ERROR,
            payload: { email: 'Please Enter a Valid Email Address'}
        })
    }
    clearError('email');
}

// Validate password 
export const validatePassword = (pw1, pw2) => dispatch => { 
    // Empty fields handled by registerUser
    if(pw1.length === 0 || pw2.length === 0) return null;
    
    const isSamePassword = pw1 === pw2;
    if(!isSamePassword){
        return dispatch({
            type: VALIDATION_ERROR,
            payload: { password: "Passwords do not match" }
        })
    }
    clearError('password')
}

// Login - get user token
export const loginUser = userData => dispatch =>
{
    axios
        .post("/user/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
                   dispatch({
                                type: GET_ERRORS,
                                payload: err.response.data
                            })
        );
};


// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};


// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};


// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
