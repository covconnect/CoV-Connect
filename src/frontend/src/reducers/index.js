import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import messagesReducer from "./messagesReducer";
import patientsReducer from "./patientsReducer";
import hospitalsReducer from "./hospitalsReducer";
import printReducer from "./printReducer";

export default combineReducers({
   auth: authReducer,
   errors: errorReducer,
   messages: messagesReducer,
   patients: patientsReducer,
   hospitals: hospitalsReducer,
   printableMessages: printReducer
});
