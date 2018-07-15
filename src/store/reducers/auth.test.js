import reducer from './auth';
import {AUTH_LOGOUT, AUTH_SUCCESS, AUTH_FAIL, AUTH_START} from "../actions/actionTypes";

describe('auth reducer', () => {

    const initialState = {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    }

    it('should  return initial state', ()=> {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should store token upon login', ()=> {
        const action = {type: AUTH_SUCCESS, idToken: '12345', userId: 'jack'};
        expect(reducer(initialState, action))
            .toEqual({
                token: '12345',
                userId: 'jack',
                error: null,
                loading: false,
                authRedirectPath: '/'
            });
    })
    
});