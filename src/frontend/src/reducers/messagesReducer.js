import { SET_MESSAGES } from "../actions/types";


const initialState = [
  { id: 1, room: '123', unit: '456', name: 'John Smith', dob: '1999-09-29' },
  { id: 2, room: '123', unit: '456', name: 'John Smith', dob: '1999-09-29' },
  { id: 3, room: '123', unit: '456', name: 'John Smith', dob: '1999-09-29' },
  { id: 4, room: '123', unit: '456', name: 'John Smith', dob: '1999-09-29' },
  { id: 5, room: '123', unit: '456', name: 'John Smith', dob: '1999-09-29' },
  { id: 6, room: '123', unit: '456', name: 'John Smith', dob: '1999-09-29' },
];

export default function messagesReducer(state = initialState, action)
{
  switch (action.type)
  {
    case SET_MESSAGES:
      return action.payload || state;
    default:
      return state;
  }
}
