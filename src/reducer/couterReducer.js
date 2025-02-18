import { ADD, GET } from "../action/types";

const getDataToken = JSON.parse(localStorage.getItem("accessToken")) || null;

const INITIAL_STATE = {
    users: [],
    userAuth: null,
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
