import { SET_HOSPITALS } from "../actions/types";


const initialState = [];

export default function hosptialsReducer(state = initialState, action)
{
  switch (action.type)
  {
    case SET_HOSPITALS:
      return action.payload;
    default:
      return state;
  }
}
