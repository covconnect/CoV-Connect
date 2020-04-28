import { SET_PRINT_MESSAGES } from "../actions/types";


const initialState = [];

export default function printReducer(state = initialState, action)
{
    switch (action.type)
    {
        case SET_PRINT_MESSAGES:
            return action.payload || state;
        default:
            return state;
    }
}
