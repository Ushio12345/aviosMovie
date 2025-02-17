import { ADD, GET } from "../action/types";

const INITIAL_STATE = {
    users: [],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET:
            return {
                ...state,
                users: action.payload,
            };

        default:
            return state;
    }
};

export default reducer;
