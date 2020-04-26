import {SET_CURRENT_USER, USER_LOADING} from "../actions/types";


const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: true,
    user: { id: 123, name: 'admin1', type: 'admin'},
    loading: false
};


export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
