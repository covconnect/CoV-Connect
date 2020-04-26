import { SET_MESSAGES } from "../actions/types";


const initialState = [];

export default function messagesReducer(state = initialState, action)
{
  switch (action.type)
  {
    case SET_MESSAGES:
      return action.payload || [];
    default:
      return state;
  }
}
