import { combineReducers } from "redux";

// import counterReducer from "./couterReducer";
import reducer from "./couterReducer";

const rootReducer = combineReducers({
    counter: reducer,
});

export default rootReducer;
