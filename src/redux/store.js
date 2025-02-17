import { createStore } from "redux";
import rootReducer from "../reducer/rootReducer";
// import { composeWithDevTools } from "@redux-devtools/extension/lib/types/logOnly";
const store = createStore(rootReducer);

export default store;
