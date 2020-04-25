import { GET_ERRORS, VALIDATION_ERROR, CLEAR_ERROR } from "../actions/types";


const initialState = {};


export default function(state = initialState, action)
{
    switch (action.type)
    {
        case GET_ERRORS:
            return action.payload;
        case VALIDATION_ERROR:
            return { ...state, ...action.payload }
        case CLEAR_ERROR:
            return { ...state, [action.payload]: ''}
        default:
            return state;
    }
}
