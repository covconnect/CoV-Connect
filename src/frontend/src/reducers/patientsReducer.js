import { SET_PATIENTS } from "../actions/types";


const initialState = [];

export default function patientsReduce(state = initialState, action)
{
  switch (action.type)
  {
    case SET_PATIENTS:
      return action.payload || [];
    default:
      return state;
  }
}
