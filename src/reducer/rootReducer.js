import { combineReducers } from "redux";

import counterReducer from "./couterReducer";

const rootReducer = combineReducers({
    counter: counterReducer,
});

export default rootReducer;
