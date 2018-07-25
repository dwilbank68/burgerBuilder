import {
    AUTH_INITIATE_LOGOUT, AUTH_START, AUTH_FAIL,
    AUTH_SUCCESS, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH,
    AUTH_CHECK_TIMEOUT, AUTH_USER, AUTH_CHECK_STATE
}
    from "./actionTypes"

export const authStart = () => {
    return {
        type: AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => ({
    type: AUTH_LOGOUT
})

export const checkAuthTimeout = (expirationTime) => ({
        type: AUTH_CHECK_TIMEOUT,
        expirationTime
});

export const auth = (email, password, isSignup) => ({
    type: AUTH_USER,
    email,
    password,
    isSignup
});

export const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => ({
    type: AUTH_CHECK_STATE
});