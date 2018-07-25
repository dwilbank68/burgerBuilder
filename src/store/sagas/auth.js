import {delay} from 'redux-saga';
import {put, call} from 'redux-saga/effects';
import axios from 'axios';

import {authStart, logout, logoutSucceed,
authSuccess, authFail, checkAuthTimeout} from "../actions";

export function* logoutSaga(action) {
    // yield call([localStorage, 'removeItem'], 'token');
    // using 'call' makes the generator testable
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logout());
}

export function* authUserSaga(action) {
    yield put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    const API_KEY = "AIzaSyBF4zdVhEiLLyW-Z0yfzOAcOuJj8w7kfU0";
    const signUpUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key="
    const signInUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=";
    const url = action.isSignup ? signUpUrl : signInUrl;
    try {
        const response = yield axios.post(url + API_KEY, authData)
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(authSuccess(response.data.idToken, response.data.localId));
        yield put(checkAuthTimeout(response.data.expiresIn));
    } catch(err) {
        yield put(authFail(err.response.data.error));

    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(authSuccess(token, userId));
            yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
        }
    }
};