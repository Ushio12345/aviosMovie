import { ADD, CLEAR_USER_AUTH, GET, SET_FILM, SET_USER_AUTH } from "../action/types";

const INITIAL_STATE = {
    users: [],
    userAuth: null,
    listFilm: [],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET:
            return {
                ...state,
                users: action.payload,
            };
        case SET_FILM:
            return {
                ...state,
                listFilm: action.payload,
            };
        case SET_USER_AUTH:
            return {
                ...state,
                userAuth: action.payload,
            };
        case CLEAR_USER_AUTH: {
            return { ...state, userAuth: null };
        }
        default:
            return state;
    }
};

export default reducer;
