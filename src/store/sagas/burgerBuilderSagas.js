import axios from '../../axios-orders';
import {put} from 'redux-saga/effects';
import {setIngredients,
    fetchIngredientsFailed} from "../actions"

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get( 'https://burger-415f4.firebaseio.com/ingredients.json' );
        yield put(setIngredients(response.data));
    } catch (err) {
        yield put(fetchIngredientsFailed(err));
    }
};