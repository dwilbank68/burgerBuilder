import {takeEvery, all, takeLatest} from 'redux-saga/effects';

import {
    AUTH_CHECK_STATE,
    AUTH_CHECK_TIMEOUT,
    AUTH_INITIATE_LOGOUT, AUTH_USER, FETCH_ORDERS, INIT_INGREDIENTS,
    PURCHASE_BURGER
} from '../actions/actionTypes';

import {
    logoutSaga, checkAuthTimeoutSaga,
    authUserSaga, authCheckStateSaga
} from "./auth";

import {
    initIngredientsSaga
} from "./burgerBuilderSagas";
import {fetchOrdersSaga, purchaseBurgerSaga} from "./orderSagas";



export
function* watchAuth() {

    yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga)
    yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    yield takeEvery(AUTH_USER, authUserSaga)
    yield takeEvery(AUTH_CHECK_STATE, authCheckStateSaga)
}

export
function* watchBurgerBuilder() {
    yield takeEvery(INIT_INGREDIENTS, initIngredientsSaga)
}

export
function* watchOrder() {
    yield takeLatest(PURCHASE_BURGER, purchaseBurgerSaga)
    yield takeEvery(FETCH_ORDERS, fetchOrdersSaga)
}