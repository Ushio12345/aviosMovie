import { ADD, CLEAR_USER_AUTH, GET, SELECTED_CINEMA, SET_FILM, SET_USER_AUTH } from "../action/types";

const INITIAL_STATE = {
    users: [],
    userAuth: null,
    listFilm: [],
    selectedCinema: {
        maHeThongRap: "cgv",
        maCumRap: "cgv-aeon-binh-tan",
    },
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
        case SELECTED_CINEMA: {
            return {
                ...state,
                selectedCinema: {
                    maHeThongRap: action.payload.maHeThongRap ?? state.selectedCinema.maHeThongRap,
                    maCumRap: action.payload.maHeThongRap !== state.selectedCinema.maHeThongRap ? "" : action.payload.maCumRap,
                },
            };
        }
        default:
            return state;
    }
};

export default reducer;
