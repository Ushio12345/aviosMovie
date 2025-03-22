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
    SET_SCHEDUAL,
    SET_USER_AUTH,
    UPDATE_SEAT_STATUS,
} from "./types";

// Manager User Action
export const addNew = (data) => {
    return {
        type: ADD,
        payload: data,
    };
};

export const getData = (data) => {
    return {
        type: GET,
        payload: data,
    };
};

export const deleteUs = (tk) => {
    return {
        type: DELETE,
        payload: tk,
    };
};

export const editUs = (dataForm) => {
    return {
        type: EDIT,
        payload: dataForm,
    };
};
// auth user

export const setUserAuth = (user) => {
    return {
        type: SET_USER_AUTH,
        payload: user,
    };
};

export const clearUserAuth = () => {
    return {
        type: CLEAR_USER_AUTH,
    };
};

export const setSelectedCinemaSystem = (maHeThongRap, maCumRap, maRap) => {
    return {
        type: SELECTED_CINEMA,
        payload: { maHeThongRap, maCumRap, maRap },
    };
};

// ma rap chieu

export const getMaRapChieu = (maLichChieu) => {
    return {
        type: GET_MA_RAP_CHIEU,
        payload: maLichChieu,
    };
};

// quản lí state danh sach ghe
export const setListSeat = (data) => {
    return {
        type: LIST_SEAT,
        payload: data,
    };
};
export const updateSeatStatus = (bookedSeats) => ({
    type: UPDATE_SEAT_STATUS,
    payload: bookedSeats,
});

// manager films redux

// list films
export const setFlimRedux = (f) => {
    return {
        type: SET_FILM,
        payload: f,
    };
};

export const editFilmsRedux = (dataForm) => {
    return {
        type: EDIT_FILM,
        payload: dataForm,
    };
};

export const addNewFilmRedux = (dataForm) => {
    return {
        type: ADD_FILM,
        payload: dataForm,
    };
};

export const deleteFilmRedux = (maPhim) => {
    return {
        type: DELETE_FILM,
        payload: maPhim,
    };
};

export const setSchedualRedux = (selectedCinema, date, maRap, price) => {
    return {
        type: SET_SCHEDUAL,
        payload: { ...selectedCinema, date, maRap, price },
    };
};
