import axios from '../../axios-orders';
import {put} from 'redux-saga/effects';
import {setIngredients,
    fetchIngredientsFailed} from "../actions"
import {purchaseBurgerStart,
    purchaseBurgerFail, purchaseBurgerSuccess} from "../actions";
import {fetchOrdersStart, fetchOrdersSuccess,
fetchOrdersFail} from "../actions/order";

export function* purchaseBurgerSaga(action) {
    const {orderData, token} = action;
    yield put(purchaseBurgerStart)

    try {
        const response = yield axios.post( '/orders.json?auth=' + token, orderData );
        yield put(purchaseBurgerSuccess(response.data.name, orderData));
    } catch (err) {
        yield put(purchaseBurgerFail(err));
    }
};

export function* fetchOrdersSaga(action) {
    const {token, userId} = action;
    yield put(fetchOrdersStart());
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    try {
        const response =
        axios.get( '/orders.json' + queryParams)
        const fetchedOrders = [];
        for ( let key in response.data ) {
            fetchedOrders.push( {
                ...response.data[key],
                id: key
            } );
        }
        yield put(fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
        yield put(fetchOrdersFail(err));
    }
};