import { list } from "postcss";
import {
    ADD,
    ADD_FILM,
    CLEAR_USER_AUTH,
    DELETE,
    DELETE_FILM,
    EDIT,
    EDIT_FILM,
    GET,
    GET_MA_RAP_CHIEU,
    LIST_SEAT,
    SELECTED_CINEMA,
    SET_FILM,
    SET_USER_AUTH,
    UPDATE_SEAT_STATUS,
} from "../action/types";

const INITIAL_STATE = {
    users: [],
    userAuth: null,
    listFilm: [],
    selectedCinema: {
        maHeThongRap: "",
        maCumRap: "",
    },
    listSeat: [],
    maLichChieu: null,
};
// console.log("a", listSeat);

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // user
        case GET:
            return {
                ...state,
                users: action.payload,
            };
        case ADD:
            return {
                ...state,
                users: [...state.users, action.payload],
            };
        case DELETE:
            return { ...state, users: state.users.filter((u) => u.taiKhoan !== action.payload) };

        case EDIT: {
            return {
                ...state,
                users: state.users.map((us) => (us.taiKhoan === action.payload.taiKhoan ? action.payload : us)),
            };
        }
        // film
        case SET_FILM:
            return {
                ...state,
                listFilm: action.payload,
            };
        case EDIT_FILM:
            return {
                ...state,
                listFilm: state.listFilm.map((film) => (film.maPhim === action.payload.maPhim ? action.payload : film)),
            };
        case ADD_FILM:
            return {
                ...state,
                listFilm: [...state.listFilm, action.payload],
            };
        case DELETE_FILM:
            return { ...state, listFilm: state.listFilm.filter((film) => film.maPhim !== action.payload) };

        // --------------------------------------------------
        // user auth
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
                    maHeThongRap: action.payload?.maHeThongRap ?? state.selectedCinema?.maHeThongRap ?? "",
                    maCumRap: action.payload?.maHeThongRap !== state.selectedCinema?.maHeThongRap ? "" : action.payload?.maCumRap ?? "",
                    maRap:
                        action.payload?.maCumRap !== state.selectedCinema?.maCumRap ? "" : action.payload?.maRap ?? state.selectedCinema?.maRap ?? "",
                },
            };
        }
        case LIST_SEAT: {
            return {
                ...state,
                listSeat: action.payload,
            };
        }
        case UPDATE_SEAT_STATUS: {
            return {
                ...state,
                listSeat: state.listSeat.map((seat) => (action.payload.some((maGhe) => maGhe === seat.maGhe) ? { ...seat, daDat: true } : seat)),
            };
        }

        case GET_MA_RAP_CHIEU: {
            return {
                ...state,
                maLichChieu: action.payload,
            };
        }
        default:
            return state;
    }
};

export default reducer;
